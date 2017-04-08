import urllib

from flask import url_for
from flask.ext.migrate import Migrate, MigrateCommand
from flask_script import Manager, Shell

from db.seeds.kropotkins_seed import seed_kropotkins
from db.seeds.types_subtypes_tags_seed import seed_types_and_subtypes_and_tags
from db.seeds.bk_freegan_seed import seed_bk_freegan
from db.seeds.needle_exchange_seed import seed_needles


from server import app, db



def make_shell_context():
    return dict(app=app, db=db)


manager = Manager(app)
migrate = Migrate(app, db, directory="db/migrations")

manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)

@manager.command
def seed():
#    seed_needles()
    seed_bk_freegan()
    seed_types_and_subtypes_and_tags()
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
