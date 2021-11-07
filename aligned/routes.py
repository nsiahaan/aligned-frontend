"""
Aligned 

aligned.routes
This module implements the routes for Aligned
"""
from flask import render_template, url_for, redirect, request, jsonify
from aligned import app


import firebase_admin, firebase
from flask import jsonify
from firebase_admin import credentials, firestore

cred = credentials.Certificate("/Users/nkumar/CSCode/aligned/key.json")
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()
users_ref = db.collection('users')

@app.route('/')
@app.route("/home")
def home():
    #Home Page
    return render_template('home.html', title="Home")

@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    try:
        id = request.json['id']
        users_ref.document(id).set(request.json)
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
        todo_id = request.args.get('id')    
        if todo_id:
            todo = firebase.users_ref.document(todo_id).get()
            return jsonify(todo.to_dict()), 200
        else:
            all_todos = [doc.to_dict() for doc in users_ref.stream()]
            return jsonify(all_todos), 200
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
        id = request.json['id']
        users_ref.document(id).update(request.json)
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
        users_ref.document(todo_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"
    




# @app.route('/addPic', methods=['POST','PUT'])
# def addPic():
#     # add profile pic linked to user
#     try:
#         todo_id = request.args.get('id')

#     except Exception as e:
#         return f"An Error Occured: {e}"