"""
Aligned

aligned.__init__
Initialization of Flask framework
"""
from flask import Flask
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'aligned'

from aligned import routes

