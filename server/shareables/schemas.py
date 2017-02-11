from marshmallow import  fields
from server.calendars.schemas import CalendarSchema
from marshmallow_sqlalchemy import ModelSchema, ModelConverter
from server.shareables.models import Shareable, Thing, Space, Time, MainType, Subtype
from geoalchemy2 import Geometry, WKBElement
from sqlalchemy import func
from server import db
from flask import json


class BaseSchema(ModelSchema):
    class Meta:
        sqla_session = db.Session

class GeoConverter(ModelConverter):
    SQLA_TYPE_MAPPING = ModelConverter.SQLA_TYPE_MAPPING.copy()
    SQLA_TYPE_MAPPING.update({
        Geometry: fields.Str
    })


class GeometrySerializationField(fields.Field):
    def _serialize(self, value, attr, obj):
        if value is None:
            return value
        else:
            if isinstance(value, WKBElement):
                return json.dumps({"latitude": db.session.scalar(func.ST_X(value)),
                                   "longitude": db.session.scalar(func.ST_Y(value))})
            else:
                return None

    def _deserialize(self, value, attr, data):
        """Deserialize value. Concrete :class:`Field` classes should implement this method.

        :param value: The value to be deserialized.
        :param str attr: The attribute/key in `data` to be deserialized.
        :param dict data: The raw input data passed to the `Schema.load`.
        :raise ValidationError: In case of formatting or validation failure.
        :return: The deserialized value.

        .. versionchanged:: 2.0.0
            Added ``attr`` and ``data`` parameters.
        """
        if value is None:
            return value
        else:
            if isinstance(value, Geometry):
                return {'latitude': db.session.scalar(func.ST_X(value)), 'longitude': db.session.scalar(func.ST_Y(value))}
            else:
                return None



class ShareableSchema(BaseSchema):
#  space = fields.Nested('SpaceSchema')
#  comments = fields.Nested('CommentSchema', many=True)
  thing = fields.Nested('ThingSchema')
  time = fields.Nested('TimeSchema')
  space = fields.Nested('SpaceSchema')

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


'''

class TimeSchema(ModelSc):
    id = fields.Integer()
    notes = fields.String()
    calendar = fields.Nested(CalendarSchema)

class CommentSchema(Schema):
    id = fields.Integer()
    author = fields.String()
    text = fields.String()
    created = fields.DateTime()
'''
