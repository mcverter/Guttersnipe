from server import db
from server.create_sqlalchemy.create_shareable_from_json import create_tags, create_main_type, create_subtype_array
from server.shareables.models import MainType, Subtype


def defineSubtype(main_type, name):
    subtype = Subtype(name=name, main_type=main_type)
    db.session.add(subtype)
    print (subtype)
    return subtype

def defineType(name):
    type = MainType(name=name)
    db.session.add(type)
    return type

types_and_subtypes = {
  "food": [
    "food not bombs",
    "free meal",
    "dumpster",
    "church meal"
  ],
  "medical": [
    "needle exchange",
    "SID testing"
  ],
  "housing": [
    "squat",
    "free room"
  ]
}

tags = ["religious", "donation"]

def seed_types_and_subtypes_and_tags():
  for typename in types_and_subtypes:
    type = create_main_type(typename)
    create_subtype_array(types_and_subtypes[typename], type)

  create_tags(tags)

  db.session.commit()
