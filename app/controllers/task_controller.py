from http import HTTPStatus
from datetime import datetime as dt
from flask import Blueprint, jsonify, request
from ..config import db
from ..exceptions import DomainException
from ..models import Task


task_router = Blueprint('Task', 'task_bp')


@task_router.route('/tarefa', methods=['GET'])
def index():
    tasks: list[Task] = db.session.query(Task).all()
    if len(tasks) == 0:
        raise DomainException('Não existem tasks cadastradas.', HTTPStatus.NO_CONTENT)

    return jsonify([task.to_json() for task in tasks])

@task_router.route('/tarefa/<int:id>', methods=['GET'])
def show(id: id):
    task: Task = db.session.query(Task).filter(Task.id == id).first()
    if task is None:
        raise DomainException('Task não encontrada.', HTTPStatus.NOT_FOUND)

    return task.to_json()

@task_router.route('/tarefa', methods=['POST'])
def save():
    data: dict = request.get_json()
    task: Task = Task(**data)
    task.id = None
    task.validate()
    task.date_completed = dt.now() if task.completed is True else None
    
    db.session.add(task)
    db.session.commit()
    db.session.refresh(task)

    return (jsonify({'message': 'Tarefa criada com sucesso.', 'createdId': task.id}), HTTPStatus.CREATED)

@task_router.route('/tarefa/<int:id>', methods=['PUT'])
def update(id: int):
    data: dict = request.get_json()
    task: Task = Task(**data)
    task.validate()

    task_in_db: Task = db.session.query(Task).filter(Task.id == id).first()
    if task_in_db is None:
        raise DomainException('Task não encontrada.', HTTPStatus.NOT_FOUND)

    task_in_db.update(task)
    db.session.commit()

    return (jsonify({'message': 'Tarefa alterada com sucesso.'}), HTTPStatus.CREATED)


@task_router.route('/tarefa/<int:id>', methods=['DELETE'])
def delete(id):
    task_in_db: Task = db.session.query(Task).filter(Task.id == id).first()
    if task_in_db is None:
        raise DomainException('Task não encontrada.', HTTPStatus.NOT_FOUND)
    
    db.session.delete(task_in_db)
    db.session.commit()

    return (jsonify({'message': 'Tarefa deletada com sucesso.'}), HTTPStatus.ACCEPTED)
