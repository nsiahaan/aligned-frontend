"""
Aligned 
aligned.routes
This module implements the routes for Aligned
"""
from flask import request, jsonify, send_from_directory
import json
import pyrebase
from aligned import app, userDB
from aligned.user import User

firebase = pyrebase.initialize_app(userDB.firebaseConfig)
storage = firebase.storage()

@app.route('/')
def base():
    return send_from_directory('client/public', 'index.html')

@app.route("/<path:path>")
def home(path):
    return send_from_directory('client/public', path)

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.data
        data = data.decode('utf-8')
        data = json.loads(data)
        email = data["email"]
        password = data["password"] 
        return userDB.loginUser(email, password), 200
    except Exception as e:
        return f"An Error Occured: {e}", 400
    
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.data
        data = data.decode('utf-8')
        data = json.loads(data)
        email = data["email"]
        password = data["password"]
        addedUser = userDB.signupUser(email, password)
        print(addedUser)
        if addedUser["status"] == "success":
            uid = addedUser["localId"]
            addData = {
                "name":data['name'],
                "dob":data['dob'],
                "gender":data['gender'],
                "mbti":data['mbti'],
                "sPref":data['sexPref'],
                "email":data['email'],
                "bio":data['bio'],
                "instagram":data['instagram'],
                "snapchat":data["snapchat"],
                "phoneNum":data["phoneNum"]
            }
            userDB.addUser(addData, uid)
        return jsonify(addedUser), 200
    except Exception as e:
        return f"An Error Occured: {e}", 400

# Use /signup instead
@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        data = json.loads(request.data)
        userDB.addUser(data)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}", 400

@app.route('/getuid',methods=['GET'])
def getuid():
    """
        getuid(): Gets UID from Firestore user based on email
        Ex: GET http://localhost:<port>/getuid?email=<user email>
    """
    try:
        email = request.args.get('email')
        uid = userDB.getUIDFromEmail(email)
        return jsonify(uid), 200
    except Exception as e:
        return f"An Error Occured: {e}", 400

@app.route('/list', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON
        todo : Return document that matches query ID
        all_todos : Return all documents
        Ex: http://localhost:5005/list?uid=<uid>&param=<parameter>
    """
    try:
        # Check if ID was passed to URL query
        uid = request.args.getlist('uid') 
        param = request.args.get('param') 
        if uid and len(uid) == 1:
            user = userDB.getUser(uid[0], param)
            return jsonify(user), 200
        elif uid:
            users = userDB.getUsers(uid)
            return {user['uid']: user for user in users}, 200
        else:
            user = userDB.getUser()
            return jsonify(user), 200
    except Exception as e:
        return f"An Error Occured: {e}", 400

@app.route('/update', methods=['POST'])
def update():
    """
        update() : Update document in Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'uid': '1', 'title': 'Write a blog post today'}
    """
    try:
        data = json.loads(request.data)
        userDB.updateUser(data["uid"], data)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}", 400

@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection
    """
    try:
        # Check for ID in URL query
        uid = request.args.get('uid')
        userDB.deleteUser(uid)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}", 400

'''Actions for a specific user'''

@app.route('/horoscope', methods=['POST'])
def horoscope():
    try:
        uid = request.json['uid']
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

