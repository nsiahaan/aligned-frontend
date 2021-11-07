from flask import request, jsonify
from aligned import app
import uuid

import firebase_admin, firebase
from flask import jsonify
from firebase_admin import credentials, firestore, storage
import json

class User:
    
    def __init__(self, uid, json):
        self.uid = uid
        js = getUser(uid)
        self.name = js["name"]
        self.age = js["age"]
        self.dob = js["dob"]
        self.sPref = js["sPref"]
        self.phoneNum = js["phoneNum"]
        self.email = js["email"]
        self.credits = js["credits"]
        self.numViews = js["numViews"]
        self.numLikes = js["numLikes"]
        self.secretCrush = js["secretCrush"]
        self.packs = js["packs"]
        self.likes = js["likes"]
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
        "sPref":json['sPref'],
        "phoneNum":json['phoneNum'],
        "email":json['email'],
        "credits":json['credits'],
        "numViews":json['numViews'],
        "numLikes":json['numLikes'],
        "secretCrush":json['secretCrush'],
        "myPacks":json['myPacks'],
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
            return json

def updateUser(uid, json):
    users_ref.document(uid).update(json)

def deleteUser(uid):
    users_ref.document(uid).delete()
    


'''
===== PACKS FUNCTIONS ===== 

createPack(uid)
    gets a list/chunk of users, and calls compatibility_scores function
        returns a list of compatibility scores
    
buyPack(uid)
    add 1 to uid's pack counter
    subtract credits from uid's credit

===== MATCH FUNCTIONS ===== 

createMatch(uuid1, uuid2)
    removes respective uid's from users' secret crush list
    removes respective uid's from users' myLike list
    adds respective uid's to users' matchlist
    

    

===== USER FUNCTIONS ===== 

addUser(uid, json):
    unique id: uuid number
    name,  string
    age,  number
    DOB, string
    sexualPref: string
    phonenumber:string
    email:string
    credits: number
    numViews: number
    numLikes: number
    secretCrushes: list of strings
    ?myPacks: number
    myLikes: list of strings
    matchList: list of strings
    


getUser(uid, parameter=None)
    returns user

updateUser(uid, parameter)

delUser(uid):
    delete user from database
'''




