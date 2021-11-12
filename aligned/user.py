"""
This module contains the User class, which represents a user of Aligned.
"""

import pyaztro
from aligned import userDB

# constants to be used in User.compatibilityScore()
MBTI_WEIGHT = 0.4
STATIC_ASTRO_WEIGHT = 0.3
DAILY_ASTRO_WEIGHT = 0.3

# constant to be used in User.generatePack()
COMPATIBILITY_THRESHOLD = 0.8

# assign each personality type an index number, which is used in mbtiCompatibilityChart
mbtiIndex = \
    {'INFP':0, 'ENFP':1, 'INFJ':2, 'ENFJ':3 \
    ,'INTJ':4, 'ENTJ':5, 'INTP':6, 'ENTP':7 \
    ,'ISFP':8, 'ESFP':9, 'ISTP':10, 'ESTP':11 \
    ,'ISFJ':12, 'ESFJ':13, 'ISTJ':14, 'ESTJ':15}

mbtiCompatibilityChart = \
    [[9,9,9,16,9,16,9,9,0,0,0,0,0,0,0,0] \
    ,[9,9,16,9,16,9,9,9,0,0,0,0,0,0,0,0] \
    ,[9,16,9,9,9,9,9,16,0,0,0,0,0,0,0,0] \
    ,[16,9,9,9,9,9,9,9,16,0,0,0,0,0,0,0] \
    ,[9,16,9,9,9,9,9,16,4,4,4,4,1,1,1,1] \
    ,[16,9,9,9,9,9,16,9,4,4,4,4,4,4,4,4] \
    ,[9,9,9,9,9,16,9,9,4,4,4,4,1,1,1,16] \
    ,[9,9,16,9,16,9,9,9,2,2,2,2,1,1,1,1] \
    ,[0,0,0,16,4,4,4,4,1,1,1,1,4,16,4,16] \
    ,[0,0,0,0,4,4,4,4,1,1,1,1,16,4,16,4] \
    ,[0,0,0,0,4,4,4,4,1,1,1,1,4,16,4,16] \
    ,[0,0,0,0,4,4,4,4,1,1,1,1,16,4,16,4] \
    ,[0,0,0,0,1,4,1,1,4,16,4,16,9,9,9,9] \
    ,[0,0,0,0,1,4,1,1,16,4,16,4,9,9,9,9] \
    ,[0,0,0,0,1,4,1,1,4,16,4,16,9,9,9,9] \
    ,[0,0,0,0,1,4,16,1,16,4,16,4,9,9,9,9]]


# assign each astrological sign an index number, which is used in astroCompatibilityChart
astroIndex = \
    {'aries':0, 'leo':1, 'sagittarius':2, 'taurus':3 \
    ,'virgo':4, 'capricorn':5, 'gemini':6, 'libra':7 \
    ,'aquarius':8, 'cancer':9, 'scorpio':10, 'pisces':11}

astroCompatibilityChart = \
    [[2,2,2,0,1,0,2,2,2,0,0,1] \
    ,[2,2,2,1,0,0,2,2,1,1,1,1] \
    ,[2,2,2,0,0,0,2,2,2,1,1,1] \
    ,[0,1,0,2,2,2,0,1,0,2,2,2] \
    ,[0,1,0,2,2,2,0,0,2,2,2,1] \
    ,[0,1,0,2,2,2,0,1,0,2,2,2] \
    ,[2,2,1,0,1,1,2,2,2,0,0,0] \
    ,[1,2,2,1,0,0,2,2,2,0,0,1] \
    ,[2,2,2,0,0,0,2,2,2,0,1,1] \
    ,[0,1,1,2,2,2,0,0,0,2,2,2] \
    ,[1,1,0,2,2,2,0,0,0,2,2,2] \
    ,[1,1,1,2,1,2,0,0,0,2,2,2]]


class User:
    
    def __init__(self, uid):
        """
        Constructs a user given the user's uid in the user database.
        The user must already exist in the user database.

        Input: uid: string
        Output: User
        """
        self.uid = uid
        js = userDB.getUser(uid)
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
    
    def getJSON(self):
        """
        Get the user's information in a JSON (Python dictionary) format.

        Input: none
        Output: dictionary
        """
        return userDB.getUser(self.uid)

    def getHoroscope(self):
        """
        Get the user's horoscope of the day based on their star sign.

        Input: none
        Output: dictionary

        Example usage: 
        horoscope = getHoroscope('aries')
        >> object
        horoscope.mood
        >> 'Relaxed'
        horoscope.lucky_time
        >> '2pm'
        horoscope.description
        >> 'If you don't have big plans, you can rest assured that you will soon. A surprise missive is waiting. Enjoy. It's spontaneity, not variety, that's the spice of life.'
        horoscope.color
        >> 'Spring Green'
        horoscope.compatibility
        >> 'Aquarius'
        horoscope.lucky_number
        >> 85
        """
        return pyaztro.Aztro(sign=self.astro)

    def compatibilityScore(self,user2):
        """
        Calculate the compatibility score (between 0 and 1) of this user and user2.
        The total compatibility score is the weighted average of 3 individual scores:
        static score from MBTI compatibility chart, 
        static score from astrology compatibility chart, and
        dynamic score from PyAztro's daily astrology compatibility sign.

        Input: user2: User
        Output: float
        """

        mbtiScore = mbtiCompatibilityChart[mbtiIndex[self.mbti]][mbtiIndex[user2.mbti]]
        staticAstroScore = astroCompatibilityChart[astroIndex[self.astro]][astroIndex[user2.astro]]

        if self.getHoroscope().compatibility.lower() == user2.astro or \
        user2.getHoroscope().compatibility.lower() == self.astro:
            dailyAstroScore = 1
        else:
            dailyAstroScore = 0
        
        totalScore = \
            MBTI_WEIGHT*(mbtiScore/16) + \
            STATIC_ASTRO_WEIGHT*(staticAstroScore/2) + \
            DAILY_ASTRO_WEIGHT*(dailyAstroScore)

        return totalScore

    def generatePack(self):
        """
        UNFINISHED - change database sPref to list and add shuffling 
        Generate the pack of 7 profiles for the user.
        (If there are not enough users in the database it may be less than 7.)
        
        Input: none
        Output: set
        """

        pack = set()

        docs = userDB.users_ref\
            .where('gender', 'in', self.sPref)\
            .where('sPref', 'array_contains', self.gender)\
            .stream() #.get()?

        ### shuffle docs

        for doc in docs:
            user2uid = doc.to_dict()["uid"]

            # The user should not be in their own pack
            if (self.uid == user2uid):
                continue

            user2 = User(user2uid)
            
            # The pack should contain 3 users with any compatibility
            # and 4 with high compatibility
            if (len(pack) < 3):
                pack.add(user2)
            elif (self.compatibilityScore(user2) > COMPATIBILITY_THRESHOLD):
                pack.add(user2)
                if (len(pack) >= 7):
                    break

        return pack

    def buyPack(self):
        """
        UNFINISHED - need to also update class attributes, not just the database
        Update the user's number of packs and number of credits to reflect purchasing a pack.

        Input: none
        Output: none
        """

        currentPack = int(userDB.getUser(self.uid, parameter='numPacks'))
        currentPack += 1
        credits = int(userDB.getUser(self.uid, parameter='credits'))
        credits -= 50
        buyPack= {
            'numPacks':currentPack,
            'credits':credits,
        }
        userDB.updateUser(self.uid, buyPack)

      