"""
Aligned

aligned.__init__
Initialization of Flask framework
"""
from flask import Flask


app = Flask(__name__)

from aligned import routes

