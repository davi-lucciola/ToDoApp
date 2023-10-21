from flask import Flask, make_response, redirect, render_template
from flask_cors import CORS
from config import Config, db
from controllers import task_router
from models import *
from exceptions import BaseException


app = Flask(__name__, template_folder='./views')
cors = CORS(app)
app.config.from_object(Config)

# Base Routes
@app.route('/')
def index():
    return redirect('/home')

@app.route('/home')
def home():
    return render_template('home.html', tasks=db.session.query(Task).all())

# Exception Handler
@app.errorhandler(BaseException)
def exception_handler(error: BaseException):
    return make_response({'message': error.message}, error.status_code)

# Bluprints
app.register_blueprint(task_router)

# Database
with app.app_context():
    db.init_app(app)
    db.create_all()


if __name__ == '__main__':
    app.run(debug=True)
