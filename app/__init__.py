from flask import Flask, make_response, redirect, render_template
from .config import Config, db
from .exceptions import BaseException
from .controllers import task_router


def create_app() -> Flask:
    app = Flask(__name__, template_folder='./views')
    app.config.from_object(Config)

    # Base Routes
    @app.route('/')
    def index():
        return redirect('/home')

    @app.route('/home')
    def home():
        return render_template('home.html')

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
    
    return app