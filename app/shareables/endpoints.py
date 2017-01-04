__author__ = 'mitchell'
from app import db, api
from app.shareables.models import Shareable

from flask.ext.restful import Resource, Api, abort
from app.shareables.schemas import ShareableSchema

ShareableSerializer = ShareableSchema()

class ShareableEndpoint(Resource):
    def get(self, id):
        shareable = db.session.query(Shareable)\
            .filter(Shareable.id == id).first()
        if not shareable:
            abort(404, message="Shareable {} doesn't exist".format(id))
        else:
            return ShareableSerializer.dump(shareable).data

    def delete(self, id):
        shareable = db.session.query(Shareable)\
            .filter(Shareable.id == id).first()
        if not shareable:
            abort(404, message="Shareabele {} doesn't exist".format(id))
        db.session.delete(shareable)
        db.session.commit()
        return {}, 204

'''
    def put(self, id):
        parsed_args = parser.parse_args()
        todo = session.query(Todo).filter(Todo.id == id).first()
        todo.task = parsed_args['task']
        session.add(todo)
        session.commit()
        return todo, 201
'''


class ShareableListEndpoint(Resource):
    def get(self):
        shareables = db.session.query(Shareable).all()
        results = ShareableSerializer.dump(shareables, many=True).data
        return results
'''
    def post(self):
        parsed_args = parser.parse_args()
        todo = Todo(task=parsed_args['task'])
        session.add(todo)
        session.commit()
        return todo, 201
'''
api.add_resource(ShareableListEndpoint, '/shareables', endpoint = 'shareables')
api.add_resource(ShareableEndpoint, '/shareable/<int:id>', endpoint = 'shareable')
