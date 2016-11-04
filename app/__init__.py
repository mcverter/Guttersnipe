__author__ = 'mitchell_verter'

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__,
            static_url_path='/public')
app.config.from_object('config')
# app.config.from_pyfile('config.py')
db = SQLAlchemy(app)


from models.user_models import Guttersnipe, Profile, Schedule, Messages, blockUserTable
from models.icalendar_models import Vevent, Rrules
from models.shareable_models import  Shareable, Thing, Space, Time, \
    Type, Subtype, \
    Comment

#     thing_Subtype_JoinTable,