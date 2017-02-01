from server.shareables.models import MainType, Subtype
from server import db

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

for typename in types_and_subtypes:
  if (typename != 'food'):
    type = defineType(typename)
  for subtypename in types_and_subtypes[typename]:
    defineSubtype(type, subtypename)

db.session.commit()
