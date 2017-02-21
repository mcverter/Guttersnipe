import os
import urllib

from flask import url_for
from flask.ext.migrate import Migrate, MigrateCommand
from flask_script import Manager, Shell

from db.create_sqlalchemy.create_shareable_from_json import create_many_shareables_from_json_string
from db.seeds.kropotkinsSeed import seed_kropotkins
from db.seeds.types_subtypes_tags_seed import seed_types_and_subtypes_and_tags
from server import app, db


def make_shell_context():
    return dict(app=app, db=db)


manager = Manager(app)
migrate = Migrate(app, db, directory="db/migrations")

manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

@manager.command
def seed():
    curr_dir = os.path.dirname(os.path.realpath(__file__))
    filename = os.path.join(curr_dir, "db", "seeds", "brooklyn.data.json")
    json = (open(filename, "r", encoding="UTF-8")).read()
    seed_types_and_subtypes_and_tags()
    create_many_shareables_from_json_string(json)
    seed_kropotkins()


@manager.command
def list_routes():
  output = []
  for rule in app.url_map.iter_rules():

    options = {}
    for arg in rule.arguments:
      options[arg] = "[{0}]".format(arg)

    methods = ','.join(rule.methods)
    url = url_for(rule.endpoint, **options)
    line = urllib.parse.unquote("{:50s} {:20s} {}".format(rule.endpoint, methods, url))
    output.append(line)

  for line in sorted(output):
    print (line)

if __name__ == '__main__':
    manager.run()
