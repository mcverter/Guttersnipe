__author__ = None

from app.calendars.models import Event, RecurrenceRule
from app.users.models import Guttersnipe, Profile, Schedule, Message, blockUserTable
from app.shareables.models import Shareable, \
    Thing, Space, Time, \
    MainType, Subtype, Comment
from app.calendars.models import Event, Calendar, RecurrenceRule
import pdb
from datetime import datetime
from app import db

print ("yay")
def defineFoodType():
    food = MainType(name="Food")
    db.session.add(food)
    return food

def defineDumpsterSubtype(main_type):
    dumpster = Subtype(name="dumpster", main_type=main_type)
    db.session.add(dumpster)
    return dumpster

def definePerelandraThing(main_type, subtype):
    print("moo")
    description_what = "Regular curbside bags, plus cardboard boxes set to the side with most of the produce (what foragers don’t take gets composted)."
    description_how = None

    # Thing can have user-defined tags
    tags = ["super", "great", "awesome"]

    # Thing can have system-defined primary_type and subtypes
    # subtypes are defined by JOIN table below
    main_type = main_type
    subtypes = [subtype]
    thing_notes = None
    perelandra_thing = Thing(
        main_type = main_type,
                             subtypes=subtypes,
                             description_how=description_how,
                             description_what=description_what,
                             tags=None,
                             notes=None)
    db.session.add(perelandra_thing)
    return perelandra_thing

def definePerelandraSpace():
     longitude = 40.693483
     latitude = -73.991377
     canonical_address = '175 Remsen St    Brooklyn, NY 11201'
     notes = 'Remsen St across from Borough Hall, between Court and Clinton Sts, Brooklyn'

     perelandra_space = Space(longitude = longitude,
                              latitude = latitude,
                              canonical_address = canonical_address,
                              alternate_names= None,
                              notes = None
     )
     db.session.add(perelandra_space)
     return perelandra_space

def definePerelandaTime():
    freq = 'weekly'
    byDay =  'mo,tu,we,th,fr,su'
    perelandraRecurrence = RecurrenceRule(freq=freq, byDay=byDay)
    dt_start = datetime.strptime('Dec 11 2016 8:45PM',  '%b %d %Y %I:%M%p')
    dt_end = datetime.strptime('Dec 11 2016 12:00AM',  '%b %d %Y %I:%M%p')
    tz_id ='America/New_York'
    perelandraEvent = Event(dt_start=dt_start, dt_end=dt_end,
                            tz_id=tz_id, recurrence_rule=perelandraRecurrence)
    perelandraCalendar = Calendar(events=[perelandraEvent])
    notes = "8:45 when all the employees leave the store. Trash is collected between 10:30 p and 12:30a. One source says nothing is out on Saturdays"

    db.session.add(perelandraCalendar)
    db.session.add(perelandraEvent)
    db.session.add(perelandraRecurrence)

    perelandra_time = Time(calendar=perelandraCalendar, notes=notes)
    db.session.add(perelandra_time)
    return perelandra_time




#every_day_but_sat_845_to_midnight = defineSubtypes()


def definePerelandraShareable(thing, space, time):
    headline = "Perelandra"
    summary = "Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags."
    notes = None

    perelandra_shareable = Shareable(thing=thing, space=space, time=time,
                     summary=summary, headline=headline, notes=notes)
    db.session.add(perelandra_shareable)
    return perelandra_shareable


def seed():
    food_type = defineFoodType()
    dumpster_subtype = defineDumpsterSubtype (main_type=food_type)
    perelandra_thing = definePerelandraThing(main_type=food_type, subtype=dumpster_subtype)
    perelandra_time = definePerelandaTime()
    pereleandra_space = definePerelandraSpace()
    definePerelandraShareable(thing=perelandra_thing,
                              time=perelandra_time,
                              space=pereleandra_space)
    db.session.commit()


seed()