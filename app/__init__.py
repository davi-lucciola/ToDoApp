from flask import Flask, make_response, redirect
from .config import Config, db
from .exceptions import BaseException
from .controllers import task_bp, user_bp


def create_app() -> Flask:
    app = Flask(__name__, template_folder='./views')
    app.config.from_object(Config)

    # Bluprints
    app.register_blueprint(user_bp)
    app.register_blueprint(task_bp)

    # Base Routes
    @app.route('/')
    def index():
        return redirect('/home')

    # Exception Handler
    @app.errorhandler(BaseException)
    def exception_handler(error: BaseException):
        return make_response({'message': error.message}, error.status_code)

    # Database
    with app.app_context():
        db.init_app(app)
        db.create_all()
    
    return app