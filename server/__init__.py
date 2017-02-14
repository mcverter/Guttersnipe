
from flask import jsonify, Flask, request, render_template, send_from_directory, redirect, make_response
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required,\
    create_access_token, get_jwt_identity
from flask_bcrypt import Bcrypt


app = Flask(__name__, static_url_path='/static')

app.config.from_object('config')
db = SQLAlchemy(app)
api = Api(app)
CORS(app)
bcrypt = Bcrypt(app)

from server.calendars.models import Event, RecurrenceRule
from server.users.models import User, Guttersnipe, Profile, Schedule, Message, blockUserTable
from server.shareables.models import Shareable, \
    Thing, Space, Time, \
    MainType, Subtype, Comment

from server.shareables.endpoints import ShareableEndpoint
import server.auth.endpoints
from server.kropotkins.models import Kropotkin
from server.kropotkins.endpoints import KropotkinEndpoint

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('/static', path)

@app.route('/')
def index():
    return render_template("index.html", user="moo")

app.config['SECRET_KEY'] = "foobar"

if __name__ == '__main__':
    app.run()

# Setup the Flask-JWT-Extended extension
jwt = JWTManager(app)


# Protect a view with jwt_required, which requires a valid access token
# in the request to access.
@app.route('/protected', methods=['GET'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify({'hello_from': current_user}), 200


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
  return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
