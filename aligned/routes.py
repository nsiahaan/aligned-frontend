"""
Aligned 

aligned.routes
This module implements the routes for Aligned
"""
from flask import render_template, url_for, redirect, request, jsonify, send_from_directory

from aligned import app, firebaseDB
from aligned.api import *
from aligned.signUp import signUp

@app.route('/')
def base():
    return send_from_directory('client/public', 'index.html')


@app.route("/home", methods=['GET','POST'])
def home():
    # if request.method == 'POST':
    #     if request.form['submit_button'] == 'DoSomething':
    #         uid = firebaseDB.getUIDFromEmail('lol@lol.com')
    #         #firebaseDB.buyPack(uid)

    #     elif request.form['submit_button'] == 'Do Something Else':
    #         pass 
    return render_template('home.html', title='Home')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = signUp()
    if request.method == "POST":
        if form.submit_form.data:
            return redirect(url_for('home'))
        return render_template('signup.html', title='Sign Up', form=form)
    return render_template('signup.html', title='Sign Up', form=form)

@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        firebaseDB.addUser(request.json)
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
            user = firebaseDB.getUser(todo_id, parameter)
            if parameter:
                return jsonify(user), 200
            return jsonify(user.to_dict()), 200
        else:
            user = firebaseDB.getUser()
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
        firebaseDB.updateUser(id, request.json)
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
        firebaseDB.deleteUser(todo_id)
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

