import os
from http import HTTPStatus as statusCode
from typing import Any, Dict

from flask import Flask, jsonify
from flask.typing import ResponseReturnValue
from flask_cors import CORS # type:ignore
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate # type:ignore
from flask_sqlalchemy import SQLAlchemy # type:ignore

from application.exceptions import (
    ApiError,
    BadLoginException,
    BadRequestDataException,
    DeleteResourceException,
    NoAuthorization,
    NotFoundException,
)

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()



def create_app() -> Flask:
    app = Flask(__name__, static_folder='../build', static_url_path='/')
    env_config = os.getenv("APP_SETTINGS", "config.DevConfig")
   
    app.config.from_object(env_config)
    configure_extensions(app)
    configure_error_handlers(app)

    # import routes
    from application.blueprints.defaulters import blueprint as defaulters
    from application.blueprints.members import blueprint as members
    from application.blueprints.session import blueprint as session

    # register blueprint
    @app.route('/')
    def index():
        return app.send_static_file('index.html')
        
    app.register_blueprint(members)
    app.register_blueprint(defaulters)
    app.register_blueprint(session)

    return app


def configure_error_handlers(app: Flask) -> None:
    """Configures the error handlers"""

    @app.errorhandler(BadLoginException)
    def badlogin(e: BadLoginException) -> ResponseReturnValue:
        return jsonify(message=str(e)), statusCode.BAD_REQUEST

    @app.errorhandler(ApiError)
    def api_error(e: ApiError) -> ResponseReturnValue:
        return jsonify(message=str(e.code)), e.status_code

    @app.errorhandler(BadRequestDataException)
    def badrequestdata(e: BadRequestDataException) -> ResponseReturnValue:
        return jsonify(message=e.to_list()), statusCode.FORBIDDEN

    @app.errorhandler(NotFoundException)
    def page_not_found(e: NotFoundException) -> ResponseReturnValue:
        return jsonify(message=str(e)), statusCode.NOT_FOUND

    @app.errorhandler(DeleteResourceException)
    def delete_resource_error(e: DeleteResourceException) -> ResponseReturnValue:
        return jsonify(message=str(e)), statusCode.BAD_REQUEST

    @app.errorhandler(NoAuthorization)
    def no_authorization_header(e: NoAuthorization) -> ResponseReturnValue:
        return jsonify(message=str(e)), statusCode.BAD_REQUEST

    @app.errorhandler(500)
    def internalServerError(e: int) -> ResponseReturnValue:
        return jsonify(error="something bad happened"), statusCode.INTERNAL_SERVER_ERROR


def configure_extensions(app: Flask) -> None:
    """Configures all application extension"""

    # initialize application extensions
    db.init_app(app)
    # admin.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    # add models to flask admin
    from application.models import User

    # admin.add_view(ModelView(User, db.session))
    # Add jwt callbacks for automatic user loading
    @jwt.user_identity_loader
    def user_identity_lookup(user: Any) -> int:
        return user.id

    @jwt.user_lookup_loader
    def user_lookup_callback(
        _jwt_header: Dict[str, str],
        jwt_data: Dict[str, str],
    ) -> Any:
        from application.models import User

        identity = jwt_data["sub"]
        return User.query.filter_by(id=identity).one_or_none()
