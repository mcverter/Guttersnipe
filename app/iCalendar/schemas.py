from marshmallow_jsonapi import Schema, fields
from marshmallow import validate

class VeventSchema(Schema):
    id = fields.Integer
