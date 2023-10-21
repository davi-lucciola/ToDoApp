from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
BaseModel = db.Model


class Config:
    DUBUG = True
    CORS_HEADERS = 'Access-Control-Allow-Origin'
    JSON_SORT_KEYS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///tasks.db'