from server import db, api
from server.shareables.models import Shareable
from flask import Blueprint, request, jsonify, make_response
from flask.ext.restful import Resource, Api, abort
from server.shareables.schemas import\
  ShareableSchema
  #, ThingSchema, TimeSchema, SpaceSchema, MainTypeSchema
import json
from server.calendars.models import Event, Calendar, RecurrenceRule
from server.shareables.models import Shareable, Thing, Space, \
    Time, MainType, Subtype, Tag
from datetime import datetime
from server import db
from server.shareables.create_shareable_from_json import create_shareable_from_json_object

from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError

#shareables = Blueprint('shareables', __name__)
#ThingSerializer = ThingSchema()
#TimeSerializer = TimeSchema()
ShareableSerializer = ShareableSchema()
#SpaceSerializer = SpaceSchema()
#MainTypeSerializer = MainTypeSchema()

class ShareableCategorizationEndpoint(Resource):
  def get(self):
    subtypes = Subtype.query.all()
    types_and_subtypes = {}
    for sub in subtypes:
      subname = sub.name
      typename = sub.main_type.name
      if typename not in types_and_subtypes:
        types_and_subtypes[typename] = []
      types_and_subtypes[typename].extend([subname])
    types_and_subtypes["tags"] = [tag.name for tag in Tag.query.all()]
    return types_and_subtypes;


class ShareableEndpoint(Resource):
    def get(self, id):
        query = Shareable.query.get_or_404(id)
        result = ShareableSerializer.dump(query).data
        return result


    def delete(self, id):
        shareable = Shareable.query.get_or_404(id)
        try:
            delete = shareable.delete(shareable)
            response = make_response()
            response.status_code = 204
            return response

        except SQLAlchemyError as e:
                db.session.rollback()
                resp = jsonify({"error": str(e)})
                resp.status_code = 401
                return resp


'''
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
        query = Shareable.query.all()
        results = ShareableSerializer.dump(query, many=True).data
        return results


    def post(self):
        raw_dict = request.get_json() or json.loads(request.data) \
            if isinstance(request.data, str) else json.loads(request.data.decode('utf-8'))
        try:
            shareable = create_shareable_from_json_object(raw_dict)
            query = Shareable.query.get(shareable.id)
            results = ShareableSerializer.dump(query).data
            return results, 201

        except ValidationError as err:
                resp = jsonify({"error": err.messages})
                resp.status_code = 403
                return resp

        except SQLAlchemyError as e:
                db.session.rollback()
                resp = jsonify({"error": str(e)})
                resp.status_code = 403
                return resp

api.add_resource(ShareableListEndpoint, '/api/shareables', endpoint = 'shareables')
api.add_resource(ShareableEndpoint, '/api/shareable/<int:id>', endpoint = 'shareable')
api.add_resource(ShareableCategorizationEndpoint, '/api/shareables/categorization', endpoint = 'categorization')

'''
                ShareableSerializer.validate(raw_dict)
                shareable_dict = raw_dict['data']['attributes']
                shareable = Shareable(shareable_dict['email'], shareable_dict['name'],shareable_dict['is_active'])
'''

'''
    def post(self):
        parsed_args = parser.parse_args()
        return "you hit post"
        pass

    def post(self):
        parsed_args = parser.parse_args()
        todo = Todo(task=parsed_args['task'])
        session.add(todo)
        session.commit()
        return todo, 201
'''
