from flask import Flask, Response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from sqlalchemy_serializer import SerializerMixin
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
class User(db.Model, SerializerMixin):
    __tablename__ = 'User'
    __table_args__ = {'extend_existing': True}
    userID = db.Column(db.Integer, primary_key=True)

class Contact(db.Model, SerializerMixin):
    __tablename__ = 'Contact'
    __table_args__ = {'extend_existing': True}
    userID = db.Column(db.Integer, primary_key=True)
    contactID = db.Column(db.Integer, primary_key=True)

class Licence(db.Model, SerializerMixin):
    __tablename__ = 'Licence'
    __table_args__ = {'extend_existing': True}
    licenceID = db.Column(db.Integer, primary_key=True)

class Vehicle(db.Model, SerializerMixin):
    __tablename__ = 'Vehicle'
    __table_args__ = {'extend_existing': True}
    vehicleID = db.Column(db.Integer, primary_key=True)

class Pool(db.Model, SerializerMixin):
    __tablename__ = 'Pool'
    __table_args__ = {'extend_existing': True}
    poolID = db.Column(db.Integer, primary_key=True)

class PoolSubscriber(db.Model, SerializerMixin):
    __tablename__ = 'PoolSubscriber'
    __table_args__ = {'extend_existing': True}
    userID = db.Column(db.Integer, primary_key=True)
    poolID = db.Column(db.Integer, primary_key=True)

class Schedule(db.Model, SerializerMixin):
    __tablename__ = 'Schedule'
    __table_args__ = {'extend_existing': True}
    scheduleID = db.Column(db.Integer, primary_key=True)

class Offer(db.Model, SerializerMixin):
    __tablename__ = 'Offer'
    __table_args__ = {'extend_existing': True}
    offerID = db.Column(db.Integer, primary_key=True)

class Journey(db.Model, SerializerMixin):
    __tablename__ = 'Journey'
    __table_args__ = {'extend_existing': True}
    journeyID = db.Column(db.Integer, primary_key=True)

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'Transaction'
    __table_args__ = {'extend_existing': True}
    transactionID = db.Column(db.Integer, primary_key=True)
    
class Review(db.Model, SerializerMixin):
    __tablename__ = 'Review'
    __table_args__ = {'extend_existing': True}
    reviewID = db.Column(db.Integer, primary_key=True)

class LocationMap(db.Model, SerializerMixin):
    __tablename__ = 'Location'
    __table_args__ = {'extend_existing': True}
    queryString = db.Column(db.String, primary_key=True)

def getField(data, field):
    if field in data:
        ret = data[field]
        del data[field]
        return ret
    return None

def tableInsert(table, data):
    try:
        if table == "User":
            new = User(**data)
        elif table == "Contact":
            new = Contact(**data)
        elif table == "Licence":
            new = Licence(**data)
        elif table == "Vehicle":
            new = Vehicle(**data)
        elif table == "Pool":
            new = Pool(**data)
        elif table == "PoolSubscriber":
            new = PoolSubscriber(**data)
        elif table == "Schedule":
            new = Schedule(**data)
        elif table == "Offer":
            new = Offer(**data)
        elif table == "Journey":
            new = Journey(**data)
        elif table == "Transaction":
            new = Transaction(**data)
        elif table == "Review":
            new = Review(**data)
        elif table == "LocationMap":
            new = LocationMap(**data)
        else:
            return "invalid table","400"
    except TypeError:
        return "invalid column(s) present","400"

    db.session.add(new)                 # Add new record
    return Response(status=200)         # Respond with success

def tableUpdate(table, data):
    if table == "User":
        mod = User.query.filter(User.userID==getField(data, "userID"))
    elif table == "Licence":
        mod = Licence.query.filter(Licence.licenceID==getField(data, "licenceID"))
    elif table == "Vehicle":
        mod = Vehicle.query.filter(Vehicle.vehicleID==getField(data, "vehicleID"))
    elif table == "Pool":
        mod = Pool.query.filter(Pool.poolID==getField(data, "poolID"))
    elif table == "Schedule":
        mod = Schedule.query.filter(Schedule.scheduleID==getField(data, "scheduleID"))
    elif table == "Offer":
        mod = Offer.query.filter(Offer.offerID==getField(data, "offerID"))
    elif table == "Journey":
        mod = Journey.query.filter(Journey.journeyID==getField(data, "journeyID"))
    elif table == "Transaction":
        mod = Transaction.query.filter(Transaction.transactionID==getField(data, "transactionID"))
    elif table == "Review":
        mod = Review.query.filter(Review.reviewID==getField(data, "reviewID"))
    else:
        return "invalid table","400"

    mod.update(data)

    return Response(status=200)         # Respond with success

def tableSelect(table, data):
    if table == "User":
        res = User.query.filter_by(email=getField(data,"email")).first()
    elif table == "Licence":
        res = Licence.query.filter_by(licenceNumber=getField(data, "licenceNumber"))
    elif table == "Vehicle":
        res = Vehicle.query.get(getField(data, "vehicleID"))
    elif table == "Pool":
        res = Pool.query.get(getField(data, "poolID"))
    elif table == "Schedule":
        res = Schedule.query.get(getField(data, "scheduleID"))
    elif table == "Offer":
        res = Offer.query.get(getField(data, "offerID"))
    elif table == "Journey":
        res = Journey.query.get(getField(data, "journeyID"))
    elif table == "Transaction":
        res = Transaction.query.get(getField(data, "transactionID"))
    elif table == "Review":
        res = Review.query.get(getField(data, "reviewID"))
    elif table == "LocationMap":
        res = LocationMap.query.get(getField(data, "queryString"))
    elif table == "Contact":
        res = Contact.query.filter_by(userID=getField(data,"userID"),contactID=getField(data,"contactID")).first()
    elif table == "PoolSubscriber":
        res = PoolSubscriber.query.filter_by(userID=getField(data,"userID"),contactID=getField(data,"poolID")).first()
    else:
        return "invalid table","400"

    if not res:
        return "invalid id (record does not exist)","400"

    return jsonify(res.to_dict()),"200"       # Respond with success, and deliver record JSON

def tableDelete(table, data):
    if table == "User":
        rem = User.query.get(getField(data, "userID"))
    elif table == "Licence":
        rem = Licence.query.get(getField(data, "licenceID"))
    elif table == "Vehicle":
        rem = Vehicle.query.get(getField(data, "vehicleID"))
    elif table == "Pool":
        rem = Pool.query.get(getField(data, "poolID"))
    elif table == "Schedule":
        rem = Schedule.query.get(getField(data, "scheduleID"))
    elif table == "Offer":
        rem = Offer.query.get(getField(data, "offerID"))
    elif table == "Journey":
        rem = Journey.query.get(getField(data, "journeyID"))
    elif table == "Transaction":
        rem = Transaction.query.get(getField(data, "transactionID"))
    elif table == "Review":
        rem = Review.query.get(getField(data, "reviewID"))
    elif table == "LocationMap":
        rem = LocationMap.query.get(getField(data, "queryString"))
    elif table == "Contact":
        rem = Contact.query.filter_by(userID=getField(data,"userID"),contactID=getField(data,"contactID")).first()
    elif table == "PoolSubscriber":
        rem = PoolSubscriber.query.filter_by(userID=getField(data,"userID"),contactID=getField(data,"poolID")).first()
    else:
        return "invalid table","400"

    if not rem:
        return "invalid id (record does not exist)","400"

    db.session.delete(rem)
    return Response(status=200)
    
def tableOperate(op, data):
    response = "invalid table","400"
    
    if "table" in data:
        table = getField(data, "table")
        if op == "insert":
            response = tableInsert(table, data)
        elif op == "update":
            response = tableUpdate(table, data)
        elif op == "select":
            response = tableSelect(table, data)
        elif op == "delete":
            response = tableDelete(table, data)

    try:
        db.session.commit()                         # Commit changes to DB
    except exc.IntegrityError as ex:
        msg = str(ex).partition('\n')[0]
        msg = ''.join(c for c in msg if c.isalnum() or c == ' ')
        print(msg)
        return msg,"400"
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

def matchmake():
    pass

# Default POST template for now
@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()
    if not data:
        return Response(status=204)                           # No response if no payload

    if "operation" in data:
        op = getField(data, "operation")
        if op in ("insert","update","select","delete"):
            return tableOperate(op, data)
        elif op == "vehiclelookup":
            return vehicleLookup(data)
        elif op == "matchmake":
            return matchmake(data)

    return "operation cannot be identified","400"             # Bad request if operation cannot be identified
    
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
    parser.add_argument("-b", "--broadcast", action='store_true')
    args = parser.parse_args()
    debug = args.debug
    broadcast = args.broadcast
    runtests = args.test

    host = "0.0.0.0" if broadcast else "127.0.0.1"

    if debug:
        print(" * Changing DB to db_debug.sqlite3")
        print(" * Opening debug link at /api/debug")
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'

    app.run(debug=debug, host=host, port=3333)
