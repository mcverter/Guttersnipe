__author__ = 'mitchell_verter'

from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    user = {'nickname': 'mitchell'}
    posts = [
        {'author': {'nickname': 'John'}, 'body': 'beauty'},
        {'author': {'nickname': 'sue'}, 'body': 'egg'},
        {'author': {'nickname': 'fred'}, 'body': 'feet'}
        ]

    
    return render_template('index.html',
                           title='Home',
                           user=user,
                           posts=posts)
