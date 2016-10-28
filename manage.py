__author__ = 'mitchell_verter'

from flask_script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand

from app import app, db

def make_shell_context():
    return dict(app=app, db=db)


manager = Manager(app)
migrate = Migrate(app, db)

manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()