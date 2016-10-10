__author__ = 'mitchell'
from next_release.app import db
from flask_restful import Resource, Api, fields, marshal_with, \
    reqparse, abort
from sqlalchemy import CheckConstraint
import userModels
from icalendarModels import Vevent


####################
## Business Objects
####################

# A Shareable is a composite of a Time, a Space, and a Thing
# It can have ratings
# Users can comment upon it
class Shareable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    thing_id = db.Column(db.Integer, db.ForeignKey('thing.id'))
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'))
    time_id = db.Column(db.Integer, db.ForeignKey('time.id'))

    #comments
    comments = db.relationship('Post', backref='author', lazy='dynamic')

    #ratings
    number_ratings = db.Column(db.Integer)
    total_ratings = db.Column(db.Integer)

    def __repr__(self):
        return '<Shareable %r>' % (self.id)


# Thing is a Component of Shareable.  1-to-1 relationship
class Thing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum("Food", "Shelter", "Medical", "Travel"))
    descriptionHow = db.Column(db.String(140))
    descriptionWhat = db.Column(db.String(140))


class SubTypes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type_id = Type
    subtype = db.String(64)



# Space is a Component of Shareable.  1-to-1 relationship
class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    longditude = db.Column(db.Double)
    latitude = db.Column(db.Double)
    canonical_address = db.Column(db.String(560))
    alternate_names = db.Column(db.ARRAY(db.String(560)))                          # String array works here.  Replace with correct data structure
    notes = db.Column(db.String(2054))

# Space is a Component of Shareable.  1-to-1 relationship
class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calendar = sCalendar_VEVENT                         #sCalendar_VEVENT will be defined soon ...
    notes = db.Column(db.String(2054))


# Shareables can be tagged with attributes
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(140))

class Thing_Tag_JoinTable(db.Model):
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'))
    shareable_id = db.Column(db.Integer, db.ForeignKey('shareable.id'))

class Thing_Subtype_JoinTable(db.Model):
    subtype_id = db.Column(db.Integer, db.ForeignKey('subtype.id'))
    shareable_id = db.Column(db.Integer, db.ForeignKey('shareable.id'))


#Users can comment on Shareables
class Comment (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    shareable = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    text  = db.Column(db.String(2054))
    created  =  db.Column(db.DateTime)
