__author__ = 'mitchell_verter'
from flask import Flask, current_app, render_template_string
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///'


thing_subtype = db.Table('thing_subtype',
    db.Column('thing_id', db.Integer, db.ForeignKey('thing.id')),
    db.Column('subtype_id', db.Integer, db.ForeignKey('subtype.id'))
)

class Thing(db.Model):
    __tablename__ = 'thing'
    id = db.Column(db.Integer, primary_key=True)
    type_id = db.Column(db.Integer, db.ForeignKey('type.id'))
    type = db.relationship('Type', backref='things')
    name = db.Column(db.String)
    subtypes = db.relationship('SubType', secondary=thing_subtype,
        backref=db.backref('thing', lazy='dynamic'))

    def __repr__(self):
        return self.name

class Type(db.Model):
    __tablename__ = 'type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    subtypes = db.relationship('SubType', backref='type')


class SubType(db.Model):
    __tablename__ = 'subtype'
    id = db.Column(db.Integer, primary_key=True)
    type_id = db.Column(db.Integer, db.ForeignKey('type.id'))
    name = db.Column(db.String)

    def __repr__(self):
        return self.name

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        foo = Type(name="whatever")
        apple = SubType(name='apple')
        orange = SubType(name='orange')
        cow = SubType(name='cow')
        foo.subtypes=([orange, apple, cow])
        thing = Thing(name='something', subtypes=[apple, orange, cow])
        db.session.add(thing)
        db.session.add(foo)
        db.session.commit()

        foo = Thing.query.first()
        print(foo)
        for entry in foo.subtypes:
            print(entry)

        print('--'*10)
        bar = Type.query.first()
        for entry in bar.subtypes:
            print(entry)