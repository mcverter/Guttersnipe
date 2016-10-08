__author__ = 'mitchell_verter'

from flask import render_template, flash, redirect, session, \
    sessions, url_for, request, g, jsonify
from flask.ext.login import login_user, logout_user, current_user, \
    login_required
from flask.ext.sqlalchemy import get_debug_queries
from flask.ext.babel import gettext
from datetime import datetime
from guess_lanuage import guessLanguage
from app import app, db, lm, oid, babel
from .forms import LoginForm, EditForm, PostForm, SearchForm
from .models import User, Post
from .emails import follower_notifications
from .translate import microsoft_translate
from config import POSTS_PER_PAGE, MAX_SEARCH_RESULTS, \
    LANGUAGES, DATABASE_QUERY_TIMEOUT



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
