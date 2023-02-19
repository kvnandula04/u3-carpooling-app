from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from hashlib import sha256
from datetime import datetime
import json

app = Flask(__name__)

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# DB mirrors columns in the file rather than defining in the table models
db.Model.metadata.reflect(db.engine)

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

class Preferences(db.Model):
    __tablename__ = 'Preferences'
    __table_args__ = {'extend_existing': True}
    preferencesID = db.Column(db.Integer, primary_key=True)

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

# Default POST template for now
@app.route('/api', methods=['POST'])
def api():
    return null

if __name__ == '__main__':
    app.run(debug=True)
