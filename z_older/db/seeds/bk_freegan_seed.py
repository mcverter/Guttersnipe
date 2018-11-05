import os
from server.create_sqlalchemy.create_shareable_from_json import create_many_shareables_from_json_string



def seed_bk_freegan():
  curr_dir = os.path.dirname(os.path.realpath(__file__))
  filename = os.path.join(curr_dir, "json", "brooklyn.data.json")
  json = (open(filename, "r", encoding="UTF-8")).read()
  create_many_shareables_from_json_string(json)
