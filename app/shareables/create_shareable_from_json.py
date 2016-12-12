import json
from app.calendars.models import Event, Calendar, RecurrenceRule
from app.shareables.models import Shareable, Thing, Space, \
    Time, MainType, Subtype, Comment
from datetime import datetime
from app import db
from sqlalchemy.sql import operators

def create_many_shareables_from_json_string(json_string):
    py_array = json.loads(json_string)
    for py_dict in py_array:
        create_shareable_from_json_object(py_dict)


def create_shareable_from_json_string(json_string):
    py_dict = json.loads(json_string)
    create_shareable_from_json_object(py_dict)


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
        db.session.commit()
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
                db.session.commit()
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
        db.session.commit()
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
        db.session.commit()
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
            dt_start = datetime.strptime(dt_start,  '%b %d %Y %I:%M%p')
            dt_end = e.get("dt_end")
            if dt_end is not None:
                dt_end = datetime.strptime(dt_end,  '%b %d %Y %I:%M%p')
            tz_id = e.get("tz_id")

            recurrence_rule = e.get("recurrence_rule")
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
                db.session.commit()
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
                db.session.commit()
                event_entity = db.session.query(Event).filter(
                    Event.dt_start == dt_start,
                    Event.dt_end == dt_end,
                    Event.tz_id == tz_id,
                    Event.recurrence_rule == recurrence_rule_entity).first()

            event_entities_array.append(event_entity)

        calendar_entity = None
            # db.session.query(Calendar).filter(
            # Calendar.event_relation == event_entities_array).first()

        if calendar_entity is None:
            my_calendar = Calendar(events=event_entities_array)
            db.session.add(my_calendar)
            db.session.commit()
#            calendar_entity = db.session.query(Calendar).filter(
#                Calendar.event_relation == event_entities_array).first()

    time_entity = db.session.query(Time.id).filter(
        Time.calendar == my_calendar).first()

    if time_entity is None:
        my_time = Time(calendar=calendar_entity, notes=time_notes)
        db.session.add(my_time)
        db.session.commit()
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

