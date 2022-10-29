from functools import wraps
from typing import Any, Callable, Dict, Optional

import jwt
from flask import _request_ctx_stack, current_app, request
from marshmallow import Schema, ValidationError

from application.exceptions import BadLoginException, BadRequestDataException, NoAuthorization
from application.models import User


def validate(schema: Any, **inputs: Dict[str, str]) -> Callable:
    def decorator(fn: Callable) -> Callable:
        @wraps(fn)
        def wrapper(*args, **kwargs):
            if request.method not in ["POST", "PUT"]:
                return current_app.ensure_sync(fn)(*args, **kwargs)

            data = request.get_json()

            ctx = _request_ctx_stack
            schema_ = schema(**inputs)
            errors = validate_request_data(schema_, data=data)

            if errors:
                ctx = _request_ctx_stack
                ctx.request_data_errors = errors
                raise BadRequestDataException(payload=errors.messages)
            else:
                ctx.request_data_errors = {}
            return current_app.ensure_sync(fn)(*args, **kwargs)

        return wrapper

    return decorator


def get_validation_errors() -> Dict[str, str]:
    request_data_errors = getattr(_request_ctx_stack, "request_data_errors", None)
    if request_data_errors is None:
        raise RuntimeError("You must call @validate before using this method")
    return request_data_errors


def is_permitted(user: Any, resource: Any) -> bool:
    """Checks if a user is permitted to edit or delete a resource"""
    return user.id == resource.user_id


def validate_request_data(schema: Any, data: Dict[str, str]) -> Optional[None]:
    """Validate a POST request data
    :param schema: A validation Schema
    :param data: The request data
    :return: None if data is valid and error message when invalid
    """
    try:
        validate = schema.load(data)
        return None
    except ValidationError as error:
        return error


def authenticate(username: str, password: str) -> Optional[User]:
    """Handles the authentication of a user"""
    user = None
    user = User.query.filter_by(username=username).first()
    if user is None:
        return user

    authenticate_user = user.check_password(password)
    if not authenticate_user:
        return None

    return user


# def dict_to_list(values):
#     n = []
#     for val in values.values():
#         n.append(val[0])


# def decode_token_from_json():
#     """Gets the token from json request header"""
#     if not request.is_json:
#         raise RuntimeError("Invalid content type must be application/json")

#     token_key = "access_token"
#     try:
#         econded_token = request.is_json and request.json.get(token_key, None)
#         if econded_token is None:
#             raise RuntimeError("Missing access token")
#     except:
#         raise RuntimeError("bad request")

#     return econded_token
