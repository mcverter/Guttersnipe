from server import db

# from marshmallow_jsonapi import Schema, fields
from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema
from server.calendars.models import Event, Schedule, RecurrenceRule


class BaseSchema(ModelSchema):
  class Meta:
    sqla_session = db.Session

class EventSchema(BaseSchema):
  recurrence_rule = fields.Nested('RecurrenceRuleSchema')

  class Meta:
    model = Event


class ScheduleSchema(BaseSchema):
    events = fields.Nested('EventSchema', many=True)

    class Meta:
      model = Schedule


class RecurrenceRuleSchema(BaseSchema):
    class Meta:
      model = RecurrenceRule
