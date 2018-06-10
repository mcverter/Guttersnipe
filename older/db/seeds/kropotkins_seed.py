
import os
from server import app, db
import json
from server.kropotkins.models import Kropotkin

def seed_kropotkins():
  curr_dir = os.path.dirname(os.path.realpath(__file__))
  filename = os.path.join(curr_dir, "json", "kropotkin.data.json")
  json_string = (open(filename, "r", encoding="UTF-8")).read()
  py_array = json.loads(json_string)
  for quote in py_array:
    k = Kropotkin(quote["paragraph"])
    db.session.add(k)
  db.session.commit()
