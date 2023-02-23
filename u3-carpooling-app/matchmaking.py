import math

'''
Things to consider:
-Need to convert this into js for React Native
-Location and destination addresses need to be converted into coordinates or distance value straight away
    -Do this using an API like Google Maps
-Heuristics need to be added/removed depending on what we want to prioritize
-Need to connect up to our database for the data
'''

'''
Things to talk about:
-Best scores for the driver-passenger pair is between 0.8 and 1.0
    -This might change depending on what we want to prioritize
    -Haven't tested on actual data yet
-Detour time is currently penalized by 1/30th of the score for every minute of detour
-Luggage space is not currently considered
'''

# Step 1: Collect and process data

# Sample driver and passenger data
drivers = [
    {
        'name': 'John', # name of the driver
        'location': (40.7128, -74.0060),  # (latitude, longitude)
        'destination': (40.7120, -73.9970), # (latitude, longitude)
        'departure_time': '2023-02-25T08:00:00Z',  # ISO 8601 format
        'detour_time': 10,  # in minutes
        'rating': 4.5, # out of 5
        'luggage_space': 2,  # number of suitcases that can be accommodated
        'seats': 5  # number of seats in the car
    },
    {
        'name': 'Sam',
        'location': (40.7120, -73.9970),
        'destination': (40.7282, -74.0776),
        'departure_time': '2023-02-25T09:00:00Z',
        'detour_time': 10,
        'rating': 4.5,
        'luggage_space': 2,
        'seats': 1  
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
        'location': (40.7128, -74.0060),
        'destination': (40.7282, -74.0776),
        'departure_time': '2023-02-25T08:15:00Z',
        'detour_time': 5,
        'rating': 4.8
    },
    {
        'name': 'Joe',
        'location': (40.7120, -73.9970),
        'destination': (40.7282, -74.0776),
        'departure_time': '2023-02-25T08:15:00Z',
        'detour_time': 5,
        'rating': 4.8
    },
    {
        'name': 'Jill',
        'location': (40.2110, -73.9930),
        'destination': (40.7282, -74.1776),
        'departure_time': '2023-02-25T08:13:00Z',
        'detour_time': 5,
        'rating': 4.0
    },
    # {
    #     'name': 'Jude',
    #     'location': (40.7120, -73.9970),
    #     'destination': (40.7282, -74.0776),
    #     'departure_time': '2023-02-25T09:00:00Z',
    #     'detour_time': 0,
    #     'rating': 4.0
    # },
    # {
    #     'name': 'Bob',
    #     'location': (120.7120, -25.9970),
    #     'destination': (40.7282, -74.0776),
    #     'departure_time': '2023-02-25T19:00:00Z',
    #     'detour_time': 20,
    #     'rating': 1.0
    # },
    {
        'name': 'Tim',
        'location': (40.7120, -73.9970),
        'destination': (40.7282, -74.0776),
        'departure_time': '2023-02-25T09:00:00Z',
        'detour_time': 0,
        'rating': 5.0
    },
    {
        'name': 'Fara',
        'location': (40.7120, -73.9970),
        'destination': (40.7282, -74.0776),
        'departure_time': '2023-02-25T09:00:00Z',
        'detour_time': 0,
        'rating': 5.0
    }

    # Add more passengers here
]

# Step 2: Define a scoring system

weights = {
    'location': 0.25,
    'destination': 0.25,
    'departure_time': 0.15,
    'detour_time': 0.15,
    'passenger_rating': 0.10,
    'driver_rating': 0.05,
}

def score_driver_passenger_pair(driver, passenger):
    score = 0

    # Location
    lat1, lon1 = driver['location']
    lat2, lon2 = passenger['location']
    dist = math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)
    score += dist * weights['location']

    # Destination
    lat1, lon1 = driver['destination']
    lat2, lon2 = passenger['destination']
    dist = math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)
    score += dist * weights['destination']

    # Departure time
    if driver['departure_time'] == passenger['departure_time']:
        score += 1 * weights['departure_time']

    # Detour time
    detour_time = abs(driver['detour_time'] - passenger['detour_time'])
    score += (1 - detour_time/30) * weights['detour_time']  # Penalize large detours

    # Passenger rating
    score += passenger['rating'] * weights['passenger_rating']

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
            if scores[(i, passenger)] > 0.8 and scores[(i, passenger)] <= 1:
                if scores[(i, passenger)] > driver_passenger_score:
                    best_match = False
    return best_match

'''
Problem:
Driver 0 - Remaining Seats = 5
Driver 1 - Remaining Seats = 1

{(0, 0): 0.8505529803191663, (0, 1): 0.8528118517187816, (0, 2): 0.920823371975058, (0, 3): 0.8478118517187816, (0, 4): 0.8478118517187816, (1, 0): 0.8322588713996153, (1, 1): 0.83, (1, 2): 0.9002539919523523, (1, 3): 0.975, (1, 4): 0.975}

Passenger 4 should now go with driver 0
Since passenger 3 has taken the last place with driver 1

Solution:
Check how many driver:passenger scores are higher for driver 1 than driver 0.
In this case, it is Driver 1 is higher with 2 passengers.
Driver 0 has 3 passengers greater than driver 1.
Since 2 > 1.
Check to see if the number of passengers with a higher score is less than the number of remaining seats i.e. 5.
Since 5 > 3. We can add the passenger 4 to driver 0.

Higher score for driver 0: passenger 0, passenger 1 and passenger 2
Higher score for driver 1: passenger 3 and passenger 4

As driver 1 only has 1 seat left, we can only add passenger 3 to driver 0
'''



matched_pairs = []
matched_drivers = set()
matched_passengers = set()

unmatched_drivers = set()
unmatched_passengers = set()

#If it meets the criteria of the score and is a match, add it to the matched pairs
#If it meets the criteria of the score but is not a match, add it to the check_driver_passenger_pair
#Therefore, if the driver runs out of seats, we can rematch the passengers to the driver

#Once the passenger has a seat, we can remove the passenger from the check_driver_passenger_pair
#No all we do is check that the number of elements in check_driver_passenger_pair is zero at the end
#If not,

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
            if score <= 1 and score >= 0.80 and j not in matched_passengers:
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

#Check to see if check_driver_passenger_pair is empty
#If not, we can add the passenger to the driver
#If it is, we can add the passenger to the unmatched passengers

#Check to see if the driver has any seats left
#If it does, we can add the passenger to the driver
#If it doesn't, we can add the passenger to the unmatched passengers




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
        
# Print the unmatched drivers and passengers
# print("\nUnmatched drivers and passengers: ")
# for i in unmatched_drivers:
#     print(f"Unmatched drivers: {drivers[i]['name']}")

# for j in unmatched_passengers:
#     print(f"Unmatched passengers: {passengers[j]['name']}")

#print(f"\nUnmatched drivers: {unmatched_drivers}")
#print(f"Unmatched passengers: {unmatched_passengers}")