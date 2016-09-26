from app import db

class Guttersnipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(20), unique=True)
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    profile = Profilelnfo
    schedule = iCalendar_VEVENT
    expiration = Date
    created = Date
    is_admin = Boolean

    def __repr__(self):
        return '<User %r>' % (self.nickname)

class Profile(db.Model):
    guttersnipe: Guttersnipe
    expiration: Date
    name: String
    email: Email
    password: String
    additional_info: String
	created: Date

class Schedule (db.Model):
    calendar: sCalendar_VEVENT
    notes: String



class Shareable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(20), index=True, unique=True)
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    thing = Thing
    space = Space
    time = Time
	number_ratings = int
	total_ratings =  int

    def __repr__(self):
        return '<User %r>' % (self.nicknam

class Thing(db.Model):
    type = ENUM
    subtypes = String []
    descriptionHow = String
    descriptionWhat = String
    tags = StringArray []

class Thing(db.Model):
    longditude = Double
    latitude = Double
    canonical Address = String
    alternate Ñames = String[]
    notes = String

class Time(db.Model):
    calendar = sCalendar_VEVENT
    notes = String

class BlockUser(db.Model):
    blocker = UserWarning
    blocked = UnboundLocalError

class Messages(db.Model):
    calendar: iCalendar
    text: String
    sender: Guttersnipe
    recipient: Guttersnipe []
    date: Date

class Comment (db.Model):
    author: Guttersnipe
    shareable: Shareable
    text: String
    created: Date






class Post(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    body = db.Column(db.String(140))
    timestamp = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<User %r>' % (self.body)




