__author__ = 'mitchell_verter'

from flask import Flask, render_template, send_from_directory
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restful import Api
from flask_cors import CORS, cross_origin
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp


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


from server.users.models import User

def authenticate(username, password):
  print("Authenticating")
  u = User.query.filter_by(username=username).first()
  if u and safe_str_cmp(u.password.encode('utf-8'), password.encode('utf-8')):
    return u
  return 401

def identity(payload):
  print("Identifiying")
  u_id = payload['identity']
  u = User.query.filter_by(id=u_id).first()
  return u


app.config['SECRET_KEY'] = "foobar"

jwt = JWT(app, authenticate, identity)


'''


app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'super-secret'

jwt = JWT(app, authenticate, identity)

@app.route('/protected')
@jwt_required()
def protected():
    return '%s' % current_identity

if __name__ == '__main__':
    app.run()


'''
