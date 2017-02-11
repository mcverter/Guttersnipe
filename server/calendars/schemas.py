# from marshmallow_jsonapi import Schema, fields
from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema
from server.calendars.models import Event, Calendar, RecurrenceRule


class CalendarSchema(ModelSchema):
    events = fields.Nested('EventSchema', many=True)

    class Meta:
      model = Calendar

class EventSchema(ModelSchema):
    recurrence_rule = fields.Nested('RecurrenceRuleSchema')

    class Meta:
      model = Event

class RecurrenceRuleSchema(ModelSchema):
    class Meta:
      model = RecurrenceRule
