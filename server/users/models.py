from server import db, bcrypt
from flask_restful import Resource, Api, fields as restful_fields, \
    marshal_with, reqparse, abort
from sqlalchemy import CheckConstraint
from marshmallow_jsonapi import Schema, fields as schema_fields
from marshmallow import validate
from server.calendars.models import Calendar
from datetime import datetime

class User(db.Model):
  id = db.Column(db.Integer(), primary_key=True)
  username = db.Column(db.String(255), unique=True)
  password = db.Column(db.String(255))
  profile = db.Column(db.Integer, db.ForeignKey('profile.id'))
  schedule = db.Column(db.Integer, db.ForeignKey('schedule.id'))
  is_admin = db.Column(db.Boolean)
  created_on = db.Column(db.DateTime)
  expiration_date = db.Column(db.DateTime)

  def __init__(self, username, password):
    self.username = username
    self.active = True
    self.password = User.hashed_password(password)
    self.created_on =  datetime.utcnow()
    self.is_admin = True
    self.expiration_date = None
    self.schedule = None

  @staticmethod
  def hashed_password(password):
    return bcrypt.generate_password_hash(password)

  @staticmethod
  def get_user_with_username_and_password(username, password):
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
      return user
    else:
      return None


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


# Profile is a Component of Guttersnipe.  1-to-1 relationship
class Profile(db.Model):
    __tablename__ = 'profile'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(20), unique=True)
    full_name = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(20), unique=True)
    additional_info = db.Column(db.String(20), unique=True)


# Schedule is a Component of Guttersnipe.  1-to-1 relationship
class Schedule (db.Model):
    __tablename__ = 'schedule'
    id = db.Column(db.Integer, primary_key=True)
    calendar = db.Column(db.Integer, db.ForeignKey('calendar.id'))
    notes = db.Column(db.String(20))


# User has Mailbox of Messages.
class Message(db.Model):
    __tablename__ = 'message'
    id = db.Column(db.Integer, primary_key=True)
    calendar = db.Column(db.Integer, db.ForeignKey('calendar.id'))
    text = db.Column(db.String(2054))
    sender = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    recipient = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    sent = db.Column(db.DateTime)


# User can block another user
#class BlockUser(db.Model):
blockUserTable = db.Table(
    'followers',
    db.Column('blocker_id', db.Integer, db.ForeignKey('guttersnipe.id')),
    db.Column('blocked_id', db.Integer, db.ForeignKey('guttersnipe.id')))
