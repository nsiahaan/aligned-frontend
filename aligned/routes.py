"""
Aligned 

aligned.routes
This module implements the routes for Aligned
"""
from flask import render_template, url_for, redirect, request, jsonify
from aligned import app, firebaseDB



@app.route('/', methods=['GET','POST'])
@app.route("/home")
def home():
    if request.method == 'POST':
        if request.form['submit_button'] == 'DoSomething':
            uid = firebaseDB.getUIDFromEmail('lol@lol.com')
            firebaseDB.buyPack(uid)
        elif request.form['submit_button'] == 'Do Something Else':
            pass 
    return render_template('home.html')

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
    

import multipart as mp
from PIL import Image
# from multipart import tob
from io import BytesIO
import os

@app.route('/addPic', methods=['POST','PUT'])
def addPic():
    # add profile pic linked to user
    try:
        todo_id = request.args.get('id')
        print(request.get_json())
        picture = request.files['picture']
        temp = tempfile.NamedTemporaryFile(delete=False)
        picture.save(temp.name)

        firebaseDB.storage().put(temp.name)
        os.remove(temp.name)

        return jsonify({"success": True}), 200

    except Exception as e:
        return f"An Error Occured: {e}"