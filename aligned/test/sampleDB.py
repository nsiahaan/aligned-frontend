import firebase_admin
from firebase_admin import credentials, firestore, storage

import random
import names
import datetime
import uuid
import string


cred = credentials.Certificate("/Users/nkumar/CSCode/aligned/key.json")
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()
users_ref = db.collection('users')
astroList = ['aries', 'leo', 'sagittrius', 'taurus', 'virgo', 'capricorn', 'gemini', 'libra', 'aquarius', 'cancer', 'scorpio', 'pisces']
mbtiList = ['INFP', 'ENFP', 'INFJ', 'ENFJ', 'INTJ', "ENTJ", "INTP", "ENTP", "ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"]
sPrefList = ['male', 'female', 'both']
genderList = ['male', 'female', 'non-binary']

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

def randomNumber():
    ph_no = ""
    for i in range(1, 10):
        ph_no += str(random.randint(0, 9))
    return ph_no

def randomChar(char_num):
       return ''.join(random.choice(string.ascii_letters) for _ in range(char_num))

def randomDate():
    start_date = datetime.date(2020, 1, 1)
    end_date = datetime.date(2020, 2, 1)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return str(random_date)

def createNUsers(n):
    for i in range(n):
        name = (names.get_full_name())
        age = random.randint(1, 100)
        randomdate = randomDate()
        astro = random.choice(astroList)
        mbti = random.choice(mbtiList)
        sPref = random.choice(sPrefList)
        gender = random.choice(genderList)
        phoneNum = randomNumber()
        email = randomChar(7)+"@gmail.com"
        credits = random.randint(500, 25000)
        numViews = random.randint(1, 100)
        numLikes = random.randint(1, 50)
        myLikes = []
        matchList = []
        secretCrush = []
        numPacks = random.randint(0, 10)

        data = {
            "name":name,
            "age":age,
            "dob":randomdate,
            "astro":astro,
            "gender":gender,
            "mbti":mbti,
            "sPref":sPref,
            "phoneNum":phoneNum,
            "email":email,
            "credits":credits,
            "numViews":numViews,
            "numLikes":numLikes,
            "secretCrush":secretCrush,
            "numPacks":numPacks,
            "myLikes":myLikes,
            "matchList":matchList,
        }
        addUser(data)

if __name__=="__main__":
    createNUsers(50)