from marshmallow import  fields
from geoalchemy2 import Geometry, WKBElement
from sqlalchemy import func
from server import db
import json

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
        if value is None:
            return value
        else:
            if isinstance(value, Geometry):
                return {'latitude': db.session.scalar(func.ST_X(value)),
                        'longitude': db.session.scalar(func.ST_Y(value))}
            else:
                return None
