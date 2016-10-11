__author__ = 'mitchell'
from next_release.app import db
from flask_restful import Resource, Api, fields, marshal_with, \
    reqparse, abort
from sqlalchemy import CheckConstraint, Enum
import userModels
from icalendarModels import Vevent
from sqlalchemy.dialects.postgresql import ARRAY, array
import geoalchemy2

####################
# Business Objects
####################

# A Shareable is a composite of a Time, a Space, and a Thing
# It can have ratings
# Users can comment upon it
class Shareable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    thing_id = db.Column(db.Integer, db.ForeignKey('thing.id'))
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'))
    time_id = db.Column(db.Integer, db.ForeignKey('time.id'))

    # comments
    comments = db.relationship('Post', backref='author', lazy='dynamic')

    # ratings
    number_ratings = db.Column(db.Integer)
    total_ratings = db.Column(db.Integer)

    def __repr__(self):
        return '<Shareable %r>' % (self.id)

class ShareableType(Enum):
    food = "Food"
    shelter = "Shelter"
    medical = "Medical"
    travel = "Travel"

class SubTypes(db.Model):
    type = ShareableType
    subtype = db.String(64)

# Thing is a Component of Shareable.  1-to-1 relationship
class Thing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descriptionHow = db.Column(db.String(140))
    descriptionWhat = db.Column(db.String(140))

    # Thing can have user-defined tags
    tags = db.Column(ARRAY(db.Text), nullable=False, default=db.cast(array([], type_=db.Text), ARRAY(db.Text)))
    __table_args__ = (db.Index('ix_shareable_tags', tags, postgresql_using="gin"), )

    # Thing can have system-defined type and subtypes
    type = db.Column(ShareableType)
    # Not quite right but getting there ...
    subtypes = db.Column(ARRAY(db.Text), nullable=False, default=db.cast(array([], type_=db.Text), ARRAY(db.Text)))
    __table_args__ = (db.Index('ix_shareable_subtype', tags, postgresql_using="gin"),)


#  roadrunneratwast: the normalized approach would be  things(id,type, primary key(id), unique(id,type)) thing_subtypes(thing_id,type,subtype, foreign key (thing_id,type) references things(id,type), foreign key (type,subtype) references subtypes(type,subtype))

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


# Space is a Component of Shareable.  1-to-1 relationship
class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    longditude = db.Column(db.Double)
    latitude = db.Column(db.Double)
    canonical_address = db.Column(db.String(560))
    alternate_names = db.Column(db.ARRAY(db.Text))
    notes = db.Column(db.String(2054))

# Space is a Component of Shareable.  1-to-1 relationship
class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calendar = db.Column(Vevent)
    notes = db.Column(db.String(2054))

#Users can comment on Shareables
class Comment (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    shareable = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    text  = db.Column(db.String(2054))
    created  =  db.Column(db.DateTime)
