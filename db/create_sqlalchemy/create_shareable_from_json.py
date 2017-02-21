import json
from server.calendars.models import Event, Schedule, RecurrenceRule
from server.shareables.models import Shareable, Thing, Space, \
  Time, MainType, Subtype, Comment
from datetime import datetime
from server import db
from sqlalchemy.sql import operators, func

def create_many_shareables_from_json_string(json_string):
  py_array = json.loads(json_string)
  for py_dict in py_array:
    create_many_shareables_from_json_string(py_dict)


def create_shareable_from_json_string(json_string):
  py_dict = json.loads(json_string)
  create_shareable(py_dict)

def create_shareable(shareable_dict):
  headline = shareable_dict.get("headline")
  summary = shareable_dict.get("summary")
  shareable_notes = shareable_dict.get("notes")

  number_ratings = shareable_dict.get("number_ratings")
  if number_ratings is not None:
    number_ratings = int(number_ratings)

  total_ratings = shareable_dict.get("total_ratings")
  if total_ratings is not None:
    total_ratings = int(total_ratings)

  comments = shareable_dict.get("comments")
  if comments and len(comments):
    pass
  thing_entity = create_thing(
    shareable_dict.get("thing"))
  space_entity = create_space_from_json_object(
    shareable_dict.get("space"))
  time_entity = create_time_from_json_object(
    shareable_dict.get("time"))

  shareable_entity = db.session.query(Shareable.id).filter(
    Shareable.thing == thing_entity,
    Shareable.space == space_entity,
    #        Shareable.time == time_entity,
    Shareable.summary == summary,
    Shareable.headline == headline,
    Shareable.comments == comments,
    Shareable.notes == shareable_notes,
    ).first()

  if shareable_entity is None:
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


def create_main_type(type_dict):
  main_type_entity = db.session.query(MainType).filter(
    MainType.name == type_dict).first()

  if main_type_entity is None:
    my_main_type = MainType(type_dict)
    db.session.add(my_main_type)
    main_type_entity = db.session.query(MainType).filter(
      MainType.name == type_dict).first()
  return main_type_entity


def create_tags_from_json_object(tags_dict):
  pass


def create_subtype_array(subtype_json_array, main_type_entity):
  subtypes_entity_array = None
  if subtype_json_array and len(subtype_json_array):
    subtypes_entity_array = []
    for s in subtype_json_array:
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
  return subtypes_entity_array

def create_thing(thing_dict):
  # thing
  description_how = thing_dict.get("description_how")
  description_what = thing_dict.get("description_what")

  main_type_entity = create_main_type(
    thing_dict.get("main_type"))
  subtypes_entity_array = create_subtype_array(
    thing_dict.get("subtypes"), main_type_entity)

  tags = thing_dict.get("tags")  # string list
  thing_notes = thing_dict.get("notes")
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
  return thing_entity


def create_space_from_json_object(space_dict):
  longitude = ".6f"% (space_dict.get("longitude"))
  latitude =  ".2f" % (space_dict.get("latitude"))
  canonical_address = space_dict.get("canonical_address")
  alternate_names = space_dict.get("alternate_names")  # string list
  space_notes = space_dict.get("notes")

  space_entity = db.session.query(Space).filter(
    func.ST_Equals(Space.position, 'SRID=7483;POINT(' + longitude + " " + latitude + ")", srid=7483),
    Space.canonical_address == canonical_address,
    Space.alternate_names == alternate_names).first()
  if space_entity is None:
    my_space = Space(
      position='SRID=7483;POINT(' + longitude + " " + latitude + ")",
      canonical_address=canonical_address,
      alternate_names=alternate_names,
      notes=space_notes)
    db.session.add(my_space)
    space_entity = db.session.query(Space).filter(
      func.ST_Equals(Space.position, 'SRID=7483;POINT(' + longitude + " " + latitude + ")"),
      Space.canonical_address == canonical_address,
      Space.alternate_names == alternate_names).first()
  return space_entity


def create_time_from_json_object(time_dict):
  time_notes = time_dict.get("notes")
  calendar = time_dict.get("calendar")
  events = calendar.get("events")
  calendar_entity = None
  if events and len(events):
    event_entities_array = []
    for e in events:
      dt_start = e.get("dt_start")

      dt_start = datetime.strptime(dt_start, '%Y-%m-%dT%H:%M:%S')
      dt_end = e.get("dt_end")
      if dt_end is not None:
        dt_end = datetime.strptime(dt_end, '%Y-%m-%dT%H:%M:%S')
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
          RecurrenceRule.bySetPos == bySetPos).first()

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
            RecurrenceRule.bySetPos == bySetPos).first()

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

    schedule_entity = db.session.query(Schedule).filter \
      (Schedule.events.contains(event_entity)).first()

    if schedule_entity is None:
      my_schedule = Schedule(events=event_entities_array)
      db.session.add(my_schedule)
      schedule_entity = db.session.query(Schedule).filter \
        (Schedule.events.contains(event_entity)).first()

  time_entity = db.session.query(Time.id).filter(
    Time.schedule == schedule_entity).first()

  if time_entity is None:
    my_time = Time(schedule=schedule_entity, notes=time_notes)
    db.session.add(my_time)
    time_entity = db.session.query(Time).filter(
      Time.schedule == schedule_entity).first()
  return time_entity


def create_event_from_json_object(event_dict):
  pass
