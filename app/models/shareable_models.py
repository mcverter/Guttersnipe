from app import db
from sqlalchemy import CheckConstraint, Enum
from sqlalchemy.dialects.postgresql import ARRAY, array
import geoalchemy2
from app.models.user_models import Guttersnipe
from app.models.icalendar_models import Vevent, VeventSchema
from app.models.crud_base_model import CRUD_Base
from marshmallow_jsonapi import Schema, fields
from marshmallow import validate

####################
# Business Objects
####################

# A Shareable is a composite of a Time, a Space, and a Thing
# It can have ratings
# Users can comment upon it
class Shareable(db.Model, CRUD_Base):
    id = db.Column(db.Integer, primary_key=True)
    thing_id = db.Column(db.Integer, db.ForeignKey('thing.id'), nullable=False)
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'), nullable=False)
    time_id = db.Column(db.Integer, db.ForeignKey('time.id'), nullable=False)

    # comments
    comments = db.relationship('Comments', backref="Shareable", cascade="all, delete-orphan", lazy='dynamic')

    # ratings
    number_ratings = db.Column(db.Integer, nullable=False)
    total_ratings = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Shareable %r>' % (self.id)

'''
 <roadrunneratwast> hi pythonathons!!!  Can I get some feedback on a little bit of sql alchemy.  I am trying to model a THING.  a THING must have a single TYPE and may have multiple SUBTYPES.  I have developed a join table for subtypes.  I would like to have a constraint on the join table that guarantees the correspondence between types and subtypes. Also:  I want marshmallow to be able to serialize out the results of the join table.
'''


# Thing is a Component of Shareable.  1-to-1 relationship
class Thing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description_how = db.Column(db.String(140))
    description_what = db.Column(db.String(140))

    # Thing can have user-defined tags
    tags = db.Column(ARRAY(db.Text), nullable=False, default=db.cast(array([], type_=db.Text), ARRAY(db.Text)))
    __table_args__ = (db.Index('ix_shareable_tags', tags, postgresql_using="gin"),)

    # Thing can have system-defined type and subtypes
    # subtypes are defined by JOIN table below
    type = db.Column(db.String, db.ForeignKey('type.type'), nullable=False)
    comments = db.relationship('Post', backref='author', lazy='dynamic')
    subtypes = db.relationship()
'''
association_table = Table('association', Base.metadata,
    Column('left_id', Integer, ForeignKey('left.id')),
    Column('right_id', Integer, ForeignKey('right.id'))
)

class Parent(Base):
    __tablename__ = 'left'
    id = Column(Integer, primary_key=True)
    children = relationship("Child",
                    secondary=association_table)

class Child(Base):
    __tablename__ = 'right'
    id = Column(Integer, primary_key=True)
'''

class Type(db.Model):
    type = db.Column(db.Text, primary_key=True)

# Would be nice to have a composite PK
class Subtype(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, db.ForeignKey('type.type')) #, primary_key=True)
    subtype = db.Column(db.String) #, primary_key=True)

'''
Question about SUBTYPES =>
========================
A Thing has types and subtypes.
It must have one type and can have zero to many multiple subtypes.
But these subtypes can only be the child of the given type.

For example a THING could be have TYPE="CAR" and SUBTYPES="SEDAN, 4-DOOR, VOLVO"
or it could be TYPE="ANIMAL" and SUBTYPES="DOG, HAIRLESS"
but it wouldn't make sense to have a CAR that is a DOG.

Is this a legitimate way to model the subtype relationship?  Will it be constrained by this schema?
'''

thing_subtype_join = db.Table(
    'thing_subtype_join',
    db.Column('subtype_id', db.Integer, db.ForeignKey('subtype.id')),
    db.Column('shareable_id', db.Integer, db.ForeignKey('shareable.id')))
# Would be nice to have composite FK
#   db.ForeignKey('subtype.type', 'subtype.subtype')),
# Would be nice to have this constraint
#    CheckConstraint(subtype.type == shareable.type))


# Space is a Component of Shareable.  1-to-1 relationship
class Space(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    longitude = db.Column(db.Float, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    canonical_address = db.Column(db.Text, nullable=False)
    alternate_names = db.Column(ARRAY(db.Text))
    notes = db.Column(db.Text)

# Space is a Component of Shareable.  1-to-1 relationship
class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calendar = db.Column(db.Integer, db.ForeignKey('vevent.id'))
    notes = db.Column(db.Text)

#Users can comment on Shareables
class Comment (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    shareable = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    text = db.Column(db.String(2054))
    created = db.Column(db.DateTime)




class SpaceSchema(Schema):
    id = fields.Integer
    longitude = fields.Float
    latitude = fields.Float
    canonical_address = fields.String
    notes = fields.String
    alternate_names = fields.String(many=True)


class TimeSchema(Schema):
    id = fields.Integer
    notes = fields.String
    calendar = fields.Nested(VeventSchema)


class TypeSchema(Schema):
    type = fields.String

class CommentSchema(Schema):
    id = fields.Integer
    author = fields.String
    text = fields.String
    created = fields.DateTime


class ThingSchema(Schema):
    id = fields.Integer
    descriptionHow = fields.String
    descriptionWhat = fields.String
    tags = fields.String(many=True)
    type = fields.Nested(TypeSchema)
    # QUESTION
    # Can this be mapped from the relationships below?
    subtypes = fields.String(many=True)


class ShareableSchema(Schema):
    id = fields.Integer
    thing = fields.Nested(ThingSchema)
    space = fields.Nested(SpaceSchema)
    time = fields.Nested(TimeSchema)
    comments = fields.Nested(CommentSchema, many=True)
    number_ratings = fields.Integer
    total_ratings = fields.Integer


'''

 * dheerajchand has quit (Quit: dheerajchand)
  * rpadn has quit (Ping timeout: 260 seconds)
 <KenFututo> So I've tried setting the key with env and also with export
 * sudon`tkode is now known as notsudon`tkode
 <henbruas> roadrunneratwast, because that's not really how you refer to a function
 <henbruas> roadrunneratwast, if you want to refer to the max function, you just type max
 <roadrunneratwast> which function is being referred to?
 * Oatmeal has quit (Quit: Suzie says, "TTFNs!")
 <roadrunneratwast> i am just doing a db migration
'''
