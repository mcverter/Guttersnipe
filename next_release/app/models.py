from app import db
from flask_restful import Resource, Api, fields, marshal_with, \
    reqparse, abort

parser = reqparse.RequestParser()
TODOS = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '?????'},
    'todo3': {'task': 'profit!'},
}



# A Single User has a single Profile and a single Schedule
# and has a Mailbox with multiple messages
class Guttersnipe(db.Model, Resource):
    id = db.Column(db.db.Integer, primary_key=True)
    profile = db.Column(db.db.Integer, db.ForeignKey('profile.id'))
    schedule = db.Column(db.db.Integer, db.ForeignKey('schedule.id'))
    is_admin = db.Column(db.Boolean)
    created_on = db.Column(db.DateTime)
    expiration_date = db.Column(db.DateTime)

    def get(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201




# Profile is a Component of Guttersnipe.  1-to-1 relationship
class Profile(db.Model, Resource):
    id = db.Column(db.db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(20), unique=True)
    full_name = db.Column(db.String(20), unique=True)
    password = db.Column(db.String(20), unique=True)
    additional_info = db.Column(db.String(20), unique=True)

    def get(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201


    def __repr__(self):
        return '<User %r>' % (self.nickname)

# Schedule is a Component of Guttersnipe.  1-to-1 relationship
class Schedule (db.Model, Resource):
    id = db.Column(db.db.Integer, primary_key=True)
    calendar = db.Column(db.DateTime) #sCalendar_VEVENT
    notes = db.Column(db.String(20))


    def get(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201


# User has Mailbox of Messages.
class Messages(db.Model, Resource):
    calendar = db.Column(db.DateTime) #sCalendar_VEVENT
    text = db.Column(db.String(2054))
    sender = db.Column(db.db.Integer, db.ForeignKey('guttersnipe.id'))
    recipient = db.Column (db.db.Integer, db.ForeignKey('guttersnipe.id'))
    sent =  db.Column(db.DateTime)

    def get(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        return TODOS[todo_id]

    def delete(self, todo_id):
        #abort_if_todo_doesnt_exist(todo_id)
        del TODOS[todo_id]
        return '', 204

    def put(self, todo_id):
        args = parser.parse_args()
        task = {'task': args['task']}
        TODOS[todo_id] = task
        return task, 201

class TodoList:
    def get(self):
        return TODOS

    def post(self):
        args = parser.parse_args()
        todo_id = int(max(TODOS.keys()).lstrip('todo')) + 1
        todo_id = 'todo%i' % todo_id
        TODOS[todo_id] = {'task': args['task']}
        return TODOS[todo_id], 201

# User can block another user
#class BlockUser(db.Model):
blockUserTable = db.Table(
    'followers',
    db.Column('blocker_id', db.db.Integer, db.ForeignKey('guttersnipe.id')),
    db.Column('blocked_id', db.db.Integer, db.ForeignKey('guttersnipe.id')))

class Vevent(db.Model):
    id = db.Column(db.db.Integer, primary_key=True)
    title = db.String(200)
    
class Rrules(db.Model):
    id = db.Column(db.db.Integer, primary_key=True)
    vevent_id = db.Column('vevent_id', db.db.Integer, db.ForeignKey('vevent.id'))
    created = db.Column(db.db.DateTime)
    description = db.Column(db.String(max))
    dtStart = db.Column(db.DateTime)
    dtEnd = db.Column(db.DateTime)
    duration = db.Column(db.String(20))
    geoLat = db.Column(db.Float)
    geoLng = db.Column(db.Float)
    lastModified = db.Column(db.DateTime)
    location = db.Column(db.String(max))
    organizerCN = db.Column(db.String(50))
    organizerMailTo = db.Column(db.String(100))
    seq = db.Column(db.Integer)
    status = db.Column(db.String(9))
    summary = db.Column(db.String(75))
    transparent = db.Column(db.Boolean)
    freq = db.Column(db.String(8))
    until = db.Column(db.DateTime)
    count = db.Column(db.Integer)
    interval = db.Column(db.Integer)
    bySecond = db.Column(db.String(170))
    byMinute = db.Column(db.String(170))
    byHour = db.Column(db.String(61))
    byDay = db.Column(db.String(35))
    byMonthDay = db.Column(db.String(200))
    byYearDay = db.Column(db.String(3078))
    byWeekNo = db.Column(db.String(353))
    byMonth = db.Column(db.String(29))
    wkSt = db.Column(db.String(2))
    
'''
-- One table for each event.  An event may have multiple rRules.
Create Table [vEvent]
    (vEventID db.Integer Identity(1, 1)
     Constraint [vEvent.pk = db.Column(Primary Key
     Clustered
    ,title db.String(200));

-- One table for rRules.
-- My application does NOT support the "bySetPos" rule, so that is not included.
Create Table [rRule]
    (rRuleID db.Integer Identity(1, 1)
     Constraint [rRule.pk]
     Primary Key
     Clustered
    ,vEventID db.Integer
     Constraint [fk.vEvent.rRules]
     Foreign Key
     References [vEvent] (vEventID)
     On Update Cascade
     On Delete Cascade
    class]            db.String(12))
    created]         DateTime)
    description]     db.String(max)
    dtStart]         DateTime
    dtEnd]           DateTime
    duration]         db.String(20))
    geoLat]          db.Float)
    geoLng]          db.Float)
    lastModified]    DateTime)
    location]        db.String(max)
    organizerCN]     db.String(50))
    organizerMailTo] db.String(100))
    seq]             db.Integer)
    status]           db.String(9))
    summary]         db.String(75))
    transparent]     Bit)
    freq]             db.String(8))
    until]           DateTime
    count]           db.Integer
    interval]        db.Integer)
    bySecond]         db.String(170))
    byMinute]         db.String(170))
    byHour]           db.String(61))
    byDay]            db.String(35))
    byMonthDay]       db.String(200))
    byYearDay]        db.String(3078))
    byWeekNo]         db.String(353))
    byMonth]          db.String(29))
    wkSt]             Char   (   2))

-- Class must be one of "Confidential", "Private", or "Public"
Alter Table [rRule]
Add Constraint [rRule.ck.Class]
Check ([class] In ('confidential', 'private', 'public'));

-- Start date must come before End date
Alter Table [rRule]
Add Constraint [rRule.ck.dtStart]
Check ([dtEnd] Is Or [dtStart] <= [dtEnd]);

-- dtEnd and duration may not both be present
Alter Table [rRule]
Add Constraint [rRule.ck.duration]
Check (Not ([dtEnd] Is And [duration] Is));

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
Check (([geoLat] Is And [geoLng] Is)
       Or ([geoLat] Is And [geoLng] Is));

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
Check (Not ([until] Is And [count] Is));


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
    (exDateID db.Integer Identity(1, 1)
     Constraint [exDate.pk]
     Primary Key
     Clustered
    ,rRuleID db.Integer
     Constraint [fk.rRule.exDates]
     Foreign Key
     References [rRule] (rRuleID)
     On Update Cascade
     On Delete Cascade
    date] DateTime
    type] db.String(6));  -- Type = "exDate" or "rDate" for me; YMMV.
    '''

