from urllib.request import urlopen
from base64 import b64decode
import json
from datetime import timedelta
from daemon import *
from tests import *

def runDataBase():

	with app.app_context():
                
        # tableOperate("insert", dictionary_formatter("Offer", {"poolID": "1"}))
        #tableOperate("insert", {"table": "User",  "name": "John", "email": "js15@bath.ac.uk", "pwdHash": "Hello1"})

		#tableOperate("insert", {"table": "User",  "name": "John", "email": "js15@bath.ac.uk", "pwdHash": "Hello1"})
		#tableOperate("insert", {"table": "User",  "name": "Sam", "email": "sw125@bath.ac.uk", "pwdHash": "Hello2"})
		#tableOperate("insert", {"table": "User",  "name": "Jane", "email": "jo2@bath.ac.uk", "pwdHash": "Hello3"})
		#tableOperate("insert", {"table": "User",  "name": "Joe", "email": "jp3@bath.ac.uk", "pwdHash": "Hello4"})
		#tableOperate("insert", {"table": "User",  "name": "Jill", "email": "jq1@bath.ac.uk", "pwdHash": "Hello5"})

		#tableOperate("insert", {"table": "Licence", "licenceNumber": "JOHN92739LOA", "userID": 1, "vehicleID": 1})
		#tableOperate("insert", {"table": "Licence", "licenceNumber": "SAM922431OSA", "userID": 2, "vehicleID": 2})

		# tableOperate("insert", {"table": "Pool", "licenceID": 1})
		# tableOperate("insert", {"table": "Pool", "licenceID": 2})

		# tableOperate("insert", {"table": "Offer", "userID": 1, "poolID": 1, "role": 1, "settings": json.dumps({"location": "Bath, Brew House, 14 James St W, Bath BA1 2BX, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:00", "detour_distance": 2, "rating": 5, "seats": 2})})
		# tableOperate("insert", {"table": "Offer", "userID": 2, "poolID": 2, "role": 1, "settings": json.dumps({"location": "Roman Baths, Bath BA1 1LZ, UK", "destination": "University of Bath, Bath, UK", "departure_time": "09:00", "detour_distance": 5, "rating": 4.5, "seats": 5})})
		# tableOperate("insert", {"table": "Offer", "userID": 3, "poolID": 0, "role": 0, "settings": json.dumps({"location": "Bath, Brew House, 14 James St W, Bath BA1 2BX, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:00", "rating": 5})})
		# tableOperate("insert", {"table": "Offer", "userID": 4, "poolID": 0,"role": 0, "settings": json.dumps({"location": "Bath Spa Railway Station, Bath BA1 1QY, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:14", "rating": 5})})
		# tableOperate("insert", {"table": "Offer", "userID": 5, "poolID": 0, "role": 0, "settings": json.dumps({"location": "Bath Spa Railway Station, Bath BA1 1QY, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:45", "rating": 4})})

		tableOperate("insert", {"table": "Offer", "userID": 1, "poolID": 1, "role": 1, "settings": json.dumps({"location": "Bath, Brew House, 14 James St W, Bath BA1 2BX, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:00", "detour_distance": 2, "rating": 5, "seats": 2})})
		tableOperate("insert", {"table": "Offer", "userID": 2, "poolID": 0, "role": 0, "settings": json.dumps({"location": "Bath, Brew House, 14 James St W, Bath BA1 2BX, UK", "destination": "University of Bath, Bath, UK", "departure_time": "08:00", "detour_distance": 5, "rating": 5, "seats": 2})})


runDataBase()