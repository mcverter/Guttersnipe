from app import db
from flask_restful import Resource, Api, fields, marshal_with, \
    reqparse, abort
from sqlalchemy import CheckConstraint
import icalendarModels

parser = reqparse.RequestParser()
TODOS = {
    'todo1': {'task': 'build an API'},
    'todo2': {'task': '?????'},
    'todo3': {'task': 'profit!'},
}



# A Single User has a single Profile and a single Schedule
# and has a Mailbox with multiple messages
class Guttersnipe(db.Model, Resource):
    id = db.Column(db.Integer, primary_key=True)
    profile = db.Column(db.Integer, db.ForeignKey('profile.id'))
    schedule = db.Column(db.Integer, db.ForeignKey('schedule.id'))
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
    id = db.Column(db.Integer, primary_key=True)
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
    id = db.Column(db.Integer, primary_key=True)
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
    sender = db.Column(db.Integer, db.ForeignKey('guttersnipe.id'))
    recipient = db.Column (db.Integer, db.ForeignKey('guttersnipe.id'))
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
    db.Column('blocker_id', db.Integer, db.ForeignKey('guttersnipe.id')),
    db.Column('blocked_id', db.Integer, db.ForeignKey('guttersnipe.id')))






'''

from sqlalchemy.dialects.postgresql import ARRAY, array

class Post(db.Model):
    __tablename__ = 'post'

    id = db.Column(db.Integer, primary_key=True)
    tags = db.Column(ARRAY(db.Text), nullable=False, default=db.cast(array([], type_=db.Text), ARRAY(db.Text)))
    __table_args__ = (db.Index('ix_post_tags', tags, postgresql_using="gin"), )


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





class exceptionDate(db.Model):
    exDateID Integer Identity(1, 1) Not Null
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