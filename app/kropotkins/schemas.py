from app.kropotkins.models import Kropotkin
from marshmallow_jsonapi import Schema, fields
from marshmallow import validate


class KropotkinSchema(Schema):
    id = fields.Integer
    quote = fields.String  