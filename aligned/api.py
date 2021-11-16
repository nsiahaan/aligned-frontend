"""
Aligned

aligned.routes
Connect to Pyaztro API

**** all the code in this file has been moved to user.py,
will delete later when test.py is also updated ****
"""

import pyaztro


'''
Usage: 
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
'''
def getHoroscope(sign):
    return pyaztro.Aztro(sign=sign)


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

'''
Calculate the compatibility score (between 0 and 1) of user1 and user2 (both User objects)
The total compatibility score is the weighted average of 3 individual scores:
  static score from mbti compatibility chart, 
  static score from astrology compatibility chart, and
  dynamic score from PyAztro's daily astrology compatibility sign
'''
def compatibilityScore(user1,user2):
    MBTI_WEIGHT = 0.4
    STATIC_ASTRO_WEIGHT = 0.3
    DAILY_ASTRO_WEIGHT = 0.3

    mbtiScore = mbtiCompatibilityChart[mbtiIndex[user1.mbti]][mbtiIndex[user2.mbti]]
    staticAstroScore = astroCompatibilityChart[astroIndex[user1.astro]][astroIndex[user2.astro]]

    if getHoroscope(user1.astro).compatibility.lower() == user2.astro or \
       getHoroscope(user2.astro).compatibility.lower() == user1.astro:
        dailyAstroScore = 1
    else:
        dailyAstroScore = 0
    
    totalScore = MBTI_WEIGHT*(mbtiScore/16) + STATIC_ASTRO_WEIGHT*(staticAstroScore/2) + DAILY_ASTRO_WEIGHT*(dailyAstroScore)
    return totalScore


