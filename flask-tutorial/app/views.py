__author__ = 'mitchell_verter'

from flask import render_template
from app import app

@app.route('/')
@app.route('/index')
def index():
    user = {'nickname': 'mitchell'}
    return render_template('index.html',
                           title='Home',
                           user=user)
