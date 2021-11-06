import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("~/CSCode/aligned/key.json")
firebase_admin.initialize_app(cred)
default_app = initialize_app(cred)
db = firestore.client()
users_ref = db.collection('users')

