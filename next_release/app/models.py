from app import db

class Guttersnipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    profile = db.Column(db.Integer, db.ForeignKey('profile.id'))
    schedule = db.Column(db.Integer, db.ForeignKey('profile.id'))
    is_admin = db.Column(db.Boolean)
    created = db.Column(db.DateTime)
    expiration = db.Column(db.DateTime)



class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(20), unique=True)
    full_name = db.Column(db.String(20), unique=True)
    password= db.Column(db.String(20), unique=True)
    additional_info = db.Column(db.String(20), unique=True)

    def __repr__(self):
        return '<User %r>' % (self.nickname)

class Schedule (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calendar: sCalendar_VEVENT
    notes = db.Column(db.String(20))




class Shareable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comments = db.relationship('Post', backref='author', lazy='dynamic')
    thing_id = db.Column(db.Integer, db.ForeignKey('thing.id'))
    space_id = db.Column(db.Integer, db.ForeignKey('space.id'))
    time_id = db.Column(db.Integer, db.ForeignKey('time.id'))
    number_ratings = db.Column(db.Integer)
    id = db.Column(db.Integer, primary_key=True)
	total_ratings = db.Column(db.Integer)

    def __repr__(self):
        return '<User %r>' % (self.nickname)

class Thing(db.Model):
    type = ENUM
    subtypes = String []
    descriptionHow = db.Column(db.String(140))
    descriptionWhat = db.Column(db.String(140))
    tags = StringArray []

class Place(db.Model):
    longditude = db.Column(db.Double)
    latitude = db.Column(db.Double)
    canonical_address = db.Column(db.String(140))
    alternate_names = String[]
    notes = db.Column(db.String(2054))

class Time(db.Model):
    calendar = sCalendar_VEVENT
    notes = db.Column(db.String(2054))

class TagTable(db.Model):
    tag = db.Column(db.String(140))


class BlockUser(db.Model):
    blocker = db.relationship('Guttersnipe')
    blocked = db.relationship('Guttersnipe')

class Messages(db.Model):
    calendar: iCalendar
    text = db.Column(db.String(2054))
    sender = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    recipient = db.Column (db.Integer, db.ForeignKey('guttersnipe.id'))
    sent =  db.Column(db.DateTime)

class Comment (db.Model):
    author = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    shareable = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    text  = db.Column(db.String(2054))
    created  =  db.Column(db.DateTime)

'''
-- One table for each event.  An event may have multiple rRules.
Create Table [vEvent]
    (vEventID Integer Identity(1, 1) Not Null
     Constraint [vEvent.pk]
     Primary Key
     Clustered
    ,title nVarChar(200) Not Null);

-- One table for rRules.
-- My application does NOT support the "bySetPos" rule, so that is not included.
Create Table [rRule]
    (rRuleID Integer Identity(1, 1) Not Null
     Constraint [rRule.pk]
     Primary Key
     Clustered
    ,vEventID Integer Not Null
     Constraint [fk.vEvent.rRules]
     Foreign Key
     References [vEvent] (vEventID)
     On Update Cascade
     On Delete Cascade
    ,[class]            varChar(  12) Not Null Default('public')
    ,[created]         DateTime       Not Null Default(getUTCDate())
    ,[description]     nVarChar(max)      Null
    ,[dtStart]         DateTime       Not Null
    ,[dtEnd]           DateTime           Null
    ,[duration]         varChar(  20)     Null
    ,[geoLat]          Float              Null
    ,[geoLng]          Float              Null
    ,[lastModified]    DateTime       Not Null Default(getUTCDate())
    ,[location]        nVarChar(max)      Null
    ,[organizerCN]     nVarChar(  50)     Null
    ,[organizerMailTo] nVarChar( 100)     Null
    ,[seq]             Integer        Not Null Default(0)
    ,[status]           varChar(   9) Not Null Default('confirmed')
    ,[summary]         nVarChar(  75)     Null
    ,[transparent]     Bit            Not Null Default(0)
    ,[freq]             varChar(   8) Not Null Default('daily')
    ,[until]           DateTime           Null
    ,[count]           Integer            Null
    ,[interval]        Integer        Not Null Default(1)
    ,[bySecond]         varChar( 170)     Null
    ,[byMinute]         varChar( 170)     Null
    ,[byHour]           varChar(  61)     Null
    ,[byDay]            varChar(  35)     Null
    ,[byMonthDay]       varChar( 200)     Null
    ,[byYearDay]        varChar(3078)     Null
    ,[byWeekNo]         varChar( 353)     Null
    ,[byMonth]          varChar(  29)     Null
    ,[wkSt]             Char   (   2)     Null Default('mo'));

-- Class must be one of "Confidential", "Private", or "Public"
Alter Table [rRule]
Add Constraint [rRule.ck.Class]
Check ([class] In ('confidential', 'private', 'public'));

-- Start date must come before End date
Alter Table [rRule]
Add Constraint [rRule.ck.dtStart]
Check ([dtEnd] Is Null Or [dtStart] <= [dtEnd]);

-- dtEnd and duration may not both be present
Alter Table [rRule]
Add Constraint [rRule.ck.duration]
Check (Not ([dtEnd] Is Not Null And [duration] Is Not Null));

-- Check valid values for [freq]. Note that 'single' is NOT in the RFC;
-- it is an optimization for my particular iCalendar calculation engine.
-- I use it as a clue that this pattern has only a single date (dtStart),
-- and there is no need to perform extra calculations on it.
Alter Table [rRule]
Add Constraint [rRule.ck.freq]
Check ([freq] In
    ('yearly'
    ,'monthly'
    ,'weekly'
    ,'daily'
    ,'hourly'
    ,'minutely'
    ,'secondly'
    ,'single')); -- Single is NOT part of the spec!

-- If there is a latitude, there must be a longitude, and vice versa.
Alter Table [rRule]
Add Constraint [rRule.ck.geo]
Check (([geoLat] Is Null And [geoLng] Is Null)
       Or ([geoLat] Is Not Null And [geoLng] Is Not Null));

-- Interval must be positive.
Alter Table [rRule]
Add Constraint [rRule.ck.interval]
Check ([interval] > 0);

-- Status has a set of defined values.
Alter Table [rRule]
Add Constraint [rRule.ck.status]
Check ([status] In ('cancelled', 'confirmed', 'tentative'));

-- Until and Count may not coexist in the same rule.
Alter Table [rRule]
Add Constraint [rRule.ck.until and count]
Check (Not ([until] Is Not Null And [count] Is Not Null));


-- One table for exceptions to rRules.  In my application, this covers both
-- exDate and rDate.  I do NOT support extended rule logic here;  The RFC says
-- you should support the same sort of date calculations here as are supported
-- in rRules: exceptions can recur, etc.  I don't do that; mine is simply a
-- set of dates that are either "exceptions" (dates which don't appear, even
-- if the rule otherwise says they should) or "extras" (dates which do appear,
-- even if the rule otherwise wouldn't include them).  This has proved
-- sufficient for my application, and something that can be exported into a
-- valid iCalendar file--even if I can't import an iCalendar file that makes
-- use of recurring rules for exceptions to recurring rules.
Create Table [exDate]
    (exDateID Integer Identity(1, 1) Not Null
     Constraint [exDate.pk]
     Primary Key
     Clustered
    ,rRuleID Integer Not Null
     Constraint [fk.rRule.exDates]
     Foreign Key
     References [rRule] (rRuleID)
     On Update Cascade
     On Delete Cascade
    ,[date] DateTime Not Null
    ,[type] varChar(6) Not Null);  -- Type = "exDate" or "rDate" for me; YMMV.
    '''

