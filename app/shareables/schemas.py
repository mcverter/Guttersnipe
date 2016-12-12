from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from app.calendars.schemas import VeventSchema


class ShareableSchema(Schema):
    id = fields.Integer
    thing = fields.Nested('ThingSchema')
    space = fields.Nested('SpaceSchema')
    time = fields.Nested('TimeSchema')

    comments = fields.Nested('CommentSchema', many=True)

    number_ratings = fields.Integer
    total_ratings = fields.Integer


class ThingSchema(Schema):
    id = fields.Integer
    descriptionHow = fields.String
    descriptionWhat = fields.String
    tags = fields.String(many=True)
    main_type = fields.Nested(MainTypeSchema)
    subtypes = fields.String(many=True)


class MainTypeSchema(Schema):
    name = fields.String


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
    calendar = fields.Nested(CalendarSchema)


class CommentSchema(Schema):
    id = fields.Integer
    author = fields.String
    text = fields.String
    created = fields.DateTime



