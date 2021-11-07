#!/bin/bash
source venv/bin/activate
pip3 install -r requirements.txt
cd ./client
npm install
cd ..
