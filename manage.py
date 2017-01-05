__author__ = 'mitchell_verter'

from flask_script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand
import os
import importlib
from app.shareables.create_shareable_from_json import create_many_shareables_from_json_string
import pdb

from app import app, db

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
    create_many_shareables_from_json_string(json)

if __name__ == '__main__':
    manager.run()