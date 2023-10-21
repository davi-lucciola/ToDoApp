from flask import Blueprint, render_template
from ..config import db
from ..models import Task


user_bp = Blueprint('Home', 'home_bp')


@user_bp.route('/home', methods=['GET'])
def home():
    # user_tasks = db.session.query(Task).all()
    return render_template('home.html')

@user_bp.route('/login', methods=['GET'])
def sign_in():
    return 'Login'# render_template()

@user_bp.route('/register', methods=['GET'])
def sign_up():
    return 'Register' # render_template()

@user_bp.route('/login', methods=['POST'])
def login():
    return ''

@user_bp.route('/logout')
def logout():
    return ''

@user_bp.route('/register', methods=['POST'])
def register():
    return ''
