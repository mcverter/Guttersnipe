import calendar as calfn
import json
from datetime import datetime
import random

from flask import request, jsonify, make_response
from flask.ext.restful import Resource
from marshmallow import ValidationError
from sqlalchemy import func, cast
from sqlalchemy.exc import SQLAlchemyError

from server import db, api
from server.calendars.models import Schedule, Event, RecurrenceRule
from server.create_sqlalchemy.create_shareable_from_json import create_shareable
from server.shareables.models import Shareable, Subtype, Tag, Thing, MainType, Space, Time
from server.shareables.schemas import ShareableSchema

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
  def post(self):
    def apply_type_filter(query, type_name):
      return query.join(Thing).join(MainType).filter(MainType.name == type_name)

    def apply_subtype_filter(query, subtype_list):
      return query.join(Thing).join(Thing.subtypes_relation).filter(Subtype.name.in_(subtype_list))

    def apply_tag_filter(query, tag_list):
      return query.join(Thing).join(Thing.tag_relation).filter(Tag.name.in_(tag_list))

    def apply_space_filter(query, longitude, latitude, distance):
      return query.join(Space).filter(
        func.ST_Distance_Sphere(
          func.ST_PointFromText('POINT(' + '%.8f' % longitude + ' ' +
                                '%.8f' % latitude + ')', 4326), Space.position) < distance)
    def apply_time_filter(query, date_input):
      def apply_single_event_filter(query, date_input):
        return query.join(Time).join(Schedule).join(Event).filter(Event.recurrence_rule_id is None and date_input <= Event.dt_end and date_input >= Event.dt_start)

      def apply_recurring_event_filter(query, date_input):
        return query.join(Time).join(Schedule).join(Event).filter(
          Event.recurrence_rule_id is not None).join(RecurrenceRule)\
          .filter(RecurrenceRule.byDay.like('%' + \
          calfn.day_name[date_input.weekday()][0:2].lower() + '%'))

      return apply_recurring_event_filter(query, date_input).union(
        apply_single_event_filter(query, date_input))

    search_params = request.get_json() or json.loads(request.data) \
      if isinstance(request.data, str) else json.loads(request.data.decode('utf-8'))
    longitude = search_params['longitude'] if 'longitude' in search_params else None
    latitude = search_params['latitude'] if 'latitude' in search_params else None
    distance = search_params['distance'] if 'distance' in search_params else None
    type_name = search_params['type_name'] if 'type_name' in search_params else None
    subtype_list = search_params['subtype_list'] if 'subtype_list' in search_params else None
    tag_list = search_params['tag_list'] if 'tag_list' in search_params else None
    date_input = datetime.strptime(search_params['date_input'], '%Y-%m-%dT%H:%M:%S') \
      if 'date_input' in search_params else None

    baseQuery = Shareable.query

    if (type_name):
      baseQuery = apply_type_filter(baseQuery, type_name)
    if (subtype_list):
      baseQuery = apply_subtype_filter(baseQuery, subtype_list)
    if (tag_list):
      baseQuery = apply_tag_filter(baseQuery, tag_list)
    if (distance and latitude and longitude):
      baseQuery = apply_space_filter(baseQuery, longitude, latitude, distance)
    if (date_input):
      baseQuery = apply_time_filter(baseQuery, date_input)

    return ShareableSerializer.dump(baseQuery.all(), many=True).data

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
    random.shuffle(query)
    results = ShareableSerializer.dump(query, many=True).data
    return results


  def post(self):
    raw_dict = request.get_json() or json.loads(request.data) \
      if isinstance(request.data, str) else json.loads(request.data.decode('utf-8'))
    try:
      shareable = create_shareable(raw_dict)
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

#shareable_blueprint = Blueprint('shareable_print',__name__, url_prefix='/api/shareables')
#api = Api(shareable_blueprint)
#api.add_resource(ShareableListEndpoint, '')
api.add_resource(ShareableListEndpoint, '/api/shareables', endpoint = 'shareables')
api.add_resource(ShareableEndpoint, '/api/shareable/<int:id>', endpoint = 'shareable')
api.add_resource(ShareableCategorizationEndpoint, '/api/shareables/categorization', endpoint = 'categorization')
api.add_resource(ShareableSearchEndpoint, '/api/shareables/search', endpoint = 'search')

'''
from flask import Flask, Blueprint
from flask.ext import restful

class HelloWorld(restful.Resource):
    def get(self):
        return {'hello': 'world'}

blueprint = Blueprint('my_blueprint', __name__)

api = restful.Api(blueprint, prefix="/blueprint")
api.add_resource(HelloWorld, "/helloworld")

app = Flask(__name__)
app.register_blueprint(blueprint)

if __name__ == '__main__':
    app.run(debug=True)

'''
