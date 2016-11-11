from app import db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.dialects.postgresql import ARRAY, array
import geoalchemy2
from app.users.models import Guttersnipe
from app.schedules.models import Schedule
from app.base.models import CRUD_Base


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

    thing = db.relationship('Thing')
    space = db.relationship('Space')
    time = db.relationship('Time')

    # comments
    comments = db.relationship('Comment', backref="Shareable", cascade="all, delete-orphan", lazy='dynamic')

    # ratings
    number_ratings = db.Column(db.Integer, nullable=False)
    total_ratings = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Shareable %r>' % (self.id)

# Thing is a Component of Shareable.
# One Thing to 1 ... Many Shareables
class Thing(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description_how = db.Column(db.String(140))
    description_what = db.Column(db.String(140))

    # Thing can have user-defined tags
    tags = db.Column(ARRAY(db.Text), nullable=False, default=db.cast(array([], type_=db.Text), ARRAY(db.Text)))
    __table_args__ = (db.Index('ix_shareable_tags', tags, postgresql_using="gin"),)

    # Thing can have system-defined primary_type and subtypes
    # subtypes are defined by JOIN table below
    main_type_id = db.Column(db.Integer, db.ForeignKey('main_type.id'), nullable=False)
    main_type = db.relationship(MainType)
    subtypes_relation = db.relationship('SubType', secondary=thing_subtype_association,
        backref=db.backref('thing', lazy='dynamic'))
    subtypes = association_proxy(subtypes_relation, 'name')




# A Thing must have a MainType
# One MainType for Zero or More Things
class MainType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, primary_key=True)


# Type and Subtype form a 2-level Taxonomy
# {T=Car, S=Volvo}, {T=Car. S=Sedan}, {T=Animal, S=Horse}, {T=Animal, S=Female}
class Subtype(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    main_type_id = db.Column(db.Integer, db.ForeignKey('main_type.id'))
    main_type = db.relationship(MainType)

# Many-to-Many relationship between Things and Subtypes
thing_subtype_association = db.Table(
    'thing_subtype_association',
    db.Column('subtype_id', db.Integer, db.ForeignKey('subtype.id')),
    db.Column('thing_id', db.Integer, db.ForeignKey('thing.id')))

# Space is a Component of Shareable.
# A Space May Be Reused for Many Shareables
# One Thing to One or More Shareables
class Space(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    longitude = db.Column(db.Float, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    canonical_address = db.Column(db.Text, nullable=False)
    alternate_names = db.Column(ARRAY(db.Text))
    notes = db.Column(db.Text)

# Space is a Component of Shareable.  1-to-1 relationship
# A Space May Be Reused for Many Shareables
# One Thing to One or More Shareables
class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calendar = db.Column(db.Integer, db.ForeignKey('Schedule.id'))
    notes = db.Column(db.Text)


# Users can comment on Shareables
# One Shareable for Zero or More Comments
# One User for Zero or More Comments
class Comment (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    shareable_id = db.Column(db.Integer, db.ForeignKey('shareable.id'))
    author = db.relationship(Guttersnipe)
    text = db.Column(db.String(2054))
    created = db.Column(db.DateTime)



'''

 * dheerajchand
       expert on geopython
'''
