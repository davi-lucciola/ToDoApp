from flask import Flask
from flask_cors import CORS
from app import create_app


app: Flask = create_app()

PRODUCTION_URL = 'https://to-do-app-hwx0.onrender.com/'
cors = CORS(app, origins=[PRODUCTION_URL])

if __name__ == '__main__':
    app.run(debug=True)
