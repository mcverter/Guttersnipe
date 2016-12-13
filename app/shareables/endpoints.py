__author__ = 'mitchell'

from app import db, api
from app.shareables.models import Shareable

from flask.ext.restful import Resource, Api
from app.shareables.schemas import ShareableSchema

ShareableSerializer = ShareableSchema()

class ShareableEndpoint(Resource):
    def get(self, id):
        shareable = db.session.query_property\
            (Shareable).filter(Shareable.id == id).first()
        if shareable is None:
            data = 400
        else:
            data = ShareableSerializer.dump(shareable).data


class ShareableListEndpoint(Resource):
    def get(self):
        print("hoo haa")
        shareables = db.session.query(Shareable).all()
        results = ShareableSerializer.dump(shareables, many=True).data

class UserAPI(Resource):
    def get(self, id):
        print ('foo')

    def put(self, id):
        pass

    def delete(self, id):
        pass

api.add_resource(UserAPI, '/users/<int:id>', endpoint = 'user')

api.add_resource(ShareableListEndpoint, '/shareables', endpoint = 'shareables')

'''
from flask.ext.restful import reqparse
from flask.ext.restful import abort
from flask.ext.restful import Resource
from flask.ext.restful import fields
from flask.ext.restful import marshal_with
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError


todo_fields = {
    'id': fields.Integer,
    'task': fields.String,
    'uri': fields.Url('todo', absolute=True),
}

parser = reqparse.RequestParser()
parser.add_argument('task', type=str)

class TodoResource(Resource):
    @marshal_with(todo_fields)
    def get(self, id):
        todo = session.query(Todo).filter(Todo.id == id).first()
        if not todo:
            abort(404, message="Todo {} doesn't exist".format(id))
        return todo

    def delete(self, id):
        todo = session.query(Todo).filter(Todo.id == id).first()
        if not todo:
            abort(404, message="Todo {} doesn't exist".format(id))
        session.delete(todo)
        session.commit()
        return {}, 204

    @marshal_with(todo_fields)
    def put(self, id):
        parsed_args = parser.parse_args()
        todo = session.query(Todo).filter(Todo.id == id).first()
        todo.task = parsed_args['task']
        session.add(todo)
        session.commit()
        return todo, 201


class TodoListResource(Resource):
    @marshal_with(todo_fields)
    def get(self):
        todos = session.query(Todo).all()
        return todos

    @marshal_with(todo_fields)
    def post(self):
        parsed_args = parser.parse_args()
        todo = Todo(task=parsed_args['task'])
        session.add(todo)
        session.commit()
        return todo, 201

        '''

