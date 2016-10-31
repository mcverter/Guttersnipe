__author__ = 'mitchell_verter'

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__,
            static_url_path='/public')
app.config.from_object('config')
# app.config.from_pyfile('config.py')
db = SQLAlchemy(app)


import models.user_models
import models.icalendar_models
import models.shareable_models
