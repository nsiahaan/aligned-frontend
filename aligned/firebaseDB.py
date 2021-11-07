from flask import request, jsonify
from aligned import app
import uuid

import firebase_admin, firebase
from flask import jsonify
from firebase_admin import credentials, firestore, storage
import json

class User:
    
    def __init__(self, uid):
        self.uid = uid
        js = getUser(uid)
        self.name = js["name"]
        self.age = js["age"]
        self.gender = js["gender"]
        self.dob = js["dob"]
        self.astro = js["astro"]
        self.mbti = js["mbti"]
        self.sPref = js["sPref"]
        self.phoneNum = js["phoneNum"]
        self.email = js["email"]
        self.credits = js["credits"]
        self.numViews = js["numViews"]
        self.numLikes = js["numLikes"]
        self.secretCrush = js["secretCrush"]
        self.numPacks = js["numPacks"]
        self.likes = js["myLikes"]
        self.matchList = js["matchList"]
    
    def getJson(self):
        return getUser(self.uid)

cred = credentials.Certificate("/Users/nkumar/CSCode/aligned/key.json")
default_app = firebase_admin.initialize_app(cred)

db = firestore.client()
users_ref = db.collection('users')

def addUser(json):
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
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


def getUser(uid=None, parameter=None):
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
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
    uid =  users_ref.where("email", "==", email).get()
    if len(uid) != 1:
        return None
    return uid[0].get('uid')

def updateUser(uid, json):
    users_ref.document(uid).update(json)

def deleteUser(uid):
    users_ref.document(uid).delete()
    
def buyPack(uid):
    currentPack = int(getUser(uid, parameter='numPacks'))
    currentPack += 1
    credits = int(getUser(uid, parameter='credits'))
    credits -= 50
    buyPack={
        'numPacks':currentPack,
        'credits':credits,
    }
    updateUser(uid, buyPack)





