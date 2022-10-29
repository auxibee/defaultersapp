from typing import Any

from marshmallow import fields, pre_load, Schema, validates, ValidationError
from sqlalchemy import and_ # type:ignore

from application.models import Defaulter, User


class DefaulterSchema(Schema):
    """
    Parameters:
            -name (str)
            -telephone (str)
            -location (str)

    """

    name = fields.Str(required=True)
    telephone = fields.Str(required=True)
    location = fields.Str(required=True)
    arrears = fields.Int(required=True)



class UserSchema(Schema):

    """
    Parameters:
            -username(str)
            -password(str)
    """

    username = fields.Str(required=True)
    password = fields.Str(required=True)

    @validates("username")
    def username_exist(self, value: str) -> Any:
        user = User.query.filter_by(username=value).first()
        if user:
            raise ValidationError("User already exits")
