from http import HTTPStatus as statusCode

from flask import Blueprint, make_response, request, jsonify
from flask.typing import ResponseReturnValue

from application.exceptions import ApiError
from application.utils import authenticate

blueprint = Blueprint("session", __name__, url_prefix="/api")


@blueprint.route("/login", methods=["POST"])
def log_in() -> ResponseReturnValue:

    request_data = request.get_json()

    username = request_data["username"] # type:ignore
    password = request_data["password"] # type:ignore

    user = authenticate(username=username, password=password)

    if user is not None:
        return make_response(jsonify(user.user_info), statusCode.OK)

    raise ApiError(400, "Invalid credentials")
