from http import HTTPStatus as statusCode
from typing import Any, Dict, Optional

from flask import _request_ctx_stack, Blueprint, current_app, jsonify, make_response, request
from flask.typing import ResponseReturnValue
from flask_jwt_extended import current_user, get_jwt, jwt_required

from application.exceptions import ApiError
from application.models import Defaulter, User
from application.schema import DefaulterSchema
from application.utils import get_validation_errors, is_permitted, validate, validate_request_data

blueprint = Blueprint("defaulters", __name__, url_prefix="/api")


@blueprint.route("/defaulters", methods=["POST"])
@jwt_required()
@validate(schema=DefaulterSchema)
def post_defaulter() -> ResponseReturnValue:
    """Create a new defaulter"""

    name = request.get_json()["name"] # type:ignore
    telephone = request.get_json()["telephone"] # type:ignore
    location = request.get_json()["location"] # type:ignore
    arrears =request.get_json()["arrears"] # type:ignore

    new_defaulter = Defaulter(
        name=name, telephone=telephone, location=location,arrears=arrears, user_id=current_user.id
    )

    new_defaulter.save()
    return jsonify({"defaulter": new_defaulter}), statusCode.OK


@blueprint.route("/defaulters", methods=["GET"])
@jwt_required()
def get_defaulters() -> ResponseReturnValue:
    """Get all defaulters"""
    defaulters = Defaulter.query.filter_by(user_id=current_user.id).all()

    return jsonify({"defaulters": defaulters})


@blueprint.route("/defaulters/<int:id>", methods=["GET"])
@jwt_required()
def get_defaulter(id:int) -> ResponseReturnValue:
    """Get a single defaulter by its ID"""
    defaulter = Defaulter.query.filter(
        Defaulter.id == id, Defaulter.user_id == current_user.id
    ).first()
    if defaulter is None:
        raise ApiError(404, "Not Found")
    return jsonify({"defaulter": defaulter})


@blueprint.route("/defaulters/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_defaulter(id: int) -> ResponseReturnValue:
    """Delete a defaulter"""

    defaulter = Defaulter.query.filter(
        Defaulter.id == id, Defaulter.user_id == current_user.id
    ).first()

    if defaulter is None:
        raise ApiError(400, "Invalid Request")

    defaulter.delete()
    return jsonify({"defaulters": current_user.defaulters})


@blueprint.route("/defaulters/<int:id>", methods=["PUT"])
@jwt_required()
@validate(schema=DefaulterSchema)
def update_defaulter(id: int) -> ResponseReturnValue:
    defaulter = Defaulter.query.filter_by(id=id).first()
    if defaulter is None:
        return jsonify(defaulters=current_user.defaulters)

    can_update = is_permitted(user=current_user, resource=defaulter)

    if can_update:
        name = request.get_json()["name"] # type:ignore
        telephone = request.get_json()["telephone"] # type:ignore
        location  = request.get_json()["location"] # type:ignore
        arrears  = request.get_json()["arrears"] # type:ignore

        defaulter.name = name
        defaulter.telephone = telephone
        defaulter.location = location
        defaulter.arrears = arrears
        defaulter.save()
        return jsonify({"defaulters": current_user.defaulters})

    raise ApiError(400,"Cant update resource")


@blueprint.route('/test')
def test():
    return {'name':'yaw twumasi'}