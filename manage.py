__author__ = 'mitchell_verter'

from flask_script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand
import os
import importlib

from app import app, db

def make_shell_context():
    return dict(app=app, db=db)


manager = Manager(app)
migrate = Migrate(app, db, directory="db/migrations")

manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)


@manager.command
def seed():
    dir_path = dir_path = os.path.dirname(os.path.realpath(__file__))
    seed_path = os.path.join(dir_path, "db", "seeds")

    for file in os.listdir(seed_path):
        print ("file", file)
        if file[-3:] == ".py":
            importlib.import_module('db.seeds.' + file[0:-3])

if __name__ == '__main__':
    manager.run()