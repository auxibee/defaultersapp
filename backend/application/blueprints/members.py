from http import HTTPStatus as statusCode

from flask import Blueprint, jsonify, request
from flask.typing import ResponseReturnValue

from application.models import User
from application.schema import UserSchema
from application.utils import validate

blueprint = Blueprint("members", __name__, url_prefix="/api")


@blueprint.route("/signup", methods=["POST"])
@validate(schema=UserSchema)
def signup_handler() -> ResponseReturnValue:

    username = request.get_json()["username"] # type:ignore
    password = request.get_json()["password"] # type:ignore

    new_user = User(username=username, password=password)
    new_user.save()

    return jsonify(new_user.user_info), statusCode.OK

