'''
from server import db
from server.shareables.models import \
  Shareable, \
  Space, \
  Thing, MainType, Subtype, Tag, \
  Time,\
  Comment
from server.calendars.models import \
  Schedule, Event, RecurrenceRule

class DBObject:
  def __init__(self):
    pass
  def id_if_exists(self):
    pass


class DbSchedule (DBObject):
  def __init__(self):
    my_main_type = Schedule(type_dict)

  def id_if_exists(self):
    main_type_entity = db.session.query(MainType).filter(
      MainType.name == (type_dict).first()

class DbEvent(DBObject):
  def __init__(self):
    my_main_type = Event(type_dict)

  def id_if_exists(self):
    main_type_entity = db.session.query(MainType).filter(
      MainType.name == type_dict).first()

class DbRecurrenceRule (DBObject):
  def __init__(self):
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

  def id_if_exists(self):
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


class DbComment(DBObject):
  def __init__(self):
    my_main_type = Comment(type_dict)

  def id_if_exists(self):
    main_type_entity = db.session.query(MainType).filter(
      MainType.name == type_dict).first()


class DbTime(DBObject)
  def __init__(self):
    my_main_type = Time(type_dict)

  def id_if_exists(self):
    main_type_entity = db.session.query(MainType).filter(
      MainType.name == type_dict).first()

class DbSpace(DBObject):
  def __init__(self):
    my_space = Space(
      position='SRID=7483;POINT(' + longitude + " " + latitude + ")",
      canonical_address=canonical_address,
      alternate_names=alternate_names,
      notes=space_notes)

  def id_if_exists(self):
    space_entity = db.session.query(Space).filter(
      func.ST_Equals(Space.position, 'SRID=7483;POINT(' + longitude + " " + latitude + ")"),
      Space.canonical_address == canonical_address,
      Space.alternate_names == alternate_names).first()


class DbTag(DBObject):
  def __init__(self):
    my_main_type = Tag(type_dict)

  def id_if_exists(self):
    main_type_entity = db.session.query(MainType).filter(
      MainType.name == type_dict).first()

class DbSubtype(DBObject):
  def __init__(self):
    my_subtype = Subtype(
      main_type=main_type_entity, name=s)
    db.session.add(my_subtype)
    subtype_entity = db.session.query(Subtype).filter(
      Subtype.main_type == main_type_entity,
      Subtype.name == s).first()

  def id_if_exists(self):
    subtype_entity = db.session.query(Subtype).filter(
      Subtype.main_type == main_type_entity,
      Subtype.name == s).first()


class DbMainType(DBObject):
  def __init__(self):
    my_main_type = MainType(type_dict)

  def id_if_exists(self):
    main_type_entity = db.session.query(MainType).filter(
      MainType.name == type_dict).first()

class DbThing(DBObject):
  def __init__(self):
    my_thing = Thing(
      main_type=main_type_entity,
      subtypes=subtypes_entity_array,
      description_how=description_how,
      description_what=description_what,
      tags=tags,
      notes=thing_notes)

  def id_if_exists(self):
    thing_entity = db.session.query(Thing).filter(
      Thing.main_type == main_type_entity,
      #        Thing.subtypes == subtypes_entity_array,
      Thing.description_how == description_how,
      Thing.description_what == description_what,
      #        Thing.tags == tags,
      Thing.notes == thing_notes).first()

class DbShareable(DBObject):
  def __init__(self, headline, summary, thing, space, time):
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
  def id_if_exists(self):
    shareable_entity = db.session.query(Shareable.id).filter(
      Shareable.thing == thing_entity,
      Shareable.space == space_entity,
      #        Shareable.time == time_entity,
      Shareable.summary == summary,
      Shareable.headline == headline,
      Shareable.comments == comments,
      Shareable.notes == shareable_notes,
    ).first()


'''
