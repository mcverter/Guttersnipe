import json
from app.calendars.models import Event, Calendar, RecurrenceRule
from app.shareables.models import Shareable, Thing, Space, \
    Time, MainType, Subtype, Comment
import datetime



def create_shareable_from_json(json_string):
    py_dict = json.loads(json_string)
    headline = py_dict["headline"]
    summary = py_dict["summary"]
    shareable_notes = py_dict["notes"]

    number_ratings = py_dict["number_ratings"]
    if number_ratings is not None:
        number_ratings = int(number_ratings)

    total_ratings = py_dict["total_ratings"]
    if total_ratings is not None:
        total_ratings = int(total_ratings)

    comments = py_dict["comments"]
    if comments and len(comments):
        pass

    # thing
    thing = py_dict["thing"]
    description_how = thing["description_how"]
    description_what = thing["description_what"]

    main_type = thing["main_type"]
    my_main_type = MainType(main_type)

    my_subtypes = None
    subtypes = thing["subtypes"]
    if subtypes and len(subtypes):
        my_subtypes = []
        for s in subtypes:
            my_subtypes.append(Subtype(main_type=my_main_type,
                                       name=s))

    tags = thing["tags"]   # string list
    thing_notes = thing["notes"]
    my_thing = Thing(
        main_type=my_main_type,
        subtypes=my_subtypes,
        description_how=description_how,
        description_what=description_what,
        tags=tags,
        notes=thing_notes)

    # space
    space = py_dict["space"]
    longitude = float(space["longitude"])
    latitude = float(space["latitude"])
    canonical_address = space["canonical_address"]
    alternate_names = space["alternate_names"]   # string list
    space_notes = space["notes"]
    my_space = Space(
        longitude=longitude,
        latitude=latitude,
        canonical_address=canonical_address,
        alternate_names=alternate_names,
        notes=space_notes)

    # time
    time = py_dict["time"]
    time_notes = time["notes"]
    calendar = time["calendar"]
    events = calendar["events"]
    my_calendar = None
    if events and len(events):
        my_events = []
        for e in events:
            dt_start = e["dt_start"]
            dt_start = datetime.strptime(dt_start,  '%b %d %Y %I:%M%p')
            dt_end = e["dt_end"]
            if dt_end is not None:
                dt_end = datetime.strptime(dt_end,  '%b %d %Y %I:%M%p')
            tz_id = e["tz_id"]

            recurrence_rule = e["recurrence_rule"]
            freq = recurrence_rule["freq"]
            byDay = recurrence_rule["byDay"]
            byMonthDay = recurrence_rule["byMonthDay"]
            byYearDay = recurrence_rule["byYearDay"]
            byWeekNo = recurrence_rule["byWeekNo"]
            byMonth = recurrence_rule["byMonth"]
            until = recurrence_rule["until"]
            count = recurrence_rule["count"]
            interval = recurrence_rule["interval"]
            bySetPos = recurrence_rule["bySetPos"]

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
            my_ev = Event(dt_start=dt_start, dt_end=dt_end,
                          tz_id=tz_id, recurrence_rule=my_recurrence_rule)

            my_events.append(my_ev)

        my_calendar = Calendar(events=my_events)
    my_time = Time(calendar=my_calendar, notes=time_notes)

    my_shareable = Shareable(
        thing=my_thing,
        space=my_space,
        time=my_time,
        summary=summary,
        headline=headline,
        number_ratings=number_ratings,
        total_ratings=total_ratings,
        comments=comments,
        notes=shareable_notes)










