from http import HTTPStatus
from dataclasses import dataclass

@dataclass
class BaseException(Exception):
    message: str
    status_code: int

class ValidationException(BaseException):
    status_code: int = HTTPStatus.UNPROCESSABLE_ENTITY

class DomainException(BaseException):
    status_code: int = HTTPStatus.BAD_REQUEST
