from marshmallow_jsonapi import Schema, fields
from marshmallow import validate
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError

db = SQLAlchemy()


class CRUD():   

    def add(self, resource):
        db.session.add(resource)
        return db.session.commit()   

    def update(self):
        return db.session.commit()

    def delete(self, resource):
        db.session.delete(resource)
        return db.session.commit()

class Users(db.Model, CRUD):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True, nullable=False)   
    name = db.Column(db.String(250), nullable=False)
    creation_time = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)
    is_active = db.Column(db.Boolean, server_default="false", nullable=False)

    def __init__(self,  email,  name, is_active):

        self.email = email
        self.name = name
        self.is_active = is_active
      
           
class UsersSchema(Schema):

    not_blank = validate.Length(min=1, error='Field cannot be blank')
    id = fields.Integer(dump_only=True)
    email = fields.Email(validate=not_blank)    
    name = fields.String(validate=not_blank)
    is_active = fields.Boolean()
 
    
     #self links
    def get_top_level_links(self, data, many):
        if many:
            self_link = "/users/"
        else:
            self_link = "/users/{}".format(data['id'])
        return {'self': self_link}
   
    
    class Meta:
        type_ = 'users'
        