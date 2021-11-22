"""
Aligned 
aligned.routes
This module implements the routes for Aligned
"""
from flask import render_template, url_for, redirect, request, jsonify, send_from_directory
import random
from werkzeug.security import generate_password_hash, check_password_hash

from aligned import app, user, userDB

from aligned.signUp import signUp


@app.route('/')
def base():
    return send_from_directory('client/public', 'index.html')


@app.route("/<path:path>")
def home(path):
    return send_from_directory('client/public', path)

@app.route("/rand")
def hello():
    return str(random.randint(0, 100))

@app.route('/login', methods=['POST'])
def login():
    try:
        json = request.json
        email = json["email"]
        password = json["password"] 
        return userDB.loginUser(email, password)
    except Exception as e:
        print(e)

@app.route('/signup', methods=['POST'])
def signup():
    try:
        json = request.json
        email = json["email"]
        password = json["password"] 
        addedUser = userDB.signupUser(email, password)
        print(addedUser)
        if addedUser["status"] == "success":
            id = addedUser["localId"]
            data = {
                "name":json['name'],
                "age":json['age'],
                "dob":json['dob'],
                "astro":json['astro'],
                "gender":json['gender'],
                "mbti":json['mbti'],
                "sPref":json['sPref'],
                "phoneNum":json['phoneNum'],
                "email":json['email'],
                "credits":json['credits'],
                "crushes":json['crushes'],
                "numPacks":json['numPacks'],
                "likes":json['likes'],
                "matches":json['matches'],
                "bio":json['bio']
            }
            userDB.addUser(data, id)
        return addedUser
    except Exception as e:
        print(e)

@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        userDB.addUser(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/list', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON
        todo : Return document that matches query ID
        all_todos : Return all documents
    """
    try:
        # Check if ID was passed to URL query
        todo_id = request.args.get('uid') 
        parameter = request.args.get('param') 
        if todo_id:
            user = userDB.getUser(todo_id, parameter)
            if parameter:
                return jsonify(user), 200
            return jsonify(user.to_dict()), 200
        else:
            user = userDB.getUser()
            return jsonify(user), 200
    except Exception as e:
        return f"An Error Occured: {e}"


@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['uid']
        userDB.updateUser(id, request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/delete', methods=['GET', 'DELETE'])
def delete(request):
    """
        delete() : Delete a document from Firestore collection
    """
    try:
        # Check for ID in URL query
        todo_id = request.args.get('id')
        userDB.deleteUser(todo_id)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"
    


import pyrebase
config = {
    "apiKey":"AIzaSyBtzSPw1owheKdEdo853-3AuyGPLfBxPhM",
    "authDomain":"aligned-5a855.firebaseapp.com",
    "databaseURL": "https://users.firebaseio.com",
    "storageBucket": "aligned-5a855.appspot.com"
}
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
####### WHEN WE ADD AUTHENTICATION
# auth = firebase.auth()
# # user = auth.sign_in_with_email_and_password(email, password)
# # storage.child(uid).get_url(user['idToken'])

@app.route('/addPic', methods=['POST','PUT'])
def addPic():
    """
    Input: form-data, data={'uid':uid}
                      files={'file':myfile}
    Adds myfile to Firebase Storage and renamed using uid
    """
    try:
        
        picture = request.files['file']

        name = request.form['uid']

        storage.child(name).put(picture)
        
        return jsonify({"success": True}), 200

    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/getPic', methods=['GET'])
def getPic():
    """
    Route must take input 'uid' query parameter
    Returns URL ref of the user's profile pic
    """
    print("hello")
    try:
        uid = request.args.get('uid')
        print(uid)
        return storage.child(uid).get_url()
    except Exception as e:
        return f"An Error Occured: {e}"

