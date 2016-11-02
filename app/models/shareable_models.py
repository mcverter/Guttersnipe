__author__ = 'mitchell'
from app import db
from flask_restful import Resource, Api, fields, marshal_with, \
    reqparse, abort
from sqlalchemy import CheckConstraint, Enum
from user_models import Guttersnipe
from icalendar_models import Vevent
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


# Thing is a Component of Shareable.  1-to-1 relationship
class Thing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    descriptionHow = db.Column(db.String(140))
    descriptionWhat = db.Column(db.String(140))

    # Thing can have user-defined tags
    tags = db.Column(ARRAY(db.Text), nullable=False, default=db.cast(array([], type_=db.Text), ARRAY(db.Text)))

    # Thing can have system-defined type and subtypes
    type = db.Column(ShareableType)
    # Not quite right but getting there ...
    subtypes = db.Column(ARRAY(db.Text), nullable=False, default=db.cast(array([], type_=db.Text), ARRAY(db.Text)))
    __table_args__ = (db.Index('ix_shareable_subtype', tags, postgresql_using="gin"),)



# Shareables can be tagged with attributes
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(140))

thingTagJoinTable = db.Table (
    'thing_tag_join',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
    db.Column('thing_id', db.Integer, db.ForeignKey('shareable.id')))

'''
thing_Subtype_JoinTable = db.Table(
    'thing_subtype_join',
    db.Column('subtype_id', db.Integer, db.ForeignKey('subtype.id')),
    db.Column('shareable_id', db.Integer, db.ForeignKey('shareable.id')))
'''

# Space is a Component of Shareable.  1-to-1 relationship
class Space(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    longditude = db.Column(db.Float)
    latitude = db.Column(db.Float)
    canonical_address = db.Column(db.String(560))
    alternate_names = db.Column(ARRAY(db.Text))
    notes = db.Column(db.String(2054))

# Space is a Component of Shareable.  1-to-1 relationship
class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calendar = db.Column(db.Integer, db.ForeignKey('vevent.id'))
    notes = db.Column(db.String(2054))

#Users can comment on Shareables
class Comment (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    shareable = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    text  = db.Column(db.String(2054))
    created  =  db.Column(db.DateTime)

#  roadrunneratwast: the normalized approach would be
# things(id,type, primary key(id), unique(id,type))
# thing_subtypes(thing_id,type,subtype, foreign key (thing_id,type) references things(id,type), foreign key (type,subtype) references subtypes(type,subtype))
#####
#  WHY AM I HAVING SUCH A HARD TIME WITH THIS???
#####

#class SubTypes(db.Model):
#    type = ShareableType
#    subtype = db.String(64)

#class Thing_Subtypes(db.Model):
#    thing_id = db.Column(db.Integer, db.ForeignKey('thing.id'))
#    type = db.Column(ShareableType, db.ForeignKey('thing.type'))
#    subtype = db(db.Text)

# Not quite right but getting there ...
#    subtypes = db.Column(ARRAY(db.Text), nullable=False, default=db.cast(array([], type_=db.Text), ARRAY(db.Text)))
#   ,db.Index('ix_shareable_tags', tags, postgresql_using="gin"))

#  roadrunneratwast: the normalized approach would bethings(id,type, primary key(id), unique(id,type)) thing_subtypes(thing_id,type,subtype, foreign key (thing_id,type) references things(id,type), foreign key (type,subtype) references subtypes(type,subtype))

#   <roadrunneratwast> okelly dokely
# <StuckMojo> yeah, but he left out the subtype table, like is said, so 3 tables total
#  * irq1 (~Thunderbi@bip13.neoplus.adsl.tpnet.pl) has joined #postgresql
#  <StuckMojo> subtypes, things, thing_subtypes
#  <roadrunneratwast> ok
#  <roadrunneratwast> so a join table
#  <StuckMojo> really the "subtypes" table could be called types
#  <StuckMojo> since it defines both types, and subtypes
#  <roadrunneratwast> oh ok
#  <StuckMojo> it's a table that is a list of the possible combinations of type, subtype
#  <StuckMojo> and it is used to constrain what can go into thing_subtypes
#  things have a type. thing_subtypes says what subtypes that thing is. the FK to subtypes enforces that a thing of a certain type cannot define itself to be a subtype that is not allowed. get it?
#  <StuckMojo> it works because of the overlap of the compound FKs in thing_subtypes
#  <StuckMojo> they overlap on type
# <StuckMojo> one is the thing_id, and type, pointing back to a thing
#  <StuckMojo> the other is the type, subtype, pointing to the list of allowed type, subtype combinations
#  <StuckMojo> see how it works?
#  <StuckMojo> so a thing of a given type cannot declare a subtype that is not allowed for that type
#  <StuckMojo> by virtue of that overlap
