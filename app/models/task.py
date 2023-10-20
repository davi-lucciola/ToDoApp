from config import BaseModel
from exceptions import ValidationException
from datetime import datetime as dt
from sqlalchemy import Column, Integer, String, Boolean, DateTime


class Task(BaseModel):
    __tablename__ = 'tasks'

    id: int = Column(Integer, primary_key=True, nullable=False)
    title: str = Column(String, nullable=False)
    completed: str = Column(Boolean, nullable=False, default=False)
    date_created: dt = Column(DateTime, nullable=False, default=dt.now())
    date_completed: dt = Column(DateTime, nullable=True)

    def validate(self) -> None:
        if self.title is None:
            raise ValidationException('O campo titulo não pode ser nulo.')
        
        if self.completed is None:
            raise ValidationException('O campo completo não pode ser nulo.')
        
        if self.date_created > self.date_completed:
            raise ValidationException('A data de criação não pode ser maior que a data de finalização.')