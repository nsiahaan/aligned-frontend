"""
Aligned

aligned.__init__
Initialization of Flask framework
"""
from flask import Flask


app = Flask(__name__)
app.config['SECRET_KEY'] = 'aligned'

from aligned import routes

