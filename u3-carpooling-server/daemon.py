from flask import Flask, Response, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import exc
from sqlalchemy_serializer import SerializerMixin
from hashlib import sha256
from datetime import datetime
import json
import argparse
import requests
import tests

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

def __getField(data, field):
    if field in data:
        ret = data[field]
        del data[field]
        return ret
    return None

def __tableInsert(table, data):
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
        else:
            return "invalid table","400"
    except TypeError:
        return "invalid column(s) present","400"

    db.session.add(new)                 # Add new record
    return Response(status=200)         # Respond with success

def __tableUpdate(table, data):
    if table == "User":
        mod = User.query.filter(        User.userID==__getField(data, "userID") )
    elif table == "Licence":
        mod = Licence.query.filter(     Licence.licenceID==__getField(data, "licenceID") )
    elif table == "Vehicle":
        mod = Vehicle.query.filter(     Vehicle.vehicleID==__getField(data, "vehicleID") )
    elif table == "Pool":
        mod = Pool.query.filter(        Pool.poolID==__getField(data, "poolID") )
    elif table == "Schedule":
        mod = Schedule.query.filter(    Schedule.scheduleID==__getField(data, "scheduleID") )
    elif table == "Offer":
        mod = Offer.query.filter(       Offer.offerID==__getField(data, "offerID") )
    elif table == "Journey":
        mod = Journey.query.filter(     Journey.journeyID==__getField(data, "journeyID") )
    elif table == "Transaction":
        mod = Transaction.query.filter( Transaction.transactionID==__getField(data, "transactionID") )
    elif table == "Review":
        mod = Review.query.filter(      Review.reviewID==__getField(data, "reviewID") )
    else:
        return "invalid table","400"

    mod.update(data)

    return Response(status=200)         # Respond with success

def __tableSelect(table, data):
    if table == "User":
        res = User.query.filter(        (User.userID==__getField(data,"userID")) |\
                                        (User.name==__getField(data,"name")) |\
                                        (User.email==__getField(data,"email")) ).all()
    elif table == "Licence":
        res = Licence.query.filter(     (Licence.licenceID==__getField(data,"licenceID")) |\
                                        (Licence.licenceNumber==__getField(data,"licenceNumber")) |\
                                        (Licence.userID==__getField(data,"userID")) |\
                                        (Licence.vehicleID==__getField(data,"vehicleID")) ).all()
    elif table == "Vehicle":
        res = Vehicle.query.filter(     (Vehicle.vehicleID==__getField(data,"vehicleID")) |\
                                        (Vehicle.registrationNumber==__getField(data,"registrationNumber")) ).all()
    elif table == "Pool":
        res = Pool.query.filter(        (Pool.poolID==__getField(data,"poolID")) |\
                                        (Pool.licenceID==__getField(data,"licenceID")) ).all()
    elif table == "Schedule":
        res = Schedule.query.filter(    (Schedule.scheduleID==__getField(data,"scheduleID")) |\
                                        (Schedule.poolID==__getField(data,"poolID")) ).all()
    elif table == "Offer":
        res = Offer.query.filter(       (Offer.offerID==__getField(data,"offerID")) |\
                                        (Offer.userID==__getField(data,"userID")) |\
                                        (Offer.poolID==__getField(data,"poolID")) ).all()
    elif table == "Journey":
        res = Journey.query.filter(     (Journey.journeyID==__getField(data,"journeyID")) |\
                                        (Journey.poolID==__getField(data,"poolID")) ).all()
    elif table == "Transaction":
        res = Transaction.query.filter( (Transaction.transactionID==__getField(data,"transactionID")) |\
                                        (Transaction.driverID==__getField(data,"driverID")) |\
                                        (Transaction.passengerID==__getField(data,"passengerID")) ).all()
    elif table == "Review":
        res = Review.query.filter(      (Review.reviewID==__getField(data, "reviewID")) |\
                                        (Review.reviewerID==__getField(data, "reviewerID")) |\
                                        (Review.subjectID==__getField(data, "subjectID")) ).all()
    elif table == "Contact":
        res = Contact.query.filter(     (Contact.userID==__getField(data,"userID")) |\
                                        (Contact.contactID==__getField(data,"contactID")) ).all()
    elif table == "PoolSubscriber":
        res = PoolSubscriber.query.filter((PoolSubscriber.userID==__getField(data,"userID")) |\
                                          (PoolSubscriber.poolID==__getField(data,"poolID")) ).all()
    else:
        return "invalid table","400"

    if not res:
        return "invalid id (record does not exist)","400"

    return jsonify([r.to_dict() for r in res]),"200"       # Respond with success, and deliver record JSON

def __tableDelete(table, data):
    if table == "User":
        rem = User.query.get(       __getField(data, "userID"))
    elif table == "Licence":
        rem = Licence.query.get(    __getField(data, "licenceID"))
    elif table == "Vehicle":
        rem = Vehicle.query.get(    __getField(data, "vehicleID"))
    elif table == "Pool":
        rem = Pool.query.get(       __getField(data, "poolID"))
    elif table == "Schedule":
        rem = Schedule.query.get(   __getField(data, "scheduleID"))
    elif table == "Offer":
        rem = Offer.query.get(      __getField(data, "offerID"))
    elif table == "Journey":
        rem = Journey.query.get(    __getField(data, "journeyID"))
    elif table == "Transaction":
        rem = Transaction.query.get(__getField(data, "transactionID"))
    elif table == "Review":
        rem = Review.query.get(     __getField(data, "reviewID"))
    elif table == "Contact":
        rem = Contact.query.filter_by(userID=__getField(data,"userID"),contactID=__getField(data,"contactID")).first()
    elif table == "PoolSubscriber":
        rem = PoolSubscriber.query.filter_by(userID=__getField(data,"userID"),contactID=__getField(data,"poolID")).first()
    else:
        return "invalid table","400"

    if not rem:
        return "invalid id (record does not exist)","400"

    db.session.delete(rem)
    return Response(status=200)
    
def tableOperate(op, data):
    response = "invalid table","400"
    
    if "table" in data:
        table = __getField(data, "table")
        if op == "insert":
            response = __tableInsert(table, data)
        elif op == "update":
            response = __tableUpdate(table, data)
        elif op == "select":
            response = __tableSelect(table, data)
        elif op == "delete":
            response = __tableDelete(table, data)

    try:
        db.session.commit()                         # Commit changes to DB
    except (exc.IntegrityError, exc.PendingRollbackError) as ex:
        db.session.rollback()
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
        op = __getField(data, "operation")
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
    parser.add_argument("-t", "--test", action='store_true')
    args = parser.parse_args()
    debug = args.debug
    broadcast = args.broadcast
    runtests = args.test

    host = "0.0.0.0" if broadcast else "127.0.0.1"

    if debug:
        print(" * Opening debug link at /api/debug")

    if runtests:
        print(" * Adding test script: tests.py")
        tests.runAll()

    app.run(debug=debug, host=host, port=3333)
