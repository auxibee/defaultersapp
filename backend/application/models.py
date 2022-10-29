from dataclasses import dataclass
from typing import Any, Dict

from flask import current_app
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash, generate_password_hash
from application import db


class dbMixin:
    def save(self) -> Any:
        """Saves the object to the database"""
        db.session.add(self)
        try:
            db.session.commit()
            return self
        except Exception as error:
            self.rollback()
            return error

    def rollback(self) -> None:
        db.session.rollback()

    def delete(self) -> Any:
        db.session.delete(self)
        try:
            db.session.commit()
        except Exception as error:
            print(error)
            return error

dbModel  = db.Model

@dataclass
class Defaulter(dbModel, dbMixin):
    id: int
    name: str
    telephone: str
    location: str
    arrears: int

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=False)
    telephone = db.Column(db.String(12), nullable=False, unique=False)
    location = db.Column(db.String(20), nullable=False)
    arrears = db.Column(db.Integer, nullable=False, server_default='0')
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    @classmethod
    def delete_defaulter(cls, defaulter_id: int, user_id: int) -> bool:
        """Deletes a defaulter"""
        defaulter = Defaulter.query.filter(User.id == user_id, cls.id == defaulter_id).first()
        if defaulter:
            defaulter.delete()
            return True
        return False


@dataclass
class User(dbModel, dbMixin):
    id: int
    username: str
    defaulters: Defaulter

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    login_attempts = db.Column(db.Integer, default=0)

    _password = db.Column(db.String(120), nullable=False, unique=True)

    # relationships
    defaulters = db.relationship("Defaulter", backref="manager", lazy="joined")

    def _set_password(self, password: str) -> None:
        """Returns a hashed password"""
        if not password:
            return
        self._password = generate_password_hash(password)

    def _get_password(self) -> str:
        """Returns the hashed password"""
        return self._password

    def check_password(self, password: str) -> bool:
        """Returns True if password matches hash and false otherwise"""
        if self.password is None:
            return False
        return check_password_hash(self.password, password)

    password = db.synonym("_password", descriptor=property(_get_password, _set_password))

    @classmethod
    def authenticate(cls, login: str, password: str) -> Any:
        """
                 A classmethod for authenticating users it returns the user object if
        user/password combination is correct

        :param login: This can be either username or email
        :param password: The password that is connected to the username and email
        """
        user = cls.query.filter(User.username == login).first()
        if user is not None:
            if user.check_password(password):
                return user
        return None

    @property
    def user_info(self) -> Dict[str, Dict[str, object]]:
        rv = {}
        token = create_access_token(self)
        rv["userInfo"] = {"id": self.id, "username": self.username}
        rv["token"] = token
        rv["expiresAt"] = current_app.config["TOKEN_EXPIRATION"].timestamp()

        return rv
