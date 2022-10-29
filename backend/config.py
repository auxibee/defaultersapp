from os import environ, path
from dotenv import load_dotenv
import datetime
from datetime import timedelta
basedir = path.abspath(path.dirname(__file__))

load_dotenv(path.join(basedir,'.env'))


# base config class
class Config:
	TESTING = True
	SECRET_KEY = environ.get('SECRET_KEY')
	TOKEN_EXPIRATION = datetime.datetime.utcnow() + datetime.timedelta(days=7)
	# replace("postgresql://",1) a hack to get postgresql to work on heroku
	SQLALCHEMY_DATABASE_URI = environ.get('DATABASE_URL').replace("postgres://","postgresql://",1) 
	JWT_SECRET_KEY = environ.get('JWT_SECRET_KEY')
	JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=7)
	SQLALCHEMY_TRACK_MODIFICATIONS = False

class TestConfig:
	SQLALCHEMY_DATABASE_URI = environ.get('TEST_DATABASE_URL').replace("postgres://","postgresql://",1) 


class ProdConfig(Config):
	FLASK_ENV = 'production'
	DEBUG = False
	TESTING = False
	JWT_COOKIE_SECURE = True


class DevConfig(Config):
	FLASK_ENV = 'development'
	DEBUG = True
	TESTING = False
	JWT_COOKIE_SECURE = False