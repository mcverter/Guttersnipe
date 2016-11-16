__author__ = None

from app.calendars.models import Event, RecurrenceRule
from app.users.models import Guttersnipe, Profile, Schedule, Message, blockUserTable
from app.shareables.models import Shareable, \
    Thing, Space, Time, \
    MainType, Subtype, Comment
import pdb

print ("yay")
def defineFoodType():
    food = MainType(name="Food")
    return food

def defineDumpsterSubtype(main_type):
    dumpster = Subtype(name="dumpster", main_type=main_type)
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
    perelandra_thing = Thing(description_how=description_how,
                             description_what=description_what, \
                             tags=None, \
                             main_type = main_type, \
                             subtypes=None)
    perelandra_thing.subtypes = subtypes
    return perelandra_thing



def defineSchedules():
    every_day_but_sat_845_to_midnight = ''
    return (every_day_but_sat_845_to_midnight)
    pass

#every_day_but_sat_845_to_midnight = defineSubtypes()


def addPerelandra():
    headline = "Perelandra"
    summary = "Lots of locals count on finding greens and produce in particular. Fewer go thru the bags, which contain health bread, and often assorted packaged health foods, and small amounts of bulk foods (grains, beans, nuts, coffee) that can be gleaned from the not-quite-emptied heavy brown bags."
    notes = None

    # thing

    # space
    longitude = -73.991377
    latitude = 40.693483
    canonical_address = "175 Remsen St Brooklyn, NY 11201"
    alternate_names = None
    space_notes = "Remsen St across from Borough Hall, between Court and Clinton Sts, Brooklyn"

    # time
    calendar = every_day_but_sat_845_to_midnight
    time_notes = "8:45 when all the employees leave the store. Trash is collected between 10:30 p and 12:30a. One source says nothing is out on Saturdays"


def addTraderJoes():
    # thing
    # space
    # time
    pass

def addLaBagel():
    # thing
    # space
    # time
    pass


def addGardenOfEden():
    # thing
    # space
    # time
    pass

def addGristedes():
    # thing
    # space
    # time
    pass

def addCaputos():
    # thing
    # space
    # time
    pass

def addNewBanana():
    # thing
    # space
    # time
    pass

def addIsaacs():
    # thing
    # space
    # time
    pass

def seed():
    food_type = defineFoodType()
    dumpster_subtype = defineDumpsterSubtype (main_type=food_type)
    perelandra_thing = definePerelandraThing(main_type=food_type, subtype=dumpster_subtype)
    moo = 1+1

seed()