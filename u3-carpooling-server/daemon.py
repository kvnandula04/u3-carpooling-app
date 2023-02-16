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

# Default POST template for now
@app.route('/api', methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True)
