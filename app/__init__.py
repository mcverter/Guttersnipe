__author__ = 'mitchell_verter'

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__,
            static_url_path='/public')
app.config.from_object('config')
# app.config.from_pyfile('config.py')
db = SQLAlchemy(app)

from app.users.models import Guttersnipe, Profile, Schedule, Messages, blockUserTable
from app.iCalendar.models import Vevent, Rrule
from app.shareables.models import Shareable, \
    Thing, Space, Time, \
    MainType, Subtype, Comment

# thing_Subtype_JoinTable,