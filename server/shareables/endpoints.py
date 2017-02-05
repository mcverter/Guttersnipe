from server import db, api
from server.shareables.models import Shareable
from flask import Blueprint, request, jsonify, make_response
from flask.ext.restful import Resource, Api, abort
from server.shareables.schemas import\
  ShareableSchema, ThingSchema, TimeSchema, SpaceSchema, MainTypeSchema
import json
from server.calendars.models import Event, Calendar, RecurrenceRule
from server.shareables.models import Shareable, Thing, Space, \
    Time, MainType, Subtype, Tag
from datetime import datetime
from server import db


from sqlalchemy.exc import SQLAlchemyError
from marshmallow import ValidationError

#shareables = Blueprint('shareables', __name__)
ThingSerializer = ThingSchema()
TimeSerializer = TimeSchema()
ShareableSerializer = ShareableSchema()
SpaceSerializer = SpaceSchema()
MainTypeSerializer = MainTypeSchema()

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


def create_shareable_from_json_object(py_dict):
    headline = py_dict.get("headline")
    summary = py_dict.get("summary")
    shareable_notes = py_dict.get("notes")

    number_ratings = py_dict.get("number_ratings")
    if number_ratings is not None:
        number_ratings = int(number_ratings)

    total_ratings = py_dict.get("total_ratings")
    if total_ratings is not None:
        total_ratings = int(total_ratings)

    comments = py_dict.get("comments")
    if comments and len(comments):
        pass

    # thing
    thing = py_dict.get("thing")
    description_how = thing.get("description_how")
    description_what = thing.get("description_what")

    main_type_val = thing.get("main_type")
    main_type_entity = db.session.query(MainType).filter(
        MainType.name == main_type_val).first()

    if main_type_entity is None:
        my_main_type = MainType(main_type_val)
        db.session.add(my_main_type)
        main_type_entity = db.session.query(MainType).filter(
            MainType.name == main_type_val).first()

    subtypes_entity_array = None
    subtypes_arr_val = thing.get("subtypes")
    if subtypes_arr_val and len(subtypes_arr_val):
        subtypes_entity_array = []
        for s in subtypes_arr_val:
            subtype_entity = db.session.query(Subtype).filter(
                Subtype.main_type == main_type_entity,
                Subtype.name == s).first()
            if subtype_entity is None:
                my_subtype = Subtype(
                    main_type=main_type_entity, name=s)
                db.session.add(my_subtype)
                subtype_entity = db.session.query(Subtype).filter(
                    Subtype.main_type == main_type_entity,
                    Subtype.name == s).first()
            subtypes_entity_array.append(subtype_entity)

    tags = thing.get("tags")   # string list
    thing_notes = thing.get("notes")
    thing_entity = db.session.query(Thing).filter(
        Thing.main_type == main_type_entity,
#        Thing.subtypes == subtypes_entity_array,
        Thing.description_how == description_how,
        Thing.description_what == description_what,
#        Thing.tags == tags,
        Thing.notes == thing_notes).first()
    if thing_entity is None:
        my_thing = Thing(
            main_type=main_type_entity,
            subtypes=subtypes_entity_array,
            description_how=description_how,
            description_what=description_what,
            tags=tags,
            notes=thing_notes)
        db.session.add(my_thing)
        thing_entity = db.session.query(Thing).filter(
            Thing.main_type == main_type_entity,
#            Thing.subtypes == subtypes_entity_array,
            Thing.description_how == description_how,
            Thing.description_what == description_what,
#            Thing.tags == tags,
            Thing.notes == thing_notes).first()

    # space
    space = py_dict.get("space")
    longitude = float(space.get("longitude"))
    latitude = float(space.get("latitude"))
    canonical_address = space.get("canonical_address")
    alternate_names = space.get("alternate_names")   # string list
    space_notes = space.get("notes")

    space_entity = db.session.query(Space).filter(
        Space.longitude == longitude,
        Space.latitude == latitude,
        Space.canonical_address == canonical_address,
        Space.alternate_names == alternate_names).first()
    if space_entity is None:
        my_space = Space(
            longitude=longitude,
            latitude=latitude,
            canonical_address=canonical_address,
            alternate_names=alternate_names,
            notes=space_notes)
        db.session.add(my_space)
        space_entity = db.session.query(Space).filter(
            Space.longitude == longitude,
            Space.latitude == latitude,
            Space.canonical_address == canonical_address,
            Space.alternate_names == alternate_names).first()

    # time
    time = py_dict.get("time")
    time_notes = time.get("notes")
    calendar = time.get("calendar")
    events = calendar.get("events")
    calendar_entity = None
    if events and len(events):
        event_entities_array = []
        for e in events:
            dt_start = e.get("dt_start")

            dt_start = datetime.strptime(dt_start,  '%Y-%m-%dT%H:%M:%S')
            dt_end = e.get("dt_end")
            if dt_end is not None:
                dt_end = datetime.strptime(dt_end,  '%Y-%m-%dT%H:%M:%S')
            tz_id = e.get("tz_id")

            recurrence_rule = e.get("recurrence_rule")
            if recurrence_rule:
              freq = recurrence_rule.get("freq")
              byDay = recurrence_rule.get("byDay")
              byMonthDay = recurrence_rule.get("byMonthDay")
              byYearDay = recurrence_rule.get("byYearDay")
              byWeekNo = recurrence_rule.get("byWeekNo")
              byMonth = recurrence_rule.get("byMonth")
              until = recurrence_rule.get("until")
              count = recurrence_rule.get("count")
              interval = recurrence_rule.get("interval")
              bySetPos = recurrence_rule.get("bySetPos")

              recurrence_rule_entity = db.session.query(RecurrenceRule).filter(
                  RecurrenceRule.freq == freq,
                  RecurrenceRule.byDay == byDay,
                  RecurrenceRule.byMonthDay == byMonthDay,
                  RecurrenceRule.byYearDay == byYearDay,
                  RecurrenceRule.byWeekNo == byWeekNo,
                  RecurrenceRule.byMonth == byMonth,
                  RecurrenceRule.until == until,
                  RecurrenceRule.count == count,
  #                RecurrenceRule.interval == interval,
                  RecurrenceRule .bySetPos == bySetPos).first()

              if recurrence_rule_entity is None:
                  my_recurrence_rule = RecurrenceRule(
                      freq=freq,
                      byDay=byDay,
                      byMonthDay=byMonthDay,
                      byYearDay=byYearDay,
                      byWeekNo=byWeekNo,
                      byMonth=byMonth,
                      until=until,
                      count=count,
                      interval=interval,
                      bySetPos=bySetPos
                  )
                  db.session.add(my_recurrence_rule)
                  recurrence_rule_entity = db.session.query(RecurrenceRule).filter(
                      RecurrenceRule.freq == freq,
                      RecurrenceRule.byDay == byDay,
                      RecurrenceRule.byMonthDay == byMonthDay,
                      RecurrenceRule.byYearDay == byYearDay,
                      RecurrenceRule.byWeekNo == byWeekNo,
                      RecurrenceRule.byMonth == byMonth,
                      RecurrenceRule.until == until,
                      RecurrenceRule.count == count,
  #                    RecurrenceRule.interval == interval,
                      RecurrenceRule .bySetPos == bySetPos).first()

              event_entity = db.session.query(Event).filter(
                  Event.dt_start == dt_start,
                  Event.dt_end == dt_end,
                  Event.tz_id == tz_id,
                  Event.recurrence_rule == recurrence_rule_entity).first()

              if event_entity is None:
                  my_ev = Event(dt_start=dt_start, dt_end=dt_end,
                                tz_id=tz_id, recurrence_rule=recurrence_rule_entity)
                  db.session.add(my_ev)
                  event_entity = db.session.query(Event).filter(
                      Event.dt_start == dt_start,
                      Event.dt_end == dt_end,
                      Event.tz_id == tz_id,
                    Event.recurrence_rule == recurrence_rule_entity).first()
            else:
              event_entity = db.session.query(Event).filter(
                Event.dt_start == dt_start,
                Event.dt_end == dt_end,
                Event.tz_id == tz_id).first()

              if event_entity is None:
                my_ev = Event(dt_start=dt_start, dt_end=dt_end,
                              tz_id=tz_id)
                db.session.add(my_ev)
                event_entity = db.session.query(Event).filter(
                  Event.dt_start == dt_start,
                  Event.dt_end == dt_end,
                  Event.tz_id == tz_id).first()

            event_entities_array.append(event_entity)

        calendar_entity = db.session.query(Calendar).filter\
            (Calendar.events.contains(event_entity)).first()

        if calendar_entity is None:
            my_calendar = Calendar(events=event_entities_array)
            db.session.add(my_calendar)
            calendar_entity = db.session.query(Calendar).filter\
            (Calendar.events.contains(event_entity)).first()

    time_entity = db.session.query(Time.id).filter(
        Time.calendar == calendar_entity).first()

    if time_entity is None:
        my_time = Time(calendar=calendar_entity, notes=time_notes)
        db.session.add(my_time)
        time_entity = db.session.query(Time).filter(
            Time.calendar == calendar_entity).first()

    shareable_entity = db.session.query(Shareable.id).filter(
        Shareable.thing == thing_entity,
        Shareable.space == space_entity,
#        Shareable.time == time_entity,
        Shareable.summary == summary,
        Shareable.headline == headline,
        Shareable.number_ratings == number_ratings,
        Shareable.total_ratings == total_ratings,
        Shareable.comments == comments,
        Shareable.notes == shareable_notes,
        ).first()

    if True:
        my_shareable = Shareable(
            thing=thing_entity,
            space=space_entity,
            time=time_entity,
            summary=summary,
            headline=headline,
            number_ratings=number_ratings,
            total_ratings=total_ratings,
            comments=comments,
            notes=shareable_notes)
        db.session.add(my_shareable)
        db.session.commit()
        return my_shareable


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
