"""
Aligned 

aligned.routes
This module implements the routes for Aligned
"""
from flask import render_template, url_for, redirect, request, jsonify
from aligned import app


@app.route('/')
def base():
    return send_from_directory('client/public', 'index.html')
@app.route("/home")
def home():
    #Home Page
    return render_template('home.html', title="Home")
