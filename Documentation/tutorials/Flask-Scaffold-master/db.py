from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from config import SQLALCHEMY_DATABASE_URI
from run import app
from app.basemodels import db

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
