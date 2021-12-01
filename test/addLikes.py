import json
import random
import requests
def addNumLikes():
    r = requests.get('http://localhost:5005/list') #get all users
    users = r.json()

    for user in users:
        uid = user['uid']
        if user['gender'] == 'female':
            numLikes = random.randint(100, 200)
        else:
            numLikes = random.randint(0, 100)
        data = {'uid':uid, 'numLikes': numLikes}
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        requests.post(url="http://localhost:5005/update", data=json.dumps(data), headers=headers)


if __name__=="__main__":
    addNumLikes()
