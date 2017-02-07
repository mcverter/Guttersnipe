from flask import jsonify, Flask, request, render_template, send_from_directory, redirect, make_response
from server.users.models import User
from server import db, app
from flask_jwt_extended import JWTManager, jwt_required,\
    create_access_token

# Provide a method to create access tokens. The create_access_token()
# function is used to actually generate the token
@app.route('/api/signin', methods=['POST'])
def signin():
    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if User.get_user_with_username_and_password(username, password) is None:
        return jsonify({"msg": "Bad username or password"}), 401

    # Identity can be any data that is json serializable
    ret = {'access_token': create_access_token(identity=username)}
    return jsonify(ret), 200


@app.route('/api/signup', methods=['POST'])
def signup():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if username is None or password is None:
      return jsonify({"msg": "You must supply username and password"}), 401

    u = User.query.filter_by(username=username).first()

    if u:
      return jsonify({"msg": "A user with the name " + username + " already exists"}), 401

    u = User(username=username, password=password)
    db.session.add(u)
    db.session.commit()

    # Identity can be any data that is json serializable
    ret = {'access_token': create_access_token(identity=username)}
    return jsonify(ret), 200

