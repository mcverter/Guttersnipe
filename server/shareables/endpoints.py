import json

from server import db, api
from flask import Blueprint, request, jsonify, make_response
from flask.ext.restful import Resource, Api, abort
from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError
from server.shareables.schemas import ShareableSchema
from server.shareables.models import Shareable, Subtype, Tag
from server.shareables.create_shareable_from_json import create_shareable_from_json_object


ShareableSerializer = ShareableSchema()

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

class ShareableSearchEndpoint(Resource):
  def post(self, id ):
    search_params = request.get_json() or json.loads(request.data) \
      if isinstance(request.data, str) else json.loads(request.data.decode('utf-8'))
    # extract the params
    longitude = None
    latitude = None
    distance = None
    type_name = None
    subtype_list = None
    tag_list = None
    date_input = None

    # find IDS from database
    # SELECT(search_3(type_name: = 'food'))
    query_string = "SELECT(search_shareable_combine_filters(" +\
                   "longditude := " + longitude + \
                   ", latitude := " + latitude + \
                   ", distance := " + distance + \
                   ", type_name := " + type_name + \
                   ", subtype_list := " + subtype_list + \
                   ", tag_list := " + tag_list + \
                   ", date_input := " + date_input + ")"

    shareable_ids = db.engine.execute(query_string)

    # get the full object associated with each id
    shareable_objects = Shareable.query.filter(id=shareable_ids)

    # serialize it out
    results = ShareableSerializer.dump(shareable_objects, many=True).data
    return results

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
