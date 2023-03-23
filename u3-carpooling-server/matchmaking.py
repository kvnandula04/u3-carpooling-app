import math
from urllib.request import urlopen
from base64 import b64decode
import json
from datetime import timedelta

list_of_drivers = []
list_of_passengers = []

lower_bound_score = 0.0
upper_bound_score = 2.0

#Scoring system
weights = {
    'location': 0.25,
    'destination': 0.25,
    'departure_time': 1.25,
    'detour_distance': 2.00,
    'passenger_rating': 0.15,
    'driver_rating': 0.15,
}

matched_pairs = []
matched_drivers = set()
matched_passengers = set()

unmatched_drivers = set()
unmatched_passengers = set()

check_driver_passenger_pair = set()

#Database connection
def runDatabase(tableOperate):
    #-------------------Inserting data into database-------------------
    # tableOperate("insert", {"table": "User",  "name": "John", "email": "js15@bath.ac.uk", "pwdHash": "Hello1"})
    # tableOperate("insert", {"table": "User",  "name": "Sam", "email": "sw125@bath.ac.uk", "pwdHash": "Hello2"})
    # tableOperate("insert", {"table": "User",  "name": "Jane", "email": "jo2@bath.ac.uk", "pwdHash": "Hello3"})
    # tableOperate("insert", {"table": "User",  "name": "Joe", "email": "jp3@bath.ac.uk", "pwdHash": "Hello4"})
    # tableOperate("insert", {"table": "User",  "name": "Jill", "email": "jq1@bath.ac.uk", "pwdHash": "Hello5"})

    # tableOperate("insert", {"table": "Licence", "licenceNumber": "JOHN92739LOA", "userID": 1, "vehicleID": 1})
    # tableOperate("insert", {"table": "Licence", "licenceNumber": "SAM922431OSA", "userID": 2, "vehicleID": 2})

    # tableOperate("insert", {"table": "Pool", "licenceID": 1})
    # tableOperate("insert", {"table": "Pool", "licenceID": 2})

    # tableOperate("insert", {"table": "Offer", "userID": 1, "poolID": 1, "role": 1, "settings": json.dumps({"location": "Bath, Brew House, 14 James St W, Bath BA1 2BX, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:00:00", "detour_distance": 2, "rating": 5, "seats": 2})})
    # tableOperate("insert", {"table": "Offer", "userID": 2, "poolID": 2, "role": 1, "settings": json.dumps({"location": "Roman Baths, Bath BA1 1LZ, UK", "destination": "University of Bath, Bath, UK", "departure_time": "09:00:00", "detour_distance": 5, "rating": 4.5, "seats": 5})})
    # tableOperate("insert", {"table": "Offer", "userID": 3, "poolID": 0, "role": 0, "settings": json.dumps({"location": "Bath, Brew House, 14 James St W, Bath BA1 2BX, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:00:00", "rating": 5})})
    # tableOperate("insert", {"table": "Offer", "userID": 4, "poolID": 0,"role": 0, "settings": json.dumps({"location": "Bath Spa Railway Station, Bath BA1 1QY, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:14:00", "rating": 5})})
    # tableOperate("insert", {"table": "Offer", "userID": 5, "poolID": 0, "role": 0, "settings": json.dumps({"location": "Bath Spa Railway Station, Bath BA1 1QY, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:45:00", "rating": 4})})

    #-------------------Selecting data from database-------------------
    # # Retrieve the record as a JSON string
    # offerString = tableOperate("select", {"table": "Offer", "offerID": 1})[0].get_data().decode("UTF-8")
    # # Convert it to a dictionary
    # offerDict = json.loads(offerString)[0]
    # # Extract and convert settings to a dictionary
    # offerSettings = json.loads(offerDict["settings"])

    # print("OFFER:")
    # print(offerDict)
    # print("SETTINGS:")
    # print(offerSettings)
    # print("LOCATION:")
    # print(offerSettings["location"])

    #-------------------Adds drivers to list_of_drivers-------------------
    response = tableOperate("select", {"table": "Offer", "role":1})
    status = response[1]
    body = response[0]
    if status != "200": # If error status
        print("ERROR:",status)
        print("REASON:",body)
        return

    get_drivers = body.get_data().decode("UTF-8")
    get_drivers_dictionary = json.loads(get_drivers)

    for drivers in get_drivers_dictionary:
        driverDictionary = {}
        driverID = drivers["userID"]
        driverPoolID = drivers["poolID"]
        driverOfferID = drivers["offerID"]
        driverSettings = json.loads(drivers["settings"])
        driversLocation = driverSettings["location"]
        driversDestination = driverSettings["destination"]
        driversDepartureTime = driverSettings["departure_time"]
        driversDetourDistance = driverSettings["detour_distance"]
        driversRating = driverSettings["rating"]
        driversSeats = driverSettings["seats"]
        driverDictionary["userID"] = driverID
        driverDictionary["poolID"] = driverPoolID
        driverDictionary["offerID"] = driverOfferID
        driverDictionary["location"] = driversLocation
        driverDictionary["destination"] = driversDestination
        driverDictionary["departure_time"] = driversDepartureTime
        driverDictionary["detour_distance"] = int(driversDetourDistance)
        driverDictionary["rating"] = int(driversRating)
        driverDictionary["seats"] = int(driversSeats)

        list_of_drivers.append(driverDictionary)

    
    #-------------------Adds passengers to list_of_passengers-------------------
    response = tableOperate("select", {"table": "Offer", "role":0})
    status = response[1]
    body = response[0]
    if status != "200": # If error status
        print("ERROR:",status)
        print("REASON:",body)
        return
    
    get_passengers = body.get_data().decode("UTF-8")
    get_passengers_dictionary = json.loads(get_passengers)

    for passengers in get_passengers_dictionary:
        passengerDictionary = {}
        passengerID = passengers["userID"]
        passengerOfferID = passengers["offerID"]
        passengerSettings = json.loads(passengers["settings"])
        passengersLocation = passengerSettings["location"]
        passengersDestination = passengerSettings["destination"]
        passengersDepartureTime = passengerSettings["departure_time"]
        passengersRating = passengerSettings["rating"]
        passengerDictionary["userID"] = passengerID
        passengerDictionary["offerID"] = passengerOfferID
        passengerDictionary["location"] = passengersLocation
        passengerDictionary["destination"] = passengersDestination
        passengerDictionary["departure_time"] = passengersDepartureTime
        passengerDictionary["rating"] = int(passengersRating)

        list_of_passengers.append(passengerDictionary)

#Convert time to minutes
def time_to_minutes(h):
    delta = timedelta(hours=int(h.split(':')[0]), minutes=int(h.split(':')[1]))
    minutes = delta.total_seconds()/60
    return minutes

#Turn full address into address with + instead of spaces
def address_to_url(address):
    address = address.replace(' ', '+')
    return address

#Get the data from an API
def get_data(address):

    address_for_API = address_to_url(address)

    API_KEY = 'AIzaSyAoAyqKYF_RayDjJ80HZTX3OluSChv7qgY'
    URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address_for_API+'&key='+API_KEY

    response = urlopen(URL)
    data_json = json.loads(response.read())
    
    #Longitude and Latitude
    lat = data_json['results'][0]['geometry']['location']['lat']
    lng = data_json['results'][0]['geometry']['location']['lng']

    return (lat, lng)

#Calculate the score for a driver and passenger pair
def score_driver_passenger_pair(driver, passenger):
    score = 0    

    drivers_location = get_data(driver['location'])
    passengers_location = get_data(passenger['location'])

    drivers_destination = get_data(driver['destination'])
    passengers_destination = get_data(passenger['destination'])

    # Location
    lat1, lon1 = drivers_location
    lat2, lon2 = passengers_location
    dist = math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)
    dist *= 100
    location_distance = dist
    score += dist * weights['location']

    # Destination
    lat1, lon1 = drivers_destination
    lat2, lon2 = passengers_destination
    dist = math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)
    dist *= 100
    destination_distance = dist
    score += dist * weights['destination']

    driver_time = time_to_minutes(driver['departure_time'])
    passenger_time = time_to_minutes(passenger['departure_time'])

    #print("driver: ",driver['userID']," ",driver_time)
    #print("passenger: ",passenger['userID']," ",passenger_time)

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

    if int(location_distance) < int(driver['detour_distance']) and int(destination_distance) < int(driver['detour_distance']):
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

def matchmaking_algorithm(app, tableOperate):
    with app.app_context():
        
        #print("Running matchmaking")

        runDatabase(tableOperate)

        #Calculate a score for each driver-passenger pair
        scores = {}

        for i, driver in enumerate(list_of_drivers):
            for j, passenger in enumerate(list_of_passengers):
                pair_score = score_driver_passenger_pair(driver, passenger)
                scores[(i, j)] = pair_score

        #print("Scores: ", scores)

        #Match drivers and passengers section

        #Checks to see if the current driver is the best match for the passenger
        #It does this by checking if the same passenger has a higher score in the range of 0.8 to 1.0 with another driver
        def check_best_match(driver, passenger):
            best_match = True
            driver_passenger_score = scores[(driver, passenger)]
            for i, driver in enumerate(list_of_drivers):
                if i != driver:
                    if scores[(i, passenger)] > lower_bound_score and scores[(i, passenger)] <= upper_bound_score:
                        if scores[(i, passenger)] > driver_passenger_score:
                            best_match = False
            return best_match

        # Sort the scores by descending order
        sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        if len(sorted_scores) == 0:
            exit()

        # Loop through each driver in ascending order
        for i in range(max([x[0][0] for x in sorted_scores])+1):
            driver_scores = [(j, score) for (d, j), score in sorted_scores if d == i]

            remaining_seats = list_of_drivers[i]['seats']

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
            remaining_seats = list_of_drivers[driver_check]['seats']

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
        for i, driver in enumerate(list_of_drivers):
            if i not in matched_drivers:
                unmatched_drivers.add(i)

        for j, passenger in enumerate(list_of_passengers):
            if j not in matched_passengers:
                unmatched_passengers.add(j)

        alreadyAddedPassengers = []
        #Add matched pairs to database
        for i in matched_drivers:

            driver_pairs = [(j, score) for (d, j, score) in matched_pairs if d == i]
            already_inputted_driver = False

            driver_user_id = list_of_drivers[i]['userID']
            driver_offer_id = list_of_drivers[i]['offerID']

            driver_pool_id = None

            for driver_from_list in list_of_drivers:
                if driver_from_list['userID'] == driver_user_id:
                    driver_pool_id = driver_from_list['poolID']
                    break        

            for j, score in driver_pairs:

                passenger_user_id = list_of_passengers[j]['userID']
                passenger_offer_id = list_of_passengers[j]['offerID']
                
                if already_inputted_driver == False:
                    already_inputted_driver = True
                    tableOperate("insert", {"table": "PoolSubscriber",  "poolID": driver_pool_id, "userID": driver_user_id})

                if driver_pool_id != None:
                    if passenger_user_id not in alreadyAddedPassengers:
                        tableOperate("insert", {"table": "PoolSubscriber",  "poolID": driver_pool_id, "userID": passenger_user_id})
                        alreadyAddedPassengers.append(passenger_user_id)
                #tableOperate("delete", {"table": "Offer", "offerID": passenger_offer_id})
            #tableOperate("delete", {"table": "Offer", "offerID": driver_offer_id})
