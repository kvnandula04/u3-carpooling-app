from daemon import *
import json
from datetime import *
from datetime import timedelta
import pickle



class PseudoSettings:

	def __init__(self, pets, equipment):
		self.pets = pets
		self.equipment = equipment

# response is a tuple containing 2 strings
# 1. the response/error msg, 2. status code (200 == success, 400 == error)
def convert_to_dict(response):
	
	if response[1] == 400:
		return False , response[0]
	else:
		#print("convert dict res", response)
		return True, json.loads(response.decode())

#takes old testing implementation which used the methods directly i.e tableInsert etc.. and adapts it to work with tableOperate
# which requires the table attribute as part of the dictionary 

def dictionary_formatter(table_name, old_dict):
	old_dict["table"] = table_name
	return old_dict

# selection returns a (RESPONSE + STRING) / (RESPONSE, List(STRING)) if SUCCESS
# ELSE returns a (STRING, STRING) 

def parse_into_dict(response):
	if response[1] == "200":
		parsed_data = (json.loads(response[0].get_data()))
		#return the dict
		return parsed_data
	else:
		#else return the error msg
		return response[0]

def testing(output, expected_output, assertion_error):
	assert output == expected_output, assertion_error

def insertion_all_tables():
	# NOTE: vehicle table not tested since it requires the vehicle api, requires implementation post basic tests:
	#print((tableOperate("select", dictionary_formatter("User", {"email":"Harrymydude@bath.ac.uk"}))))
	
	insert_user_userID()
	insert_contact_userID_contactID()
	insert_journey_journeyID()
	insert_licence_licenceID()
	insert_offer_offerID()
	insert_pool_poolID()
	insert_poolSub_poolID_userID()
	insert_review_reviewID()
	insert_schedule_scheduleID()
	insert_transaction_transactionID()
	insert_vehicle_vehicleID()


#TO DO: APPLY ASSERTS TO INSERTIONS
def insert_user_userID():
	res = tableOperate("insert", dictionary_formatter("User", {"email":"mann@bath.ac.uk", "name": "Mann", "pwdHash":"999"}))
	restwo = tableOperate("insert", dictionary_formatter("User", {"email":"bobby123@bath.ac.uk", "name": "bobby", "pwdHash":"1234334"}))

	# if dict_form[0] != False:
	# 	assert dict_form[1]["name"] == "James", "Updating user name, Not changed"
	# else:
	# 	return dict_form[1]


def insert_licence_licenceID():
	tableOperate("insert", dictionary_formatter("Licence", {"userID" : 1, "licenceNumber": "MANN9507139NP9LN", "vehicleID" : 1}))

def insert_contact_userID_contactID():
	tableOperate("insert", dictionary_formatter("Contact", {"userID":1, "contactID": 2}))

def insert_poolSub_poolID_userID():
	tableOperate("insert", dictionary_formatter("PoolSubscriber", {"poolID" : 1, "userID": 2}))

def insert_vehicle_vehicleID():
	tableOperate("insert", dictionary_formatter("Vehicle", {"artEndDate" : "Never", "co2Emissions" : 100, "colour": "Red", "engineCapacity":100, "fuelType": "Diesal", "make" : "Fiat 500", "markedForExport" : 1, "monthOfFirstRegistration" : datetime.now().strftime("%m"), "motStatus" : "Yes", "registrationNumber" : "ABCD 123", "revenueWeight": 100, "taxDueDate" : (datetime.now() + timedelta(days = 50.0)).strftime("%Y"),"taxStatus" : "Valid",	"typeApproval" : "Approved"	, "wheelplan" : "Yes", "yearOfManufacture" : datetime.now().strftime("%d/%m/%Y"),"euroStatus" : "yes", "realDrivingEmissions" : "100", "dateOfLastV5CIssued" : (datetime.now() - timedelta(days = 10.0)).strftime("%d/%m/%Y %H:%M:%S")}))

def insert_pool_poolID():
	tableOperate("insert", dictionary_formatter("Pool", {"licenceID": 1}))

def insert_schedule_scheduleID():
	tableOperate("insert", dictionary_formatter("Schedule", {"poolID":1, "datetime": datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "repeatEvery": " 2 weeks "}))

def insert_journey_journeyID():
	tableOperate("insert", dictionary_formatter("Journey", {"poolID":1, "timeBegin": datetime.now().strftime("%d/%m/%Y %H:%M:%S") , "timeEnd": (datetime.now() + timedelta(minutes=15)).strftime("%d/%m/%Y %H:%M:%S"), "distance" : 50}))

def insert_transaction_transactionID():
	tableOperate("insert", dictionary_formatter("Transaction", {"driverID":1, "passengerID": 1, "datetime": datetime.now().strftime("%d/%m/%Y %H:%M:%S"), "debitAmount": 2.00}))

def insert_review_reviewID():
	tableOperate("insert", dictionary_formatter("Review", {"reviewerID" : 2, "subjectID": 1, "score": 10, "description": "Fantastic driver!"}))

def insert_offer_offerID():
	tableOperate("insert", dictionary_formatter("Offer", {"subjectID": 1, "Role" : 0}))

# def false_selection_all_tables():
# 	print((tableSelect("User", {"email":"gireg@bath.ac.uk"})[0]))
# 	print((tableSelect("User", {"email":"greger@bath.ac.uk"})[0]))
# 	print("Journey : ", (tableSelect("Journey", {"journeyID" : 3435})[0]), "\n")
# 	print("Pool : ", (tableSelect("Pool", {"poolID": 432423})[0]), "\n")
# 	print("Schedule : ", (tableSelect("Schedule", {"scheduleID": 32423})[0]), "\n")
# 	print("Vehicle : ", (tableSelect("Vehicle", {"vehicleID": 123123})[0]), "\n")
	
def selection_user_email():
	return parse_into_dict(tableOperate("select", dictionary_formatter("User", {"email":"mann@bath.ac.uk"})))

def selection_user_name():
	return parse_into_dict(tableOperate("select", dictionary_formatter("User", {"name":"Will"})))

def selection_user_pwdHash():
	return parse_into_dict(tableOperate("select", dictionary_formatter("User", {"pwdHash": 1000})))

def selection_journey_journeyID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("Journey", {"journeyID" : 1})))

def selection_pool_poolID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("Pool", {"poolID": 1})))

def selection_schedule_scheduleID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("Schedule", {"scheduleID": 1})))

def selection_vehicle_vehicleID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("Vehicle", {"vehicleID": 1})))

def selection_licence_licenceID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("Licence", {"licenceNumber":"new-licence-number"})))

def selection_offer_offerID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("Offer", {"offerID" : 1})))

def selection_transaction_transactionID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("Transaction", {"transactionID" : 1})))

def selection_review_reviewID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("Review", {"reviewID" : 1})))

def selection_contact_contact_user_ID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("Contact", {"contactID" : 2, "userID" : 1})))

def selection_poolSub_user_pool_ID():
	return parse_into_dict(tableOperate("select", dictionary_formatter("PoolSubscriber", {"poolID" : 1, "userID" : 1})))

def selection_all_tables():
	#PASSED
	print("User :", (selection_user_name()), "\n")
	print("Journey : ", selection_journey_journeyID(), "\n")
	print("Pool : ", selection_pool_poolID(), "\n")
	print("Schedule : ", selection_schedule_scheduleID(), "\n")
	print("Vehicle : ", selection_vehicle_vehicleID(), "\n")
	
	# Failed, no to dict method? 
	print("Licence: ", selection_licence_licenceID(), "\n")

	#Not implemented yet / correctly
	print("Offer : ", selection_offer_offerID(), "\n")
	print("transaction: ", selection_transaction_transactionID(), "\n")
	print("review: ", selection_review_reviewID(), "\n")
	print("contact: ", selection_contact_contact_user_ID(), "\n")
	print("Pool sub : ", selection_poolSub_user_pool_ID(), "\n")

	'''
	NOTE: Not imlemented since complications db side. 
	must return a list of dictionaries, and must be able to query on it using all, or some combinations of fields

	#transaction is for every driver and passenger.. 
	# what if there are multiple entries for a given passenger?
	# what about if a driver wants to see people that owe him fuel?
	
	#what if you have left multiple reviews?
	# what if you want to see all the reviews where you are the subject? 

	#same here, what if you want a list of contacts? i think multiple entries of user : diff contact id
	# what if you want to see the otherside, how many people have you as contacts <- altho this is redundant

	#what if you want to see all the pools you are a part of?
	# and what about the data about the pools?
	print((tableSelect("PoolSubscriber", {"poolID": 1})[0]))
	'''

def update_user_name():

	res = tableOperate("update", dictionary_formatter("User", {"userID" : 1, "name": "James"}))
	secres = tableOperate("update", dictionary_formatter("User", {"userID" : 98754, "name": "4335432"}))

	print("res: ", type(res))
	print("sec res: ", type(secres))
	print(res.status)
	print(secres.status)

	# dict_form = convert_to_dict((tableOperate("select", dictionary_formatter("User", {"email": "will@bath.ac.uk"}))))


	# if dict_form[0] != False:
	# 	assert dict_form[1]["name"] == "James", "Updating user name, Not changed"
	# else:
	# 	return dict_form[1]

def update_user_email():

	tableOperate("update", dictionary_formatter("User", {"userID": 1, "email": "notmann@bath.ac.uk"}))
	# a tuple containing 1. bool, could it become a dict or not, 2. if not an error msg its dict format

	dict_form = convert_to_dict(tableOperate("select", dictionary_formatter("User", {"userID": 1, "email": "notmann@bath.ac.uk"})))
	
	if dict_form[0] != False:
		assert dict_form[1]["email"] == "notmann@bath.ac.uk", "updating email, Failed to update email"
	else:
		return dict_form[1]

def update_user_pwdHash():

	tableOperate("update", dictionary_formatter("User", {"userID": 1, "pwdHash": "1000"}))
	dict_form = (convert_to_dict(selection_user_pwdHash()))
	      
	if dict_form[0] != False:
		assert dict_form[1]["pwdHash"] == "1000", "updating pwdHash, Failed to update hash"
	else:
		return dict_form[1]

def update_licence_licenceNumber():

	tableOperate("update", dictionary_formatter("Licence", {"licenceID" : 1, "licenceNumber": "new-licence-number"}))
	
	dict_form = convert_to_dict(selection_licence_licenceID())
	
	if dict_form[0] != False:
		assert dict_form[1]["licenceNumber"] == "new-licence-number", "updating licenceNumber, Failed to update licenceNumber"
	else:
		return dict_form[1]

def update_pool_licenceID():

	tableOperate("update", dictionary_formatter("Pool", {"poolID" :1, "licenceID": 44}))
	dict_form = convert_to_dict(selection_pool_poolID())

	if dict_form[0] != False:
		assert dict_form[1]["licenceID"] == 44, "Failed to update LicenceID"
	else:
		return dict_form[1]
	
def update_schedule_dateTime():
	newtime = (datetime.now() + timedelta(minutes=15)).strftime("%d/%m/%Y %H:%M:%S")
	tableOperate("update", dictionary_formatter("Schedule", {"scheduleID": 1, "datetime": newtime}))

	dict_form = convert_to_dict(selection_schedule_scheduleID())

	if dict_form[0] != False:
		assert dict_form[1]["datetime"] == newtime, "Failed to update to a new time"
	else:
		return dict_form[1]

def update_schedule_repeatEvery():
	tableOperate("update", dictionary_formatter("Schedule", {"sched1leID": 1, "repeatEvery": "Every Year"}))

	dict_form = convert_to_dict(selection_schedule_scheduleID())

	if dict_form[0] != False:
		assert dict_form[1]["repeatEvery"] == "Every Year" , "Failed to change repeat schedule"
	else:
		return dict_form[1]

#do we want them to be able to ammend their settings? is that allowed after an offer is made?
def update_offer_settings():
	pass


def update_all_tables():
	try:
		update_user_name()
		update_user_email()
		update_user_pwdHash()
		update_licence_licenceNumber()
		update_schedule_dateTime()
		update_schedule_repeatEvery()
		update_pool_licenceID()

	except AssertionError as e:
		print(e.args)

def delete_user_userID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):

		tableOperate("delete", dictionary_formatter("User", {"userID": i}))

	if (assert_bool == True):
		assert selection_user_email() == "invalid id (record does not exist)"

def delete_licence_licenceID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("Licence", {"licenceID": i}))

	if (assert_bool == True):
		assert selection_licence_licenceID() == "invalid id (record does not exist)"

def delete_vehicle_vehicleID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("Vehicle", {"vehicleID": i}))

	if (assert_bool == True):
		assert selection_vehicle_vehicleID() == "invalid id (record does not exidelete_upto"

def delete_pool_poolID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("Pool", {"poolID": i}))

	if (assert_bool == True):
		assert selection_pool_poolID() == "invalid id (record does not exist)"

def delete_schedule_scheduleID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("Schedule", {"scheduleID": i}))

	if (assert_bool == True):
		assert selection_schedule_scheduleID() == "invalid id (record does not exist)"

def delete_offer_offerID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("Offer", {"offerID": i}))

	if (assert_bool == True):
		assert selection_offer_offerID() == "invalid id (record does not exist)"

def delete_journey_journeyID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("Journey", {"journeyID": i}))

	if (assert_bool == True):
		assert selection_journey_journeyID() == "invalid id (record does not exist)"

def delete_transaction_transactionID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("Transaction", {"transactionID": i}))

	if (assert_bool == True):
		assert selection_transaction_transactionID() == "invalid id (record does not exist)"

def delete_review_userID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("Review", {"reviewID": i}))

	if (assert_bool == True):
		assert (tableOperate("select", dictionary_formatter("User", {"email":"gireg@bath.ac.uk"})[0]) == "invalid id (record does not exist)")

def delete_contact_userID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("Contact", {"userID" : 1, "contactID": i}))

	if (assert_bool == True):
		assert (tableOperate("select", dictionary_formatter("User", {"email":"gireg@bath.ac.uk"})[0]) == "invalid id (record does not exist)")

def delete_poolSub_userID(assert_bool, delete_upto):
	
	for i in range(0, delete_upto):
		tableOperate("delete", dictionary_formatter("PoolSubscriber", {"userID": 1, "poolID": 1}))

	if (assert_bool == True):
		assert (tableOperate("select", dictionary_formatter("User", {"email":"gireg@bath.ac.uk"})[0]) == "invalid id (record does not exist)")

def deletion_all_tables(assert_bool, anum):
	delete_user_userID(assert_bool, anum)
	delete_contact_userID(assert_bool, anum)
	delete_journey_journeyID(assert_bool, anum)
	delete_licence_licenceID(assert_bool, anum)
	delete_offer_offerID(assert_bool, anum)
	delete_pool_poolID(assert_bool, anum)
	delete_poolSub_userID(assert_bool, anum)
	delete_review_userID(assert_bool, anum)
	delete_schedule_scheduleID(assert_bool, anum)
	delete_transaction_transactionID(assert_bool, anum)
	delete_vehicle_vehicleID(assert_bool, anum)



def runAll():
	
	with app.app_context():
		
		#
		#insertion_all_tables()

		# tableOperate("insert", dictionary_formatter("User", {"email":"will2@bath.ac.uk", "name": "Will", "pwdHash":"1002"}))
		# tableOperate("insert", dictionary_formatter("User", {"email":"will3@bath.ac.uk", "name": "Will", "pwdHash":"1003"}))

		#selection_all_tables()

		deletion_all_tables(False, 30)
		insert_user_userID()
		res = tableOperate("insert", dictionary_formatter("User", {"email":"will2@bath.ac.uk", "name": "Will", "pwdHash":"1002"}))

		# selection returns a (RESPONSE + STRING) / (RESPONSE, List(STRING)) if SUCCESS
		# ELSE returns a (STRING, STRING) 
		# 
		# And insertions return a (STRING, STRING)		
		# Update returns a (STRING, STRING) regardless (since can update records which dont exist aswell)

		# so must check to see whether the data from select is an error code (indicated by x[1] == 200 or not)
		# if success parse it else return it.
		
		tableOperate("insert", dictionary_formatter("User", {"email":"will3@bath.ac.uk", "name": "Will", "pwdHash":"1003"}))

		a = (tableOperate("delete", dictionary_formatter("User", {"userID": 1})))
		print(a, type(a))

		# updating records which dont exist returns a success msg.
		b = (tableOperate("delete", dictionary_formatter("User", {"userID": 50})))
		print(b, type(b[0]))


		

if __name__ == '__main__':
	runAll()


# import my_app
# import unittest


# class MyTestCase(unittest.TestCase):

#     def setUp(self):
#         my_app.app.testing = True
#         self.app = my_app.app.test_client()

#     def test_home(self):
#         result = self.app.get('/')
#         # Make your assertions
