from flask import Flask, Response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from hashlib import sha256
from datetime import datetime
import json
import argparse
import requests

app = Flask(__name__)

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# DB mirrors columns in the file rather than defining in the table models
db.Model.metadata.reflect(db.engine)

# Exceptions
class DBError(ValueError):
    pass

# Table definitions
class User(db.Model):
    __tablename__ = 'User'
    __table_args__ = {'extend_existing': True}
    userID = db.Column(db.Integer, primary_key=True)

class Contact(db.Model):
    __tablename__ = 'Contact'
    __table_args__ = {'extend_existing': True}
    userID = db.Column(db.Integer, primary_key=True)
    contactID = db.Column(db.Integer, primary_key=True)

class Licence(db.Model):
    __tablename__ = 'Licence'
    __table_args__ = {'extend_existing': True}
    licenceID = db.Column(db.Integer, primary_key=True)

class Vehicle(db.Model):
    __tablename__ = 'Vehicle'
    __table_args__ = {'extend_existing': True}
    vehicleID = db.Column(db.Integer, primary_key=True)

class Pool(db.Model):
    __tablename__ = 'Pool'
    __table_args__ = {'extend_existing': True}
    poolID = db.Column(db.Integer, primary_key=True)

class PoolSubscriber(db.Model):
    __tablename__ = 'PoolSubscriber'
    __table_args__ = {'extend_existing': True}
    userID = db.Column(db.Integer, primary_key=True)
    poolID = db.Column(db.Integer, primary_key=True)

class Schedule(db.Model):
    __tablename__ = 'Schedule'
    __table_args__ = {'extend_existing': True}
    scheduleID = db.Column(db.Integer, primary_key=True)

class Offer(db.Model):
    __tablename__ = 'Offer'
    __table_args__ = {'extend_existing': True}
    offerID = db.Column(db.Integer, primary_key=True)

class Journey(db.Model):
    __tablename__ = 'Journey'
    __table_args__ = {'extend_existing': True}
    journeyID = db.Column(db.Integer, primary_key=True)

class Transaction(db.Model):
    __tablename__ = 'Transaction'
    __table_args__ = {'extend_existing': True}
    transactionID = db.Column(db.Integer, primary_key=True)
    
class Review(db.Model):
    __tablename__ = 'Review'
    __table_args__ = {'extend_existing': True}
    reviewID = db.Column(db.Integer, primary_key=True)

def tableInsert(table, data):
    try:
        if table == "User":
            user = User.query.filter_by(email=data["email"]).first()
            if user is not None:
                return "","400 user already exists"
            new = User(name=data["name"],email=data["email"],pwdHash=data["pwdHash"])
        
        elif table == "Contact":
            user = User.query.filter_by(email=data["userID"]).first()
            contact = User.query.filter_by(userID=data["contactID"]).first()
            if user is None or contact is None:
                return "","400 invalid user/contact"
            new = Contact(userID=data["userID"],contactID=data["contactID"])

        elif table == "Licence":
            new = None

        elif table == "Vehicle":
            new = None

        elif table == "Pool":
            new = None

        elif table == "PoolSubscriber":
            new = None

        elif table == "Schedule":
            new = None

        elif table == "Offer":
            new = None

        elif table == "Journey":
            new = None

        elif table == "Transaction":
            new = None

        elif table == "Review":
            new = None
        
        else:
            return "","400 invalid table"

        db.session.add(new)
        return Response(status=200)
        
    except KeyError:
        return "","400 invalid column"

def tableUpdate(table, data):
    return Response(status=500)

def tableSelect(table, data):
    return Response(status=500)

def tableDelete(table, data):
    return Response(status=500)
    
def tableOperate(op, data):
    if "table" in data:
        table = data["table"]
        del data["table"]
        response = Response(status=400)
        if op == "insert":
            response = tableInsert(table, data)
        elif op == "update":
            response = tableUpdate(table, data)
        elif op == "select":
            response = tableSelect(table, data)
        elif op == "delete":
            response = tableDelete(table, data)
            
    db.session.commit()
    return response

def vehicleLookup(data):
    if not "registrationNumber" in data:
        return "","400 invalid reg. number"
    vehicle = Vehicle.query.filter_by(registrationNumber=data["registrationNumber"]).first()
    if vehicle:
        return vehicle.dump_to_json()

    url = "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles"
    headers = {"Content-Type":"application/json", "x-api-key":"Fyp6cJA7Dq2BDeMnrgNyMaJ7rrs0C6BT7nOuQVab"}
    data = {"registrationNumber":data["registrationNumber"]}   

    ## And insert into DB

    record = requests.post(url, headers=headers, json=data).json()

    ## Return failure if 404
    
    return record

# Default POST template for now
@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()
    if not data:
        return Response(status=204)         # No response if no payload

    response = Response(status=400)         # Bad request if operation cannot be identified
    if "operation" in data:
        op = data["operation"]
        del data["operation"]
        if op in ("insert","update","select","delete"):
            return tableOperate(op, data)
        elif op == "vehiclelookup":
            return vehicleLookup(data)

    return response
    
# Debug route
@app.route('/api/debug', methods=['POST'])
def debug():
    if not debug:  
        return Response(status=403)

    data = request.get_json()
    if not data or not "teststring" in data:
        return "POST a \"teststring\" field to test response"
    return "Hello, " + data["teststring"] 
    
debug = False
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--debug", action='store_true')
    parser.add_argument("-t", "--test", action='store_true')
    parser.add_argument("-b", "--broadcast", action='store_true')
    args = parser.parse_args()
    debug = args.debug
    broadcast = args.broadcast

    host = "0.0.0.0" if broadcast else "127.0.0.1"

    if debug:
        print(" * Changing DB to db_debug.sqlite3")
        print(" * Opening debug link at /api/debug")
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

    app.run(debug=debug, host=host, port=3333)
