from app import db
from sqlalchemy import CheckConstraint
import datetime

class Vevent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.String(200)
    
class Rrule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vevent_id = db.Column('vevent_id', db.Integer, db.ForeignKey('vevent.id'),
                          nullable=False)
    privacyLevel = db.Column(db.String(12), nullable=False, default='public')
    created = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)
    description = db.Column(db.Text, nullable=True)
    dtStart = db.Column(db.DateTime, nullable=False)
    dtEnd = db.Column(db.DateTime)
    duration = db.Column(db.String(20))
    geoLat = db.Column(db.Float)
    geoLng = db.Column(db.Float)
    lastModified = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)
    location = db.Column(db.Text)
    organizerCN = db.Column(db.String(50))
    organizerMailTo = db.Column(db.String(100))
    seq = db.Column(db.Integer, nullable=False, default=0)
    status = db.Column(db.String(9), nullable=False, default='confirmed')
    summary = db.Column(db.String(75))
    transparent = db.Column(db.Boolean, nullable=False, default=0)
    freq = db.Column(db.String(8), nullable=False, default='daily')
    until = db.Column(db.DateTime)
    count = db.Column(db.Integer)
    interval = db.Column(db.Integer, nullable=False, default=1)
    bySecond = db.Column(db.String(170))
    byMinute = db.Column(db.String(170))
    byHour = db.Column(db.String(61))
    byDay = db.Column(db.String(35))
    byMonthDay = db.Column(db.String(200))
    byYearDay = db.Column(db.String(3078))
    byWeekNo = db.Column(db.String(353))
    byMonth = db.Column(db.String(29))
    wkSt = db.Column(db.String(2), default='mo')

# Valid Values
    CheckConstraint("privacyLevel in ('confidential', 'private', 'public')",\
                    name="Valid: Privacy Value")
    CheckConstraint(freq in ('yearly', 'monthly', 'weekly', 'daily'
    ,'hourly', 'minutely', 'secondly', 'single'),
                    name='Valid: Frequency Value')
    CheckConstraint(status in ('cancelled', 'confirmed', 'tentative'),
                    name='Valid: Status Value')
    CheckConstraint(interval > 0,
                    name='Valid: Positive Interval')

# Start date must come before End date
    CheckConstraint('dtEnd is NULL OR dtStart <= dtEnd',
                    name='Valid: Time Period')

# Until and Count may not coexist in the same rule.
    CheckConstraint(not (until is not None and count is not None),
                    name='Valid: Not Both Until and Count')

#dtEnd and duration may not both be present
    CheckConstraint('NOT(dtEnd is NOT NULL AND duration is NOT NULL)',
                    name='Valid: Not Both dtEnd and Duration')



