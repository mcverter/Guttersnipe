from app import db
from sqlalchemy import CheckConstraint
import datetime

class Vevent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dt_start = db.Column(db.DateTime)  # start time
    dt_end = db.Column(db.DateTime) # end time
    tz_id = db.Column(db.String) # Time Zone

    rrule = db.Column('rrule_id',  db.Integer, db.ForeignKey('rrule.id'))

# Start date must come before End date
    CheckConstraint('dtEnd is NULL OR dtStart <= dtEnd',
                    name='Valid: Time Period')



class Rrule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    duration = db.Column(db.String(20)) # length of event
    seq = db.Column(db.Integer, nullable=False, default=0)
    freq = db.Column(db.String(8), nullable=False, default='daily') # type of recurrence
    until = db.Column(db.DateTime)   # last day of occurence
    count = db.Column(db.Integer)    # number of occurences
    interval = db.Column(db.Integer, nullable=False, default=1)
    byHour = db.Column(db.String(61))
    byDay = db.Column(db.String(2))   # Day of the Week
    byMonthDay = db.Column(db.String(200)) # Day of the Month
    byYearDay = db.Column(db.String(3078)) # Day of the Year
    byWeekNo = db.Column(db.String(353)) # Which week of Month
    byMonth = db.Column(db.String(29))
    wkSt = db.Column(db.String(2), default='mo')

# Valid Values
    CheckConstraint(freq in ('yearly', 'monthly', 'weekly', 'daily',
                             'hourly', 'minutely', 'secondly', 'single'),
                    name='Valid: Frequency Value')
    CheckConstraint(interval > 0,
                    name='Valid: Positive Interval')

    CheckConstraint(wkSt in ('mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'))

# Until and Count may not coexist in the same rule.
    CheckConstraint(not (until is not None and count is not None),
                    name='Valid: Not Both Until and Count')



