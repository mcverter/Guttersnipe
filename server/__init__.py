__author__ = 'mitchell_verter'

from flask import Flask, render_template, send_from_directory
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restful import Api
from flask_cors import CORS, cross_origin


app = Flask(__name__, static_url_path='/static')

app.config.from_object('config')
db = SQLAlchemy(app)
api = Api(app)
CORS(app)

from server.calendars.models import Event, RecurrenceRule
from server.users.models import Guttersnipe, Profile, Schedule, Message, blockUserTable
from server.shareables.models import Shareable, \
    Thing, Space, Time, \
    MainType, Subtype, Comment

from server.shareables.endpoints import ShareableEndpoint

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('/static', path)



@app.route('/')
def index():
    print ("hello")
    return render_template("index.html", user="moo")
