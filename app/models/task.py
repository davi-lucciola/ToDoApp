from flask import jsonify
from config import BaseModel
from exceptions import ValidationException
from datetime import datetime as dt
from sqlalchemy import Column, Integer, String, Boolean, DateTime


class Task(BaseModel):
    __tablename__ = 'tasks'

    id: int = Column(Integer, primary_key=True, nullable=False)
    title: str = Column(String, nullable=False)
    description: str = Column(String, nullable=True)
    completed: bool = Column(Boolean, nullable=False, default=False)
    date_created: dt = Column(DateTime, nullable=False, default=dt.now())
    date_completed: dt = Column(DateTime, nullable=True)

    def validate(self) -> None:
        if self.title is None:
            raise ValidationException('O campo titulo não pode ser nulo.')
        
        if self.completed is None:
            raise ValidationException('O campo completo não pode ser nulo.')
    
    def to_json(self):
        
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'date_created': self.date_created.timestamp(),
            'date_completed': self.date_completed.timestamp() \
                if self.date_completed is not None else None
        }
    
    def update(self, task):
        self.title = task.title
        self.description = task.description
        self.completed = task.completed
        self.date_completed = dt.now()