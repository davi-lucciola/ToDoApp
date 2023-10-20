from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
BaseModel = db.Model


class Config:
    DUBUG = True
    JSON_AS_ASCII = False
    JSON_SORT_KEYS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///tasks.db'