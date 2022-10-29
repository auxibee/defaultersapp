from typing import Dict, List, Optional


class AppException(Exception):
    # Base exception which all the app exception inherets from
    pass


class BadLoginException(AppException):
    """An error for wrong login credentials"""

    pass


class NotFoundException(AppException):
    """An error when a resource is not found is not found"""

    pass


class DeleteResourceException(AppException):
    """An error when deleting a resource"""

    pass


class ApiError(AppException):
    """Api errors"""

    def __init__(self, status_code: int, code: str) -> None:
        self.status_code = status_code
        self.code = code


class BadRequestDataException(AppException):
    """An error for bad request post data"""

    def __init__(self, message: str = None, payload: Optional[Dict[str, str]] = None) -> None:
        super().__init__(message)
        self.payload = payload
        self.errors = []

    def to_list(self) -> List[dict]:
        for error, message in self.payload.items():
            self.errors.append(message[0])
        return list(self.errors)


class NoAuthorization(AppException):
    pass
