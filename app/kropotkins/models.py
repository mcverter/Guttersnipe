from app import db


class Kropotkin (db.Model):
    id = db.Column(db.Integer)
    quote = db.Column(db.String)