#from marshmallow_jsonapi import Schema, fields
from marshmallow import validate, Schema, fields
from app.calendars.schemas import CalendarSchema

class ShareableSchema(Schema):
    id = fields.Integer()
    headline = fields.String()
    summary = fields.String()
    notes = fields.String()

    number_ratings = fields.Integer()
    total_ratings = fields.Integer()
    space = fields.Nested('SpaceSchema')

    class Meta:
        fields = ("id", "headline", "notes", "number_ratings", "total_ratings",
                  "space", "summary", "thing")
                #  "time",  "comments")

'''
thing = fields.Nested('ThingSchema')
time = fields.Nested('TimeSchema')
comments = fields.Nested('CommentSchema', many=True)
'''


class ThingSchema(Schema):
    id = fields.Integer()
    descriptionHow = fields.String()
    descriptionWhat = fields.String()
    notes = fields.String()
    tags = fields.String(many=True)
    main_type = fields.Nested('MainTypeSchema')
    subtypes = fields.String(many=True)

    class Meta:
        fields = ('id', 'descriptionHow', 'descriptionWhat', 'notes', 'tags', 'main_type', 'subtypes')

class MainTypeSchema(Schema):
    name = fields.String()

    class Meta:
        fields = ["name"]


class SpaceSchema(Schema):
    id = fields.Integer()
    longitude = fields.Float()
    latitude = fields.Float()
    canonical_address = fields.String()
    notes = fields.String()
    alternate_names = fields.String(many=True)

    class Meta:
        fields = ("id", "longitude", "latitude", "canonical_address", "notes", "alternate_names")


class TimeSchema(Schema):
    id = fields.Integer()
    notes = fields.String()
    calendar = fields.Nested(CalendarSchema)

    class Meta:
        fields = ("id", "notes", "calendar")


class CommentSchema(Schema):
    id = fields.Integer()
    author = fields.String()
    text = fields.String()
    created = fields.DateTime()

    class Meta:
        fields = ("id", "author", "text", "created")

