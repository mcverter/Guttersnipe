from server import db
from flask_restful import Resource, Api, fields as restful_fields, \
    marshal_with, reqparse, abort
from sqlalchemy import CheckConstraint
from marshmallow_jsonapi import Schema, fields as schema_fields
from marshmallow import validate
from server.calendars.models import Calendar

'''
parser = reqparse.RequestParser()
TODOS = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '?????'},
    'todo3': {'task': 'profit!'},
}

'''

# A Single User has a single Profile and a single Calendar
# and has a Mailbox with multiple messages
class Guttersnipe(db.Model):
    __tablename__ = 'guttersnipe'
    id = db.Column(db.Integer, primary_key=True)
    profile = db.Column(db.Integer, db.ForeignKey('profile.id'))
    schedule = db.Column(db.Integer, db.ForeignKey('schedule.id'))
    is_admin = db.Column(db.Boolean)
    created_on = db.Column(db.DateTime)
    expiration_date = db.Column(db.DateTime)
'''
    def get(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201

'''


# Profile is a Component of Guttersnipe.  1-to-1 relationship
class Profile(db.Model):
    __tablename__ = 'profile'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(20), unique=True)
    full_name = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(20), unique=True)
    additional_info = db.Column(db.String(20), unique=True)

'''
    def get(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201


    def __repr__(self):
        return '<User %r>' % (self.nickname)
'''

# Schedule is a Component of Guttersnipe.  1-to-1 relationship
class Schedule (db.Model):
    __tablename__ = 'schedule'
    id = db.Column(db.Integer, primary_key=True)
    calendar = db.Column(db.Integer, db.ForeignKey('calendar.id'))
    notes = db.Column(db.String(20))

'''
    def get(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201

'''

# User has Mailbox of Messages.
class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.Integer, primary_key=True)
    calendar = db.Column(db.Integer, db.ForeignKey('calendar.id'))
    text = db.Column(db.String(2054))
    sender = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    recipient = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    sent = db.Column(db.DateTime)

'''
    def get(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201
'''
# User can block another user
#class BlockUser(db.Model):
blockUserTable = db.Table(
    'followers',
    db.Column('blocker_id', db.Integer, db.ForeignKey('guttersnipe.id')),
    db.Column('blocked_id', db.Integer, db.ForeignKey('guttersnipe.id')))

'''
class TodoList:
    def get(self):
        return TODOS

    def post(self):
        args = parser.parse_args()
        todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id
        TODOS[todo_id] = {'task': args['task']}
        return TODOS[todo_id], 201
'''





