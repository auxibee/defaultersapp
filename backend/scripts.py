import sys
from subprocess import CalledProcessError, check_call
from typing import List
from application import create_app

def _check_call_quiet(commands: List[str], *, shell: bool=False) -> None:
    try:
        check_call(commands, shell=shell)
    except CalledProcessError as error:
        sys.exit(error.returncode)


def format() -> None:
    _check_call_quiet(["black", "--check", "--diff", "application", "tests/"])
    _check_call_quiet(["isort", "--check", "--diff", "application", "tests"])
    

def reformat() -> None:
    _check_call_quiet(["black", "application/", "tests/"])
    _check_call_quiet(["isort", "application", "tests"])



def lint() -> None:
    _check_call_quiet(["mypy", "application/", "tests/"])
    _check_call_quiet(["flake8", "application/", "tests/"])
    _check_call_quiet(["vulture", "application/"])
    _check_call_quiet(["bandit", "-r", "application/"])


def test() -> None:
    _check_call_quiet(["pytest", "tests/", *sys.argv[1:]])