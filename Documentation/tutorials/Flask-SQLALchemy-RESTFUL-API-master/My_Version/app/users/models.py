__author__ = 'mitchell_verter'

from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError

db = SQLAlchemy()

class CRUD():
    def add(self, resource):
        db.session.add(resource)
        return db.session.commit()