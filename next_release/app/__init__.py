__author__ = 'mitchell_verter'

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

from next_release.app import \
    views, businessModels, icalendarModels, userModels
