import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = 'SECRET'
    DEBUG = False

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'thermos.db')

class TestingConfig(Config):
    TESTING = True
    SQL_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'thermos.db')
    WTF_CSRF_ENABLED = False
    SERVER_NAME = "localhost"

class ProductionConfig(Config):
    DEBUG = False
    SQL_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'thermos.db')

config_by_name = dict (
    dev = DevelopmentConfig,
    test = TestingConfig,
    prod = ProductionConfig
)