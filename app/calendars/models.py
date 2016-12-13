"""
class Parent(Base):
    __tablename__ = 'parent'
    id = Column(Integer, primary_key=True)
    children = relationship("Child")

class Child(Base):
    __tablename__ = 'child'
    id = Column(Integer, primary_key=True)
    parent_id = Column(Integer, ForeignKey('parent.id'))

The following file represents Guttersnipe's implementation
of the iCalendar RFC
https://tools.ietf.org/html/rfc5545

In particular, it implements Schedules with
* Events (VEvent: https://tools.ietf.org/html/rfc5545#section-3.6.1)
* Recurrence Rules (Rrule: https://tools.ietf.org/html/rfc5545#section-3.3.10)

Events model
* Start Time
* End Time
* Timezone
* Recurrence Rule

Recurrence Rules
* Ways to Model Weekly/Monthly/Yearly repetitions
* Ways to modify the sequence of repetitions

Schedules are collections of Events.
 This allows us to indicate that a Shareable is scheduled in any manner
 For example,
    * Every week on Friday from 530-930 PM
    * The last Tuesday of every month from 200-400 PM
    * Every year on May Day all day long

"""

from app import db
from sqlalchemy import CheckConstraint


class RecurrenceRule(db.Model):
    __tablename__ = 'recurrence_rule'

    id = db.Column(db.Integer, primary_key=True)

    # Frequency Type
    freq = db.Column(db.String(8), nullable=False, default='weekly')  # type of recurrence

    # Calendar-Based Rules

    # List of Day of the Week
    # "mo,tu,we" for weekly
    # "+2MO, -1MO" = second monday, last monday for yearly or monthly
    byDay = db.Column(db.String(35))

    # List of Day of the Month eg: "+1,-1"
    # Only for Monthly or Yearly"""
    byMonthDay = db.Column(db.String(200))

    # List Day of the Year eg: "+1, -1"
    # Only for yearly
    #  Take care with leap years
    byYearDay = db.Column(db.String(3078))

    # Which week of Year "+5, -3" for fifth and third-to-last
    #  Only for yearly
    byWeekNo = db.Column(db.String(353))

    # Month of year
    byMonth = db.Column(db.String(29))

    # Sequence-Based Rules
    until = db.Column(db.DateTime)   # last day of occurence
    count = db.Column(db.Integer)    # number of occurences
    interval = db.Column(db.Integer, nullable=False, default=1)  # interval between recurrences
    bySetPos = db.Column(db.String())  # Specifies specific instances of recurrence


# Valid Values
    CheckConstraint(freq in ('yearly', 'monthly', 'weekly', 'daily', 'single'),
                    name='Valid: Frequency Value')
    CheckConstraint(interval > 0, name='Valid: Positive Interval')
    CheckConstraint(byDay is not None and freq in ('daily', 'yearly', 'monthly'))
    CheckConstraint(byWeekNo is not None and freq in ('yearly', 'monthly'))
    CheckConstraint(byYearDay is not None and freq == 'yearly')

# Until and Count may not coexist in the same rule.
    CheckConstraint(not (until is not None and count is not None),
                    name='Valid: Not Both Until and Count')

    def __init__(self, freq,
                 byDay=None, byMonthDay=None, byYearDay=None, byWeekNo=None, byMonth=None,
                 until=None, count=None, interval=None, bySetPos=None
                 ):
        self.freq = freq
        self.byDay = byDay
        self.byMonthDay = byMonthDay
        self.byYearDay = byYearDay
        self.byWeekNo = byWeekNo
        self.byMonth = byMonth
        self.until = until
        self.count = count
        self.interval = interval
        self.bySetPos = bySetPos

    def __repr__(self):
        return '<Recurrence Rule %r>' % self.id


class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    dt_start = db.Column(db.DateTime)  # start time
    dt_end = db.Column(db.DateTime)  # end time
    tz_id = db.Column(db.String)  # Time Zone
    calendar_id = db.Column(db.Integer, db.ForeignKey('calendar.id'))

    recurrence_rule_id = db.Column(db.Integer, db.ForeignKey('recurrence_rule.id'))
    recurrence_rule = db.relationship(RecurrenceRule)



# Start date must come before End date
    CheckConstraint('dtEnd is NULL OR dtStart <= dtEnd', name='Valid: Time Period')

    def __init__(self, dt_start, dt_end, tz_id, recurrence_rule):
        self.dt_start = dt_start
        self.dt_end = dt_end
        self.tz_id = tz_id
        self.recurrence_rule = recurrence_rule


calendar_event_association = db.Table(
    'calendar_event_association',
    db.Column('calendar_id', db.Integer, db.ForeignKey('calendar.id')),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id')))

class Calendar(db.Model):
    __tablename__ = 'calendar'
    id = db.Column(db.Integer, primary_key=True)
    events = db.relationship('Event')

    def __init__(self, events=None):
        self.events.extend(events)

    def __repr__(self):
        return '<Calendar %r>' % self.id
