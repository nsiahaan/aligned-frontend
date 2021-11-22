"""
This module provides functions for managing the user database.
"""

from flask import request, jsonify
from aligned import app
import uuid

import firebase_admin, firebase
from flask import jsonify
from firebase_admin import credentials, firestore, storage
import json


cred = credentials.Certificate("./key.json")
default_app = firebase_admin.initialize_app(cred)

db = firestore.client()
users_ref = db.collection('users')

def addUser(json):
    """
    Add a user to the database given their information in JSON format.
    
    Input: json: dictionary
    Output: none
    """
    id = str(uuid.uuid4())
    data = {
        "name":json['name'],
        "uid" : id,
        "age":json['age'],
        "dob":json['dob'],
        "astro":json['astro'],
        "gender":json['gender'],
        "mbti":json['mbti'],
        "sPref":json['sPref'],
        "phoneNum":json['phoneNum'],
        "email":json['email'],
        "credits":json['credits'],
        "numViews":json['numViews'],
        "numLikes":json['numLikes'],
        "secretCrush":json['secretCrush'],
        "numPacks":json['numPacks'],
        "myLikes":json['myLikes'],
        "matchList":json['matchList'],
    }
    users_ref.document(id).set(data, merge=True )

def getUsers(uids=[]):
    docs = [users_ref.document(uid) for uid in uids]
    # print(docs)
    foos = db.get_all(docs)
    # [print(foo.to_dict()) for foo in foos]
    return [foo.to_dict() for foo in foos]

def getUser(uid=None, parameter=None):
    """
    Get user(s) from the database. 
    If UID is not given, return all users.
    If UID is given without parameter, return all information about that user.
    If UID is given with parameter, return the user's value for the parameter field.

    Input: uid: string, parameter: string
    Output: list of dictionaries, one dictionary, or int/string/list
    """
    if uid is None:
        return [doc.to_dict() for doc in users_ref.stream()]
    else:
        json = users_ref.document(uid).get()
        if parameter:
            return json.get(parameter)
        else:
            return json.to_dict()

def getUIDFromEmail(email):
    """
    Given a user's email, return their UID.

    Input: email: string
    Output: string
    """
    uid = users_ref.where("email", "==", email).get()
    if len(uid) != 1:
        return None
    return uid[0].get('uid')

def updateUser(uid, json):
    """
    Update a user's information in the database. 

    Input: uid: string, json: dictionary
    Output: none
    """
    users_ref.document(uid).update(json)

def deleteUser(uid):
    """
    Delete a user from the database.

    Input: uid: string
    Output: none
    """
    users_ref.document(uid).delete()
