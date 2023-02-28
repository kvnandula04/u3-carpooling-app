import math
from urllib.request import urlopen
import json
import sqlite3
from datetime import datetime, timedelta


#Gets users details from the database
class Database:
    def __init__(self):
        self.db = sqlite3.connect('database.db')
        self.cursor = self.db.cursor()

    
        self.cursor.execute("CREATE TABLE IF NOT EXISTS drivers (id INTEGER PRIMARY KEY, name TEXT, location TEXT, destination TEXT, departure_time TEXT, detour_distance TEXT, rating TEXT, luggage_space TEXT, seats TEXT)")
        self.db.commit()

        self.cursor.execute("CREATE TABLE IF NOT EXISTS passengers (id INTEGER PRIMARY KEY, name TEXT, location TEXT, destination TEXT, departure_time TEXT, rating TEXT)")
        self.db.commit()


    def get_table_details(self, table_name):
        self.cursor.execute("SELECT * FROM "+ table_name)
        return self.cursor.fetchall()
    
    def add_driver(self, name, location, destination, departure_time, detour_distance, rating, luggage_space, seats):
        self.cursor.execute("INSERT INTO drivers (name, location, destination, departure_time, detour_distance, rating, luggage_space, seats) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (name, location, destination, departure_time, detour_distance, rating, luggage_space, seats))
        self.db.commit()
        

    def add_passenger(self, name, location, destination, departure_time, rating):
        self.cursor.execute("INSERT INTO passengers (name, location, destination, departure_time, rating) VALUES (?, ?, ?, ?, ?)", (name, location, destination, departure_time, rating))
        self.db.commit()
    

#Uses the API to get the longitude and latitude of the users location and the destination
class API_Requests:
    def __init__(self):
        self.db = Database()
        self.users = self.db.get_user_details()
        
        self.API_KEY = 'AIzaSyAoAyqKYF_RayDjJ80HZTX3OluSChv7qgY'

    #Turn full address into address with + instead of spaces
    def address_to_url(self, address):
        address = address.replace(' ', '+')
        return address
    
    #Get the data from an API
    def get_data(self, address):
        address = 'Bath Brew House, Bath, Uk'
        address_for_API = self.address_to_url(address)

        URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address_for_API+'&key='+self.API_KEY

        response = urlopen(URL)
        data_json = json.loads(response.read())
        
        #Longitude and Latitude
        lat = data_json['results'][0]['geometry']['location']['lat']
        lng = data_json['results'][0]['geometry']['location']['lng']

        #formatted address
        formatted_address = data_json['results'][0]['formatted_address']

        print(formatted_address)
        print((lat, lng))

        return (lat, lng)


#Matching making algorithm
class Matching_Making:
    def __init__(self):
        #Gets the drivers and passengers from the database
        self.db = Database()

        self.drivers = self.db.get_table_details('drivers')
        self.passengers = self.db.get_table_details('passengers')
    
        #Uses the API to get the longitude and latitude of the users location and the destination
        #self.api = API_Requests()
        #self.drivers = self.api.get_data('Bath Brew House, Bath, Uk')

        #Weights for the scoring system
        self.weights = {
            'location': 0.25,
            'destination': 0.25,
            'departure_time': 1.25,
            'detour_distance': 2.00,
            'passenger_rating': 0.15,
            'driver_rating': 0.15
        }

        self.lower_bound = 0.0
        self.upper_bound = 2.0

        self.scores = {}

        self.matched_pairs = []
        self.matched_drivers = set()
        self.matched_passengers = set()

        self.unmatched_drivers = set()
        self.unmatched_passengers = set()

        self.check_driver_passenger_pair = set()


    def time_to_minutes(self, h):
        delta = timedelta(hours=int(h.split(':')[0]), minutes=int(h.split(':')[1]), seconds=int(h.split(':')[2]))
        minutes = delta.total_seconds()/60
        return minutes

    def score_driver_passenger_pair(self, driver, passenger):
        score = 0
        print(driver[2])
        print(driver[2][0])
        # Location
        lat1, lon1 = driver[2]
        print(lat1, lon1)
        lat2, lon2 = passenger[2]
        dist = math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)
        dist *= 100
        location_distance = dist
        score += dist * self.weights['location']

        # Destination
        lat1, lon1 = driver['destination']
        lat2, lon2 = passenger['destination']
        dist = math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)
        dist *= 100
        destination_distance = dist
        score += dist * self.weights['destination']

        driver_time = self.time_to_minutes(driver['departure_time'])
        passenger_time = self.time_to_minutes(passenger['departure_time'])

        if driver_time == passenger_time:
            score = score
        else:
            if abs(driver_time - passenger_time) >= 5 and abs(driver_time - passenger_time) < 10:
                score += score * (self.weights['departure_time'])
            elif abs(driver_time - passenger_time) >= 10 and abs(driver_time - passenger_time) < 15:
                score += score * (self.weights['departure_time'] * 1.25)
            elif abs(driver_time - passenger_time) >= 15 and abs(driver_time - passenger_time) < 30:
                score += score * (self.weights['departure_time'] * 3.5)
            elif abs(driver_time - passenger_time) >= 30 and abs(driver_time - passenger_time) < 45:
                score += score * (self.weights['departure_time'] * 7.5)
            else:
                score += score * (self.weights['departure_time'] * 10)

        if location_distance < driver['detour_distance'] and destination_distance < driver['detour_distance']:
            score = score
        else:
            score = score * (self.weights['detour_distance'] * 10)


        # Passenger rating
        if passenger['rating'] == 5 and passenger['rating'] > 4:
            score += score * (self.weights['passenger_rating'] * 1)
        elif passenger['rating'] == 4 and passenger['rating'] > 3:
            score += score * (self.weights['passenger_rating'] * 1.25)
        elif passenger['rating'] == 3 and passenger['rating'] > 2:
            score += score * (self.weights['passenger_rating'] * 1.5)
        elif passenger['rating'] == 2 and passenger['rating'] > 1:
            score += score * (self.weights['passenger_rating'] * 1.75)
        elif passenger['rating'] == 1 and passenger['rating'] > 0:
            score += score * (self.weights['passenger_rating'] * 2)
        else:
            score += score * (self.weights['passenger_rating'] * 2.5)

        # Driver rating
        score += driver['rating'] * self.weights['driver_rating']

        return score

    def calculate_scores(self):
        for i, driver in enumerate(self.drivers):
            for j, passenger in enumerate(self.passengers):
                pair_score = self.score_driver_passenger_pair(driver, passenger)
                self.scores[(i, j)] = pair_score

    def check_best_match(self, driver, passenger):
        best_match = True
        driver_passenger_score = self.scores[(driver, passenger)]
        for i, driver in enumerate(self.drivers):
            if i != driver:
                if self.scores[(i, passenger)] > self.lower_bound and self.scores[(i, passenger)] <= self.upper_bound:
                    if self.scores[(i, passenger)] > driver_passenger_score:
                        best_match = False

        return best_match
    

    def matching_making(self):
    
        # Sort the scores by descending order
        sorted_scores = sorted(self.scores.items(), key=lambda x: x[1], reverse=True)

        # Loop through each driver in ascending order
        for i in range(max([x[0][0] for x in sorted_scores])+1):
            driver_scores = [(j, score) for (d, j), score in sorted_scores if d == i]

            remaining_seats = self.drivers[i][8]

            if remaining_seats > 0:
                # Sort the driver's scores by descending order
                driver_scores.sort(key=lambda x: x[1], reverse=True)
                for j, score in driver_scores:
                    if score <= self.upper_bound and score >= self.lower_bound and j not in self.matched_passengers:
                        if self.check_best_match(i, j):
                            self.matched_pairs.append((i, j, score))
                            self.matched_drivers.add(i)
                            self.matched_passengers.add(j)
                            remaining_seats -= 1
                            for driver, passenger in self.check_driver_passenger_pair.copy():
                                if passenger == j:
                                    self.check_driver_passenger_pair.discard((driver, j))
                            if remaining_seats == 0:
                                break
                        else:
                            self.check_driver_passenger_pair.add((i,j))


        #Checks to see if the driver has any seats left and if so, adds the passenger to the matched pairs

        for driver_check, passenger_check in self.check_driver_passenger_pair.copy():
            for i in self.drivers:
                if i[1] == driver_check:
                    remaining_seats = i[8]
            #remaining_seats = self.drivers[driver_check][8]

            for (driver, passenger, score) in self.matched_pairs:
                if driver == driver_check:
                    remaining_seats -= 1

            if remaining_seats != 0:
                self.matched_pairs.append((driver_check, passenger_check, score))
                self.matched_passengers.add(passenger_check)
                self.check_driver_passenger_pair.discard((driver_check, passenger_check))
            else:
                self.unmatched_passengers.add(passenger_check)

        # Find unmatched drivers and passengers
        # for i, driver in enumerate(drivers):
        #     if i not in self.matched_drivers:
        #         self.unmatched_drivers.add(i)

        # for j, passenger in enumerate(passengers):
        #     if j not in self.matched_passengers:
        #         self.unmatched_passengers.add(j)


    def get_matched_pairs(self):
       #return self.matched_pairs
    
        # Print the matched pairs for each driver
        print("Matched pairs: ")
        for i in self.matched_drivers:
            driver_pairs = [(j, score) for (d, j, score) in self.matched_pairs if d == i]
            #print(f"For driver {i}: {driver_pairs}")
            for j, score in driver_pairs:
                print(f"Driver {drivers[i]['name']} is matched with passenger {passengers[j]['name']} | Score of: {score}")

    
    def get_unmatched_drivers(self):
        #return self.unmatched_drivers
        for i in self.unmatched_drivers:
            print(f"Unmatched drivers: {drivers[i]['name']}")
            
    def get_unmatched_passengers(self):
        #return self.unmatched_passengers
        for j in self.unmatched_passengers:
            print(f"Unmatched passengers: {passengers[j]['name']}")

def main():

    #Test database
    print("Test database")
    db = Database()

    # db.add_driver("John", "(51.388870, -2.357350)", "(51.380092, -2.359903)", "08:00:00", 2, 5, 2, 2)
    # db.add_driver("Sam", "(40.7120, -73.9970)", "(40.7282, -74.0776)", "08:00:00", 2, 5, 2, 2)

    # db.add_passenger("Jane", "(51.381237, -2.3652668)", "(51.380092, -2.359903)", "08:00:00", "5")
    # db.add_passenger("Joe", "(51.381590, -2.359940)", "(51.380092, -2.359903)", "08:14:00", "5")

    #Print data
    # driver_results = db.get_table_details("drivers")
    # passenger_results = db.get_table_details("passengers")
    # #print(driver_results[0])
    # #Get name of driver
    # driver_name = driver_results[0][8]
    #print(driver_name)

    #for i in driver_results:
     #   if i[1] == 'John':
      #      print("Driver name: ", i[1])
    


    # # Create a matching object
    matching = Matching_Making()

    # Calculate the scores
    matching.calculate_scores()

    # Make the matching
    matching.matching_making()

    # Print the matched pairs
    matching.get_matched_pairs()

    # # Print the unmatched drivers
    # matching.get_unmatched_drivers()

    # # Print the unmatched passengers
    # matching.get_unmatched_passengers()

if __name__ == "__main__":
    main()