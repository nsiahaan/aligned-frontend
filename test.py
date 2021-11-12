import unittest
import pyaztro
from aligned import api,userDB
from aligned.routes import update
from aligned.user import User

class TestHoroscope(unittest.TestCase):
    def testLuckyNumber(self):
        sign = 'aries'
        result = api.getHoroscope(sign)
        self.assertEqual(result.lucky_number, pyaztro.Aztro(sign).lucky_number)

    def testLuckyColor(self):
        sign = 'capricorn'
        result = api.getHoroscope(sign)
        self.assertEqual(result.color, pyaztro.Aztro(sign).color)

class TestCompScore(unittest.TestCase):
    def testCompatibilityScore(self):
        user1UID = "41e3e4d7-41f3-452f-8e0d-657a196c2a45"
        user2UID = "65530a2c-1677-4115-a5ef-3646aa65eafd"
        user1 = User(user1UID)
        user2 = User(user2UID)
        self.assertEqual(api.compatibilityScore(user1, user2), 0.225)
    def testWrongSign(self):
        user1UID = "51150a87-8d4d-45fa-b206-025602b02c82"
        user2UID = "54a6a0b8-a4f1-41ae-9080-856bbc0e785f"
        user1 = User(user1UID)
        user2 = User(user2UID)
        with self.assertRaises(KeyError):
            api.compatibilityScore(user1, user2)

class TestWriteDatabase(unittest.TestCase):
    def testBuyPack(self):
        user1UID = "41e3e4d7-41f3-452f-8e0d-657a196c2a45"
        user1 = User(user1UID)
        currentPacks = user1.numPacks
        currentCredits = user1.credits
        user1.buyPack()
        self.assertEqual(currentPacks + 1, userDB.getUser(user1UID, parameter='numPacks'))
        self.assertEqual(currentCredits - 50, userDB.getUser(user1UID, parameter='credits'))

    def testUpdateUser(self):
        user1UID = "41e3e4d7-41f3-452f-8e0d-657a196c2a45"
        update = {
            'age' : 150
        }
        userDB.updateUser(user1UID, update)
        self.assertEqual(update['age'], userDB.getUser(user1UID, parameter='age'))

    def testAddUser(self):
        user = {
            "name":"John Smith",
            "age":15,
            "dob":"12-23-99",
            "astro":"capricorn",
            "gender":"male",
            "mbti":"INFJ",
            "sPref":"both",
            "phoneNum":"9258001123",
            "email":"test@test.com",
            "credits":500,
            "numViews":2,
            "numLikes":4,
            "secretCrush":[],
            "numPacks":2,
            "myLikes":[],
            "matchList":[],
        }
        userDB.addUser(user)
        uid = userDB.getUIDFromEmail("test@test.com")
        self.assertEqual(userDB.getUser(uid,"phoneNum"),"9258001123" )
    
    def testDeleteUser(self):
        uid = userDB.getUIDFromEmail("test@test.com")
        userDB.deleteUser(uid)
        self.assertEqual(userDB.getUser(uid,"phoneNum"), None)

class TestReadDatabase(unittest.TestCase):
    def testGetUIDFromEmail(self):
        user1UID = "41e3e4d7-41f3-452f-8e0d-657a196c2a45"
        user1Email = "cvBtubV@gmail.com"
        self.assertEqual(userDB.getUIDFromEmail(user1Email), user1UID)

    def testGetUser(self):
        user1UID = "41e3e4d7-41f3-452f-8e0d-657a196c2a45"
        self.assertEqual(userDB.getUser(user1UID, "email"),"cvBtubV@gmail.com" )

if __name__=="__main__":
    unittest.main()