#from marshmallow_jsonapi import Schema, fields
from marshmallow import validate, Schema, fields
from server.calendars.schemas import CalendarSchema

class ShareableSchema(Schema):
    id = fields.Integer()
    headline = fields.String()
    summary = fields.String()
    notes = fields.String()

    number_ratings = fields.Integer()
    total_ratings = fields.Integer()
    space = fields.Nested('SpaceSchema')
    comments = fields.Nested('CommentSchema', many=True)
    thing = fields.Nested('ThingSchema')
    time = fields.Nested('TimeSchema')



class ThingSchema(Schema):
    id = fields.Integer()
    descriptionHow = fields.String()
    descriptionWhat = fields.String()
    notes = fields.String()
    tags = fields.String(many=True)
    main_type = fields.Nested('MainTypeSchema')
    subtypes = fields.String(many=True)

class MainTypeSchema(Schema):
    name = fields.String()



class SpaceSchema(Schema):
    id = fields.Integer()
    longitude = fields.Float()
    latitude = fields.Float()
    canonical_address = fields.String()
    notes = fields.String()
    alternate_names = fields.String(many=True)

class TimeSchema(Schema):
    id = fields.Integer()
    notes = fields.String()
    calendar = fields.Nested(CalendarSchema)

class CommentSchema(Schema):
    id = fields.Integer()
    author = fields.String()
    text = fields.String()
    created = fields.DateTime()
