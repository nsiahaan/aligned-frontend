import firebase_admin
from firebase_admin import credentials, firestore, storage
import userDB


import random
import names
import datetime
import uuid
import string
import requests
import time


db = firestore.client()
users_ref = db.collection('users')
astroList = ['aries', 'leo', 'sagittarius', 'taurus', 'virgo', 'capricorn', 'gemini', 'libra', 'aquarius', 'cancer', 'scorpio', 'pisces']
mbtiList = ['INFP', 'ENFP', 'INFJ', 'ENFJ', 'INTJ', "ENTJ", "INTP", "ENTP", "ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"]
sPrefList = [['male'],['female'],['non-binary'], ['male', 'female'], ["male", 'non-binary'], ['female', 'non-binary'], ['male', 'female', 'non-binary']]
genderList = ['male', 'female', 'non-binary']

def randomNumber():
    ph_no = ""
    for i in range(3):
        ph_no += str(random.randint(0, 9))
    ph_no += "-"
    for i in range(3):
        ph_no += str(random.randint(0, 9))
    ph_no += "-"
    for i in range(4):
        ph_no += str(random.randint(0, 9))
    return ph_no

def randomChar(char_num):
       return ''.join(random.choice(string.ascii_letters) for _ in range(char_num))

def randomDate():
    start_date = datetime.date(1990, 1, 1)
    end_date = datetime.date(2003, 11, 28)
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return str(random_date)

def addProfilePic(gender, email):
    uid = firebaseDB.getUIDFromEmail(email)
    r = requests.get('https://randomuser.me/api/?gender='+gender)
    pic = r.json()['results'][0]['picture']['medium']
    response = requests.get(pic)
    requests.post(url="http://localhost:5005/addPic", data={'uid':uid}, files={'file': response.content})

def addProfilePics():
    r = requests.get('http://localhost:5005/list') #get all users
    users = r.json()
    for user in users:
        gender = user['gender']
        # random assign if gender is non-binary
        if gender == 'non-binary':
            gender = ['male','female'][int(random.random() < .5)]
        uid = user['uid']
        
        # get random profile pic with corresponding gender
        resp = requests.get('https://randomuser.me/api/?gender='+gender)
        pic = resp.json()['results'][0]['picture']['medium']
        response = requests.get(pic)

        # call addPic API to add picture to firebase
        requests.post(url="http://localhost:5005/addPic", data={'uid':uid}, files={'file': response.content})

def generateBio():
    whoIAm = [
    'reader', 'writer', 'smoker', 'swimmer', 'listener', 
    'creator', 'explorer', 'runner', 'thinker', 'communicator', 'entrepeneur'
    ]
    descriptor = [
    'avid', 'extreme', 'incurable', 'evil', 'hardcore', 'infuriating', 
    'humble', 'lifelong', 'friendly', 'general', 'total', 'devoted', 
    'typical', 'award-winning', 'certified', 'freelance'
    ]
    reallyCoolThing = [
    'beer', 'coffee', 'bacon', 'web', 'zombie', 'ninja', 'pirate', 'anime', 
    'music', 'TV', 'internet', 'pop culture', 'alcohol', 'food', 'travel'
    ]
    secondaryDescriptor = [
    'nerd', 'junkie', 'maven', 'dork', 'geek', 'enthusiast', 'lover', 
    'fanatic', 'expert', 'guru', 'wizard', 'scholar', 'evangelist', 
    'buff', 'fan'
    ]

    my_descriptor = random.choice(descriptor)
    my_whoIAm = random.choice(whoIAm)
    my_reallyCoolThing = random.choice(reallyCoolThing)
    my_secondaryDescriptor = random.choice(secondaryDescriptor)

    return ' '.join([my_descriptor.capitalize(), my_whoIAm, '.',
        my_reallyCoolThing.capitalize(), my_secondaryDescriptor])

def generateBios4All():
    r = requests.get('http://localhost:5005/list') #get all users
    users = r.json()
    for user in users:
        uid = user['uid']
        users_ref.document(uid).update({'bio': generateBio()})

def createNUsers(n):
    for i in range(n):
        randomdate = randomDate()
        mbti = random.choice(mbtiList)
        sPref = random.choice(sPrefList)
        gender = random.choice(genderList)
        if gender == "non-binary":
            name = names.get_full_name()
        else:
            name = (names.get_full_name( gender=gender ))
        phoneNum = randomNumber()
        email = randomChar(7)+"@gmail.com"
        password = randomChar(7)
        addedUser = userDB.signupUser(email, password)
        if addedUser["status"] == "success":
            uid = addedUser["localId"]
            addData = {
                "name":name,
                "dob":randomdate,
                "gender":gender,
                "mbti":mbti,
                "sPref":sPref,
                "email":email,
                "instagram":randomChar(10),
                "snapchat":randomChar(10),
                "phoneNum":phoneNum,
                "bio":generateBio()
            }
            userDB.addUser(addData, uid)
        ###
        # time.sleep(.3)
        # addProfilePic(gender, email)

if __name__=="__main__":
    #createNUsers(22)
    ##### ONLY UNCOMMENT THIS IF THERE ARE MORE USERS THAN PICS/BIOS #####
    addProfilePics()
