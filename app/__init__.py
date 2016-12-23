__author__ = 'mitchell_verter'

from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restful import Api


app = Flask(__name__,
            static_url_path='/public')
app.config.from_object('config')
db = SQLAlchemy(app)
api = Api(app)

from app.calendars.models import Event, RecurrenceRule
from app.users.models import Guttersnipe, Profile, Schedule, Message, blockUserTable
from app.shareables.models import Shareable, \
    Thing, Space, Time, \
    MainType, Subtype, Comment

from app.shareables.endpoints import ShareableEndpoint

@app.route('/')
def index():
    print ("hello")
    return render_template("index.html", user="moo")