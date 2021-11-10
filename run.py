"""
Aligned

To start aligned, run this file. 
"""
import os
from aligned import app

if __name__=='__main__':
    #os.system("cd client; npm run dev &")
    app.run(port=5005, debug=True)
    
