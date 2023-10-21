from flask import Flask
from flask_cors import CORS
from app import create_app


app: Flask = create_app()
cors = CORS(app)


if __name__ == '__main__':
    app.run(debug=True)
