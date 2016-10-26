from flask import Flask, Response

class MyResponse(Response):
     default_mimetype = 'application/xml'
     
    

# http://flask.pocoo.org/docs/0.10/patterns/appfactories/
def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)
    app.response_class = MyResponse

    from app.users.models import db
    db.init_app(app)

    # Blueprints   
    from app.users.views import users
    app.register_blueprint(users, url_prefix='/api/v1/users')
    

    return app
    