from http import HTTPStatus
from config import db
from models import Task
from exceptions import DomainException
from flask import Blueprint, Response, request


task_router = Blueprint('Task', 'task_bp')


@task_router.route('/tarefa', methods=['GET'])
def index():
    tasks: list[Task] = db.session.query(Task).all()
    if len(tasks) == 0:
        raise DomainException('Não existem tasks cadastradas.', HTTPStatus.NO_CONTENT)

    return tasks

@task_router.route('/tarefa/<int:id>', methods=['GET'])
def show(id: id):
    task: Task = db.session.query(Task).filter(Task.id == id).first()
    if task is None:
        raise DomainException('Task não encontrada.', HTTPStatus.NOT_FOUND)

    return task

@task_router.route('/tarefa', methods=['POST'])
def save():
    data: dict = request.get_json()
    task: Task = task(**data)
    task.id = None
    task.validate()

    db.session.add(task)
    db.session.commit()

    return Response({'message': 'Tarefa criada com sucesso.'}, HTTPStatus.CREATED)

@task_router.route('/tarefa/<int:id>', methods=['PUT'])
def update(id: int):
    data: dict = request.get_json()
    task: Task = task(**data)
    task.validate()

    task_in_db: Task = db.session.query(Task).filter(Task.id == id).first()
    if task_in_db is None:
        raise DomainException('Task não encontrada.', HTTPStatus.NOT_FOUND)
    
    task.id = task_in_db.id
    db.session.flush(task)
    db.session.commit()

    return Response({'message': 'Tarefa alterada com sucesso.'}, HTTPStatus.CREATED)


@task_router.route('/tarefa/<int:id>', methods=['DELETE'])
def delete():
    task_in_db: Task = db.session.query(Task).filter(Task.id == id).first()
    if task_in_db is None:
        raise DomainException('Task não encontrada.', HTTPStatus.NOT_FOUND)
    
    db.session.delete(task_in_db)
    db.session.commit()

    return Response({'message': 'Tarefa alterada com sucesso.'}, HTTPStatus.ACCEPTED)
