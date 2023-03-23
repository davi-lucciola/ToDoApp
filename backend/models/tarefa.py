from ormar import Model, Integer, String, Boolean
from config import database, metadata


class Tarefa(Model):
    class Meta:
        database = database
        metadata = metadata

    id: int = Integer(primary_key=True, autoincrement=True)
    titulo: str = String(max_length=255, nullable=False) 
    descricao: str = String(max_length=255, nullable=True)
    completa: bool = Boolean(default=False)