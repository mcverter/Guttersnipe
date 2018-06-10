#!../../../flask-tut-env/bin/python

import imp
from migrate.versioning import api
from server import db
from config import SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_MIGRATE_REPO



ver =  api.version_control(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)

migration = SQLALCHEMY_MIGRATE_REPO + ('/versions/%03d_migration.py' (ver + 1))
tmp_module = imp.new_module('old_model')
old_model = app.create_model(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)
exec(old_model, tmp_module.__dict__)
script = api.make_update_script_for_model(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO,
                                          tmp_module.meta, db.metadata)
open(migration, 'wt').write(script)

api.upgrate(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)
print('new migration saved as ' + migration)
print('current db version ' + str(v))
