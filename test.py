"""
THIS ENTIRE FILE IS INVALID NOW. need to update/fix
Testing script for unit tests
"""

import unittest
import pyaztro
from aligned import user,userDB
from aligned.user import User

user = User("heqmT1mWyWYNe7pI8sRYfdXFZSh1")

class TestHoroscope(unittest.TestCase):
    def setUp(self):
        self.user = User("heqmT1mWyWYNe7pI8sRYfdXFZSh1")
        self.user1 = User("3be0f9fe-e5e2-4b45-b6de-0c46a6a3a662")
        self.user2 = User("3c634bf8-dfaf-4a6e-b9e6-32709c67e408")

    def testLuckyNumber(self):
        result = self.user.getHoroscope()
        self.assertEqual(result.lucky_number, pyaztro.Aztro(self.user.astro).lucky_number)

    def testLuckyColor(self):
        result = self.user.getHoroscope()
        self.assertEqual(result.color, pyaztro.Aztro(self.user.astro).color)

class TestCompScore(unittest.TestCase):
    def setUp(self):
        self.user1 = User("3be0f9fe-e5e2-4b45-b6de-0c46a6a3a662")
        self.user2 = User("3c634bf8-dfaf-4a6e-b9e6-32709c67e408")
        self.user3 = User("heqmT1mWyWYNe7pI8sRYfdXFZSh1")
    def testCompatibilityScore(self):
        self.assertEqual(self.user1.compatibilityScore(self.user2), 0.225)
        self.assertEqual(self.user3.compatibilityScore(self.user2), 0.5)
        self.assertEqual(self.user1.compatibilityScore(self.user2), 0.5)

class TestWriteDatabase(unittest.TestCase):
    def setUp(self):
        self.user1 = User("408ef6a8-1244-43df-9909-336b924e102e")
    
    def testBuyPack(self):
        currentPacks = user1.numPacks
        currentCredits = user1.credits
        user1.buyPack()
        self.assertEqual(currentPacks + 1, userDB.getUser(user1UID, parameter='numPacks'))
        self.assertEqual(currentCredits - 50, userDB.getUser(user1UID, parameter='credits'))

    def testUpdateUser(self):
        update = {
            'age' : 150
        }
        userDB.updateUser(self.user1.uid, update)
        self.assertEqual(update['age'], userDB.getUser(self.user1.uid, parameter='age'))

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

'''
Add test for generate pack, open pack, send like, 
'''
if __name__=="__main__":
    unittest.main()