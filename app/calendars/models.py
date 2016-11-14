"""
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
from sqlalchemy.ext.associationproxy import association_proxy

calendar_event_association = db.Table(
    'calendar_event_association',
    db.Column('calendar_id', db.Integer, db.ForeignKey('calendar.id')),
    db.Column('event_id', db.Integer, db.ForeignKey('event.id')))

class Calendar(db.Model):
    __tablename__ = 'calendar'
    id = db.Column(db.Integer, primary_key=True)
    subtypes_relation = db.relationship('Event', secondary=calendar_event_association,
                                        backref=db.backref('calendar', lazy='dynamic'))


class RecurrenceRule(db.Model):
    __tablename__ = 'recurrence_rule'

    id = db.Column(db.Integer, primary_key=True)

    # Frequency Type
    freq = db.Column(db.String(8), nullable=False, default='weekly') # type of recurrence

    # Calendar-Based Rules
    byDay = db.Column(db.String(35))   # List of Day of the Week
                                        # "mo,tu,we" for weekly
                                        # "+2MO, -1MO" = second monday, last monday for yearly or monthly
    byMonthDay = db.Column(db.String(200)) # List of Day of the Month
                                            # +1,-1"
                                            # Only for Monthly or Yearly
    byYearDay = db.Column(db.String(3078)) # List Day of the Year
                                            #"+1, -1"
                                            # Only for yearly
                                            # Take care with leap years
    byWeekNo = db.Column(db.String(353)) # Which week of Month
                                            # "+5, -3" for fifth and third-to-last
                                            # Only for yearly
    byMonth = db.Column(db.String(29))   # Month of year.

    # Sequence-Based Rules
    until = db.Column(db.DateTime)   # last day of occurence
    count = db.Column(db.Integer)    # number of occurences
    interval = db.Column(db.Integer, nullable=False, default=1) # interval between recurrences
    bysetpos = db.Column(db.String()) # Specifies specific instances of recurrence


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




class Event(db.Model):
    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    dt_start = db.Column(db.DateTime)  # start time
    dt_end = db.Column(db.DateTime) # end time
    tz_id = db.Column(db.String) # Time Zone

    recurrence_rule_id = db.Column(db.Integer, db.ForeignKey('recurrence_rule.id'))

# Start date must come before End date
    CheckConstraint('dtEnd is NULL OR dtStart <= dtEnd', name='Valid: Time Period')
