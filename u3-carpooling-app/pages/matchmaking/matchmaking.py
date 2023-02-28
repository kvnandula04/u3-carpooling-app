import math
from urllib.request import urlopen
import json
import sqlite3
from datetime import datetime, timedelta

def time_to_minutes(h):
    delta = timedelta(hours=int(h.split(':')[0]), minutes=int(h.split(':')[1]), seconds=int(h.split(':')[2]))
    minutes = delta.total_seconds()/60
    return minutes


#Turn full address into address with + instead of spaces
def address_to_url(address):
    address = address.replace(' ', '+')
    return address


address = 'Bath Brew House, Bath, Uk'

address_for_API = address_to_url(address)

API_KEY = 'AIzaSyAoAyqKYF_RayDjJ80HZTX3OluSChv7qgY'
URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address_for_API+'&key='+API_KEY

#Get the data from an API
def get_data():

    response = urlopen(URL)
    data_json = json.loads(response.read())
    
    #Longitude and Latitude
    lat = data_json['results'][0]['geometry']['location']['lat']
    lng = data_json['results'][0]['geometry']['location']['lng']

    #formatted address
    # formatted_address = data_json['results'][0]['formatted_address']

    # print(formatted_address)
    # print((lat, lng))

    return (lat, lng)


#get_data() 


#Roman Baths, Bath BA1 1LZ, UK
#(51.388870, -2.357350)

#Bath, Brew House, 14 James St W, Bath BA1 2BX, UK
#(51.381237, -2.3652668)  

#Bath Spa Railway Station, Bath BA1 1QY, UK
#(51.381590, -2.359940)


#Destination address:
#University of Bath, Bath, UK
#(51.380092, -2.359903)
#Claverton Down, Bath BA2 7AY, UK

lower_bound_score = 0.0
upper_bound_score = 2.0

# Sample driver and passenger data
drivers = [
    {
        'name': 'John', # name of the driver
        'location': (51.388870, -2.357350),  # (latitude, longitude)
        'destination': (51.380092, -2.359903), # (latitude, longitude)
        'departure_time': '08:00:00',  # Time
        'detour_distance': 2,  # in km (Maximum they are happy to detour)
        'rating': 5, # out of 5
        'luggage_space': 2,  # number of suitcases that can be accommodated
        'seats': 2  # number of seats in the car
    },
    {
        'name': 'Sam',
        'location': (51.388870, -2.357350),
        'destination': (51.380092, -2.359903),
        'departure_time': '09:00:00',
        'detour_distance': 5,
        'rating': 4.5,
        'luggage_space': 2,
        'seats': 5
    },
    # {
    #     'name': 'Mary',
    #     'location': (140.7120, -1.9970),
    #     'destination': (420.7282, -24.0776),
    #     'departure_time': '2023-03-15T09:00:00Z',
    #     'detour_time': 30,
    #     'rating': 2.5,
    #     'luggage_space': 0,
    #     'seats': 3  
    # },
    # Add more drivers here
]

passengers = [
    {
        'name': 'Jane',
        'location': (51.381237, -2.3652668),
        #'location': (51.388870, -2.357350),
        'destination': (51.380092, -2.359903),
        'departure_time': '08:00:00',
        #'detour_time': 5,
        'rating': 5.0
    },
    {
        'name': 'Joe',
        'location': (51.381590, -2.359940),
        'destination': (51.380092, -2.359903),
        'departure_time': '08:14:00',
        #'detour_time': 5,
        'rating': 5.0
    },
    {
        'name': 'Jill',
        'location': (51.381590, -2.359940),
        'destination': (51.380092, -2.359903),
        'departure_time': '08:45:00',
        # 'detour_time': 5,
        'rating': 4.0
    }
    # {
    #     'name': 'Jude',
    #     'location': (40.7120, -73.9970),
    #     'destination': (40.7282, -74.0776),
    #     'departure_time': '2023-02-25T09:00:00Z',
    #     'detour_time': 0,
    #     'rating': 4.0
    # },
    # # {
    # #     'name': 'Bob',
    # #     'location': (120.7120, -25.9970),
    # #     'destination': (40.7282, -74.0776),
    # #     'departure_time': '2023-02-25T19:00:00Z',
    # #     'detour_time': 20,
    # #     'rating': 1.0
    # # },
    # {
    #     'name': 'Tim',
    #     'location': (40.7120, -73.9970),
    #     'destination': (40.7282, -74.0776),
    #     'departure_time': '2023-02-25T09:00:00Z',
    #     'detour_time': 0,
    #     'rating': 5.0
    # },
    # {
    #     'name': 'Fara',
    #     'location': (40.7120, -73.9970),
    #     'destination': (40.7282, -74.0776),
    #     'departure_time': '2023-02-25T09:00:00Z',
    #     'detour_time': 0,
    #     'rating': 5.0
    # }

    # Add more passengers here
]

# Step 2: Define a scoring system

weights = {
    'location': 0.25,
    'destination': 0.25,
    'departure_time': 1.25,
    'detour_distance': 2.00,
    'passenger_rating': 0.15,
    'driver_rating': 0.15,
}

def score_driver_passenger_pair(driver, passenger):
    score = 0

    # Location
    lat1, lon1 = driver['location']
    lat2, lon2 = passenger['location']
    dist = math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)
    dist *= 100
    location_distance = dist
    score += dist * weights['location']

    # Destination
    lat1, lon1 = driver['destination']
    lat2, lon2 = passenger['destination']
    dist = math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)
    dist *= 100
    destination_distance = dist
    score += dist * weights['destination']

    driver_time = time_to_minutes(driver['departure_time'])
    passenger_time = time_to_minutes(passenger['departure_time'])

    if driver_time == passenger_time:
        score = score
    else:
        if abs(driver_time - passenger_time) >= 5 and abs(driver_time - passenger_time) < 10:
            score += score * (weights['departure_time'])
        elif abs(driver_time - passenger_time) >= 10 and abs(driver_time - passenger_time) < 15:
            score += score * (weights['departure_time'] * 1.25)
        elif abs(driver_time - passenger_time) >= 15 and abs(driver_time - passenger_time) < 30:
            score += score * (weights['departure_time'] * 3.5)
        elif abs(driver_time - passenger_time) >= 30 and abs(driver_time - passenger_time) < 45:
            score += score * (weights['departure_time'] * 7.5)
        else:
            score += score * (weights['departure_time'] * 10)

    if location_distance < driver['detour_distance'] and destination_distance < driver['detour_distance']:
        score = score
    else:
        score = score * (weights['detour_distance'] * 10)


    # Passenger rating
    if passenger['rating'] == 5 and passenger['rating'] > 4:
        score += score * (weights['passenger_rating'] * 1)
    elif passenger['rating'] == 4 and passenger['rating'] > 3:
        score += score * (weights['passenger_rating'] * 1.25)
    elif passenger['rating'] == 3 and passenger['rating'] > 2:
        score += score * (weights['passenger_rating'] * 1.5)
    elif passenger['rating'] == 2 and passenger['rating'] > 1:
        score += score * (weights['passenger_rating'] * 1.75)
    elif passenger['rating'] == 1 and passenger['rating'] > 0:
        score += score * (weights['passenger_rating'] * 2)
    else:
        score += score * (weights['passenger_rating'] * 2.5)

    # Driver rating
    score += driver['rating'] * weights['driver_rating']

    return score

# Step 3: Calculate a score for each driver-passenger pair

scores = {}

for i, driver in enumerate(drivers):
    for j, passenger in enumerate(passengers):
        pair_score = score_driver_passenger_pair(driver, passenger)
        scores[(i, j)] = pair_score


#print(scores)

# Step 4: Match drivers and passengers

#Checks to see if the current driver is the best match for the passenger
#It does this by checking if the same passenger has a higher score in the range of 0.8 to 1.0 with another driver
def check_best_match(driver, passenger):
    best_match = True
    driver_passenger_score = scores[(driver, passenger)]
    for i, driver in enumerate(drivers):
        if i != driver:
            if scores[(i, passenger)] > lower_bound_score and scores[(i, passenger)] <= upper_bound_score:
                if scores[(i, passenger)] > driver_passenger_score:
                    best_match = False
    return best_match



matched_pairs = []
matched_drivers = set()
matched_passengers = set()

unmatched_drivers = set()
unmatched_passengers = set()

check_driver_passenger_pair = set()

# Sort the scores by descending order
sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)

# Loop through each driver in ascending order
for i in range(max([x[0][0] for x in sorted_scores])+1):
    driver_scores = [(j, score) for (d, j), score in sorted_scores if d == i]

    remaining_seats = drivers[i]['seats']

    if remaining_seats > 0:
        # Sort the driver's scores by descending order
        driver_scores.sort(key=lambda x: x[1], reverse=True)
        for j, score in driver_scores:
            if score <= upper_bound_score and score >= lower_bound_score and j not in matched_passengers:
                if check_best_match(i, j):
                    matched_pairs.append((i, j, score))
                    matched_drivers.add(i)
                    matched_passengers.add(j)
                    remaining_seats -= 1
                    for driver, passenger in check_driver_passenger_pair.copy():
                        if passenger == j:
                            check_driver_passenger_pair.discard((driver, j))
                    if remaining_seats == 0:
                        break
                else:
                    check_driver_passenger_pair.add((i,j))


#Checks to see if the driver has any seats left and if so, adds the passenger to the matched pairs

for driver_check, passenger_check in check_driver_passenger_pair.copy():
    remaining_seats = drivers[driver_check]['seats']

    for (driver, passenger, score) in matched_pairs:
        if driver == driver_check:
            remaining_seats -= 1

    if remaining_seats != 0:
        matched_pairs.append((driver_check, passenger_check, score))
        matched_passengers.add(passenger_check)
        check_driver_passenger_pair.discard((driver_check, passenger_check))
    else:
        unmatched_passengers.add(passenger_check)

# Find unmatched drivers and passengers
for i, driver in enumerate(drivers):
    if i not in matched_drivers:
        unmatched_drivers.add(i)

for j, passenger in enumerate(passengers):
    if j not in matched_passengers:
        unmatched_passengers.add(j)


# Print the matched pairs for each driver
print("Matched pairs: ")
for i in matched_drivers:
    driver_pairs = [(j, score) for (d, j, score) in matched_pairs if d == i]
    #print(f"For driver {i}: {driver_pairs}")
    for j, score in driver_pairs:
        print(f"Driver {drivers[i]['name']} is matched with passenger {passengers[j]['name']} | Score of: {score}")
        
# # Print the unmatched drivers and passengers
# print("\nUnmatched drivers and passengers: ")
# for i in unmatched_drivers:
#     print(f"Unmatched drivers: {drivers[i]['name']}")

# for j in unmatched_passengers:
#     print(f"Unmatched passengers: {passengers[j]['name']}")

# print(f"\nUnmatched drivers: {unmatched_drivers}")
# print(f"Unmatched passengers: {unmatched_passengers}")