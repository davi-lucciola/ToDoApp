from sqlalchemy.engine import Engine, create_engine
from sqlalchemy import MetaData
from databases import Database


DATABASE_URL = 'sqlite:///./tarefas.db'


engine = create_engine(DATABASE_URL)
database = Database(DATABASE_URL)
metadata = MetaData()


def criar_tabelas() -> None:
    global metadata
    metadata.create_all(bind=engine)