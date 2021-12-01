# aligned

UCLA CS130 F21 Project

(This is a secondary repository that we made to update the look of our app. The original repository that was turned in is at https://github.com/sallyseok/aligned)
 
Tony Li

Nikhil Kumar

Nicholas Mark

Kevin Case

Sally (Simwon) Seok

Nikita Siahaan

Directory Structure:

aligned folder contains the backend (Flask).

client folder contains the frontend (Svelte).

test folder contains code for creating sample users and the /test.py file contains unit tests.

To run the application, follow these instructions:

Create the virtual environment

python3 -m venv venv

Activate the virtual environment

source venv/bin/activate

Install the necessary packages

pip3 install -r requirements.txt

Go to the client directory (with svelte stuff)

cd client

Install the node packages

npm install

Go back to the Aligned Directory

cd ..

Run this script to start the Flask server and Svelte client

./deploy.sh

NOTE:

Before using npm install, please note that you should update npm to the most recent version.

We are using svelte-kit and it needs to have latest version of npm to install the necessary packages.

If you are using Windows (WSL2), you can update by following the instructions at this link:

https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl

If you are using MacOS/Linux, you can update by downloading the most recent node version.

https://nodejs.org/en/download/

The version of node we have been using is: v17.1.0.
