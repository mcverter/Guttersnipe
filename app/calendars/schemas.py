# from marshmallow_jsonapi import Schema, fields
from marshmallow import validate, Schema, fields
from app.calendars.models import Event


class CalendarSchema(Schema):
    events = fields.Nested('EventSchema', many=True)

class EventSchema(Schema):
    dt_start = fields.DateTime()
    dt_end = fields.DateTime()
    tz_id = fields.String()
#    recurrence_rule = fields.Nested('RecurrenceRuleSchema')

class RecurrenceRuleSchema(Schema):
    freq = fields.String()
    byDay = fields.String()
    byMonthDay = fields.String()
    byYearDay = fields.String()
    byWeekNo = fields.String()
    byMonth = fields.String()
    until = fields.String()
    count = fields.String()
    interval = fields.String()
    bySetPos = fields.String()
