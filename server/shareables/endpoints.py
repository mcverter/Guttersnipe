import json
from datetime import datetime
from server import db, api
import calendar as calfn

from flask import Blueprint, request, jsonify, make_response
from flask.ext.restful import Resource, Api, abort
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
from marshmallow import ValidationError
from server.shareables.schemas import ShareableSchema
from server.shareables.models import Shareable, Subtype, Tag, Thing, MainType, Space, Time
from server.calendars.models import Calendar, Event, RecurrenceRule
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
  def post(self):
    def apply_type_filter(query, type_name):
      return query.join(Thing).join(MainType).filter(MainType.name == type_name)

    def apply_subtype_filter(query, subtype_list):
      return query.join(Thing).join(Thing.subtypes_relation).filter(Subtype.name.in_(subtype_list))

    def apply_tag_filter(query, tag_list):
      return query.join(Thing).join(Thing.tag_relation).filter(Tag.name.in_(tag_list))

    def apply_space_filter(query, longitude, latitude, distance):
      return query.join(Space).filter(func.ST_DWithin((func.ST_PointFromText('POINT(' + longitude + ' ' + latitude + ')', 7483)), Space.position, distance))

    def apply_time_filter(query, date_input):
      def apply_single_event_filter(query, date_input):
        return query.join(Time).join(Calendar).join(Event).filter(Event.recurrence_rule_id is None and date_input <= Event.dt_end and date_input >= Event.dt_start)

      def apply_recurring_event_filter(query, date_input):
        return query.join(Time).join(Calendar).join(Event).filter(
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

'''
      this works but it's wrong
    # find IDS from database
    query_string = "SELECT(search_shareable_combine_filters(" +\
                   "longitude := " + longitude + \
                   ", latitude := " + latitude + \
                   ", distance := " + distance + \
                   ", type_name := " + type_name + \
                   ", subtype_list := " + subtype_list + \
                   ", tag_list := " + tag_list + \
                   ", date_input := " + date_input + "))"

    # array output is "{1,2,3,4,5,6,7,8,9}"
    results = db.engine.execute(query_string)

    for row in results:
      shareable_ids = row._row[0]
      break

    # get the full object associated with each id
    # >>> session.query(User).filter(User.name.in_(['Edwardo', 'fakeuser'])).all()

    shareable_objects = Shareable.query.filter(Shareable.id.in_(shareable_ids)).all()

    # serialize it out
    results = ShareableSerializer.dump(shareable_objects, many=True).data
    return results

'''
'''

(02:12:13 PM) jwhisnant: roadrunneratwast: http://docs.sqlalchemy.org/en/latest/orm/tutorial.html#using-textual-sql http://docs.sqlalchemy.org/en/latest/core/ddl.html?highlight=ddl http://docs.sqlalchemy.org/en/latest/core/sqlelement.html#sqlalchemy.sql.expression.func - these may help with your question
(02:12:18 PM) roadrunneratwast: skip it fellas. thanks
(02:12:21 PM) joesmith [c00533fa@gateway/web/freenode/ip.192.5.51.250] entered the room.
(02:12:28 PM) Wooble: KOLANICH: but as http://as.ynchrono.us/2007/12/filesystem-structure-of-python-project_21.html points out, you often want your test suite inside your package so you end up with multiple files and the former kind of package anyway.
(02:12:36 PM) zaherdirkey left the room (quit: Read error: Connection reset by peer).
(02:12:36 PM) CyberJacob left the room (quit: Quit: Bye Bye).
(02:12:37 PM) jwhisnant: roadrunneratwast: SQLAlchemy converts None to "NULL" in queries.
(02:12:59 PM) _Nox left the room (quit: Quit: Yaaic - Yet another Android IRC client - http://www.yaaic.org).
(02:13:04 PM) riclima [~riclima@132.208.131.10] entered the room.
(02:13:12 PM) riclima_ left the room (quit: Ping timeout: 260 seconds).
(02:13:28 PM) jackNemrod left the room (quit: Ping timeout: 268 seconds).
(02:13:29 PM) jackNemrod_ is now known as jackNemrod
(02:13:40 PM) snowalpaca left the room (quit: Ping timeout: 260 seconds).
(02:13:40 PM) KOLANICH: Wooble: Thank you.
(02:14:34 PM) NANDgate left the room (quit: Quit: Remembered something).
(02:14:41 PM) mattallmill left the room (quit: Quit: Konversation terminated!).
(02:15:02 PM) riclima_ [~riclima@132.208.131.10] entered the room.
(02:15:42 PM) Astroid_ [~Astroid@h-155-4-133-26.na.cust.bahnhof.se] entered the room.
(02:15:50 PM) modlin left the room (quit: Quit: modlin).
(02:15:54 PM) roadrunneratwast: jwhisnant  when i tried to concatenate NONE to the query string, it complained that NONE did not have a string representation.
(02:16:03 PM) riclima__ [~riclima@132.208.131.10] entered the room.
(02:16:06 PM) roadrunneratwast: but i will look at the links you sent
(02:16:07 PM) riclima_ left the room (quit: Read error: Connection reset by peer).
(02:16:07 PM) roadrunneratwast: thanks
(02:16:10 PM) Rodya_ [~Rodya_@2601:46:4001:e0b4:7096:d258:8a53:665c] entered the room.
(02:16:13 PM) killvenom [~killvenom@cpc1-broo7-2-0-cust53.14-2.cable.virginm.net] entered the room.
(02:16:15 PM) riclima left the room (quit: Read error: Connection reset by peer).
'''


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
api.add_resource(ShareableSearchEndpoint, '/api/shareables/search', endpoint = 'search')
