"""
Aligned 
aligned.routes
This module implements the routes for Aligned
"""
from flask import request, jsonify, send_from_directory
import random, json

from aligned import app, userDB
from aligned.user import User


@app.route('/')
def base():
    return send_from_directory('client/public', 'index.html')


@app.route("/<path:path>")
def home(path):
    return send_from_directory('client/public', path)

@app.route("/rand")
def rand():
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
        json1 = request.data
        print(type(request))
        json1 = json1.decode('utf-8')
        print(json1)
        print(type(json1))
        json1 = json.loads(json1)
        print(type(json1))
        email = json1["email"]
        print(email)
        print("Got here")
        password = json1["password"]
        addedUser = userDB.signupUser(email, password)
        print(addedUser)

        if addedUser["status"] == "success":
            id = addedUser["localId"]
            data = {
                "name":json1['name'],
                "dob":json1['dob'],
                "gender":json1['gender'],
                "mbti":json1['mbti'],
                "sPref":json1['sexPref'],
                "email":json1['email'],
                "bio":json1['bio']
            }
            userDB.addUser(data, id)
        return jsonify(addedUser), 200
    except Exception as e:
        print(e)
        return "404"


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

@app.route('/getuid', methods=['GET'])
def getuid():
    try:
        email = request.args.get('email')
        uid = userDB.getUIDFromEmail(email)
        return jsonify(uid), 200
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
        todo_id = request.args.getlist('uid') 
        parameter = request.args.get('param') 
        if todo_id and len(todo_id) == 1:
            user = userDB.getUser(todo_id[0], parameter)
            if parameter:
                return jsonify(user), 200
            return jsonify(user), 200
        
        elif todo_id:
            users = userDB.getUsers(todo_id)
            print(users[0])
            return {user['uid']: user for user in users}
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



'''Actions for a specific user'''

@app.route('/horoscope', methods=['GET'])
def horoscope():
    try:
        uid = request.args.get('uid')
        user = User(uid)
        return jsonify(user.getHoroscope()), 200
    except Exception as e:
        return f"An Error Occurred: {e}", 400

@app.route('/openPack', methods=['POST'])
def openPack():
    try:
        uid = request.json['uid']
        user = User(uid)
        return jsonify(user.openPack()), 200
    except Exception as e:
        return f"An Error Occurred: {e}", 400

@app.route('/buyPack', methods=['POST'])
def buyPack():
    try:
        uid = request.json['uid']
        user = User(uid)
        user.buyPack()
        return "", 200
    except Exception as e:
        return f"An Error Occurred: {e}", 400

@app.route('/sendLike', methods=['POST'])
def sendLike():
    try:
        uid1 = request.json['uid1']
        uid2 = request.json['uid2']
        user1 = User(uid1)
        user2 = User(uid2)
        return jsonify(user1.sendLike(user2)), 200
    except Exception as e:
        return f"An Error Occurred: {e}", 400




import pyrebase

firebase = pyrebase.initialize_app(userDB.firebaseConfig)
storage = firebase.storage()

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
    try:
        uids = request.args.getlist('uid')
        return {uid: storage.child(uid).get_url() for uid in uids}
    except Exception as e:
        return f"An Error Occured: {e}"

