from server import db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import ARRAY, array
import geoalchemy2
from server.users.models import Guttersnipe
from server.calendars.models import Schedule
from datetime import datetime
from geoalchemy2 import Geometry
####################
# Business Objects
####################
# A Shareable is a composite of a Time, a Space, and a Thing
# It can have ratings
# Users can comment upon it


class Shareable(db.Model):
  __tablename__ = 'shareable'
  id = db.Column(db.Integer, primary_key=True)

  summary = db.Column(db.Text)
  headline = db.Column(db.Text)
  notes = db.Column(db.Text)

  thing = db.relationship('Thing')
  space = db.relationship('Space')
  time = db.relationship('Time')

  thing_id = db.Column(db.Integer, db.ForeignKey('thing.id'), nullable=False)
  space_id = db.Column(db.Integer, db.ForeignKey('space.id'), nullable=False)
  time_id = db.Column(db.Integer, db.ForeignKey('time.id'), nullable=False)

  # comments
  comments = db.relationship('Comment', backref="Shareable", cascade="all, delete-orphan", lazy='dynamic')

  # ratings
  number_ratings = db.Column(db.Integer, nullable=False, default=0)
  total_ratings = db.Column(db.Integer, nullable=False, default=0)

  created_on = db.Column(db.DateTime)

  def __init__(self, thing, space, time,
               summary="", headline="", notes="",
               comments=[],
               number_ratings=0, total_ratings=0,
               created_on=None):
    self.summary = summary
    self.headline = headline
    self.notes = notes
    self.thing = thing
    self.space = space
    self.time = time
    if comments is not None:
      self.comments = comments
    self.number_ratings = number_ratings
    self.total_ratings = total_ratings
    if created_on is None:
      self.created_on = datetime.utcnow()

  def __repr__(self):
    return '<Shareable %r>' % self.id


# Thing is a Component of Shareable.
# One Thing to 1 ... Many Shareables
class Thing(db.Model):
  __tablename__ = 'thing'

  id = db.Column(db.Integer, primary_key=True)

  # Thing can have system-defined primary_type and subtypes
  # subtypes are defined by JOIN table below
  main_type_id = db.Column(db.Integer, db.ForeignKey('main_type.id'), nullable=False)
  main_type = db.relationship('MainType')
  subtypes_relation = db.relationship('Subtype', secondary='thing_subtype_association',
                                      backref=db.backref('thing', lazy='dynamic'))
  subtypes = association_proxy('subtypes_relation', 'name')

  description_how = db.Column(db.String(140))
  description_what = db.Column(db.String(140))

  # Thing can have user-defined tags
  # We are going to do this with an association table for now until we figure out how to use GIN indexes
  tag_relation = db.relationship('Tag', secondary='thing_tag_association',
                                 backref=db.backref('thing', lazy='dynamic'))
  tags = association_proxy('tag_relation', 'name')

  #    tags = db.Column(ARRAY(db.Text), default=db.cast(array([], type_=db.Text), ARRAY(db.Text)))
  #    __table_args__ = (db.Index('ix_shareable_tags', tags, postgresql_using="gin"),)

  notes = db.Column(db.Text)

  def __init__(self, main_type,
               subtypes=[],
               description_how="", description_what="",
               tags=[], notes=""):
    if tags is None:
      tags=[]
    self.description_how = description_how
    self.description_what = description_what

    self.main_type = main_type

    self.subtypes_relation.extend(subtypes)
    self.tag_relation.extend(tags)
    self.notes = notes

  def __repr__(self):
    return '<Thing %r>' % self.id


class Tag(db.Model):
  __tablename__ = 'tag'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.Text, unique=True)

  def __init__(self, name):
    self.name = name

  def __repr__(self):
    return '<MainType %r>' % self.name

thing_tag_association = db.Table(
  'thing_tag_association',
  db.Column('thing_id', db.Integer, db.ForeignKey('thing.id')),
  db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')))


# A Thing must have a MainType
# One MainType for Zero or More Things
class MainType(db.Model):
  __tablename__ = 'main_type'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.Text, unique=True)

  def __init__(self, name):
    self.name = name

  def __repr__(self):
    return '<MainType %r>' % self.name


# Type and Subtype form a 2-level Taxonomy
# {T=Car, S=Volvo}, {T=Car. S=Sedan}, {T=Animal, S=Horse}, {T=Animal, S=Female}
class Subtype(db.Model):
  __tablename__ = 'subtype'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  main_type_id = db.Column(db.Integer, db.ForeignKey('main_type.id'))
  main_type = db.relationship(MainType)

  def __init__(self, main_type, name):
    self.main_type = main_type
    self.name = name

  def __repr__(self):
    return '<Subtype %r>' % self.name

# Many-to-Many relationship between Things and Subtypes
thing_subtype_association = db.Table(
  'thing_subtype_association',
  db.Column('subtype_id', db.Integer, db.ForeignKey('subtype.id')),
  db.Column('thing_id', db.Integer, db.ForeignKey('thing.id')))

# Space is a Component of Shareable.
# A Space May Be Reused for Many Shareables
# One Thing to One or More Shareables


class Space(db.Model):
  __tablename__ = 'space'
  id = db.Column(db.Integer, primary_key=True)
#  longitude = db.Column(db.Float, nullable=False)
#  latitude = db.Column(db.Float, nullable=False)
  position = db.Column (Geometry('POINT', srid=7483))
  canonical_address = db.Column(db.Text, nullable=False)
  alternate_names = db.Column(ARRAY(db.Text))
  notes = db.Column(db.Text)

  def __init__(self, position,
               canonical_address="",
               alternate_names=[], notes=""):
    self.position = position
    self.canonical_address = canonical_address
    self.alternate_names = alternate_names
    self.notes = notes

  def __repr__(self):
    return '<Space %r>' % self.id

# Space is a Component of Shareable.  1-to-1 relationship
# A Space May Be Reused for Many Shareables
# One Thing to One or More Shareables


class Time(db.Model):
  __tablename__ = 'time'
  id = db.Column(db.Integer, primary_key=True)
  schedule_id = db.Column(db.Integer, db.ForeignKey('schedule.id'))
  schedule = db.relationship(Schedule)

  notes = db.Column(db.Text)

  def __init__(self, schedule, notes=""):
    self.schedule = schedule
    self.notes = notes

  def __repr__(self):
    return '<Time %r>' % self.id

# Users can comment on Shareables
# One Shareable for Zero or More Comments
# One User for Zero or More Comments


class Comment (db.Model):
  __tablename__ = 'comment'
  id = db.Column(db.Integer, primary_key=True)

  author = db.relationship(Guttersnipe)
  author_id = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
  shareable = db.relationship(Shareable)
  shareable_id = db.Column(db.Integer, db.ForeignKey('shareable.id'))

  text = db.Column(db.String(2054))
  created_on = db.Column(db.DateTime)

  def __init__(self, text, author, shareable, created_on=None):
    self.author = author
    self.shareable = shareable

    self.text = text

    if created_on is None:
      self.created_on = datetime.utcnow()

  def __repr__(self):
    return '<Comment %r>' % self.id


'''
 * dheerajchand
       expert on geopython
'''

