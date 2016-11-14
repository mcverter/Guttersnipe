__author__ = None

from app.calendars.models import Event, RecurrenceRule
from app.users.models import Guttersnipe, Profile, Schedule, Message, blockUserTable
from app.shareables.models import Shareable, \
    Thing, Space, Time, \
    MainType, Subtype, Comment

def addPerelandra():
    # thing
    description_how = None
    description_what = None

    # Thing can have user-defined tags
    tags = None
    __table_args__ = None

    # Thing can have system-defined primary_type and subtypes
    # subtypes are defined by JOIN table below
    main_type_id = None
    main_type = None
    subtypes_relation = None
    subtypes = None

    # space
    # time
# Every Day But Saturday, 2045 until 11PM
    pass

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
