import pytest 
from collections.abc import Generator
from flask import Flask

from application import create_app
from application.models import User


@pytest.fixture(scope="module")
def new_user() -> User:

    new_user = User(username="auxibee", password="123456")
    return new_user


@pytest.fixture(scope="module")
def test_client() -> Generator[Flask, None]:
    app = create_app()

    with app.test_client() as testing_client:
        with app.app_context():
            yield testing_client
