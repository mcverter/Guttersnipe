from server import db

from marshmallow import  fields
from server.calendars.schemas import CalendarSchema
from marshmallow_sqlalchemy import ModelSchema
from server.shareables.models import Shareable, Thing, Space, Time, \
  MainType, Subtype, Comment
from server.serializers.GeometrySerializationField import GeometrySerializationField

class BaseSchema(ModelSchema):
    class Meta:
        sqla_session = db.Session

class CommentSchema(BaseSchema):
  class Meta:
    model = Comment


class ShareableSchema(BaseSchema):
  thing = fields.Nested('ThingSchema')
  time = fields.Nested('TimeSchema')
  space = fields.Nested('SpaceSchema')
  comments = fields.Nested('CommentSchema', many=True)

  class Meta:
    model = Shareable


class ThingSchema(BaseSchema):
  main_type = fields.Nested('MainTypeSchema')
  subtypes = fields.String(many=True)

  class Meta:
    model = Thing

class TimeSchema(BaseSchema):
  calendar = fields.Nested(CalendarSchema)

  class Meta:
    model = Time

class SpaceSchema(BaseSchema):
  position = GeometrySerializationField(attr='position')

  class Meta:
    model = Space

class SubtypeSchema(BaseSchema):
  class Meta:
    model = Subtype

class MainTypeSchema(BaseSchema):
  name = fields.String()
  class Meta:
    model = MainType
