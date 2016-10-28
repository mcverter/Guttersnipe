Flask-Scaffold let's you scaffold a MySQL or PostgreSQL driven Web Application with Flask and Angularjs. It will create views,models and templates for a given Resource along with API endpoints and Unit tests.

![](http://i.imgur.com/o7RTkyB.png)

Features include

 - Python 3 Support
 - RESTFUL JSON API
 - Unit Testing with python Unit tests
 - End 2 End testing with Protractor
 - Continous Integration with Travis-CI
 - Inbuilt User Management and Admin Dashboard
 - [Google Analytics](#google-analytics)

###[Demo](http://flask-scaffold.herokuapp.com/) Sign Up and Login

![](https://travis-ci.org/Leo-G/Flask-Scaffold.svg?branch=master)
[![Gitter](https://badges.gitter.im/Leo-G/Flask-Scaffold.svg)](https://gitter.im/Leo-G/Flask-Scaffold?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![PayPal donate button](http://img.shields.io/paypal/donate.png?color=yellow)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=althealobo%40gmail%2ecom&lc=AU&item_name=Leo%2dG&no_note=0&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHostedGuest)

###Installation

Please ensure that development libraries for [PostgreSQL](http://techarena51.com/index.php/flask-sqlalchemy-postgresql-tutorial/) are installed.

####Step 1:Clone the project to your application folder.

    git clone git@github.com:Leo-g/Flask-Scaffold.git YourAppFolderName && cd YourAppFolderName

####Step 2: Install the requirements and add your Database configuration details.

    pip install -r requirements.txt

    vim config.py
    #Fill in your database username, password, name, host etc

#### Step 3 : Declare your Resource and it's fields in a YAML file as follows

For a list of supported fields please see https://github.com/Leo-g/Flask-Scaffold/wiki/Fields

    vim scaffold/blog.yaml
    posts:
     - title:string
     - body:text
     - author:string
     - creation_date:date
     - published:boolean
    comments:
     - author:string
     - body:text
     - author_url:url
     - created_on:date
     - approved:boolean
    authors:
     - name:string
     - profile:text
     - url:url

#### Step 4 : Run the Scaffolding  and database migrations script

    python scaffold.py scaffold/blog.yaml
    python db.py db init
    python db.py db migrate
    python db.py db upgrade

####  Step 5 : Run the Server

    python run.py

**You should be able to see the Login Page at http://localhost:5000, Sign Up and Login

![](http://i.imgur.com/a5iFubs.png)

###Examples
[Freddy a Blogging Engine](https://github.com/Leo-G/Freddy)

[Running Asynchronous commands on Linux with Flask and Celery](https://github.com/Leo-G/Flask-Celery-Linux)

###Tests

####For E2E testing with protractor
Installation instructions for protractor are in the [wiki](https://github.com/Leo-G/Flask-Scaffold/wiki/Headless-Testing-Angularjs-apps-with-Protractor-and-Selenium-on-Ubuntu-14.04)

    # To run tests for all modules
    protractor conf.js

    # To run a a test for a specific module

    protractor app/templates/<module_name>/conf.js

####For unit testing with python Unit tests

    For a Single module

    python app/<module_name>/test_<module_name>.py

    For all modules

    bash tests.bash

###API

API calls can be made to the following URL

Note: This example is for a Post module

| HTTP Method  | URL  | Results |
| :------------ |:---------------:| -----:|
| GET      | http://localhost:5000/api/v1/posts.json | Returns a list of all Posts |
| POST     | http://localhost:5000/api/v1/posts.json      |   Creates a New Post |
| GET | http://localhost:5000/api/v1/posts/1.json      | Returns details for the a single Post |
| PATCH | http://localhost:5000/api/v1/posts/1.json      | Update a Post |
| DELETE | http://localhost:8001/api/v1/posts/1.json      | Delete a Post |

The JSON format follows the spec at jsonapi.org and a sample is available in the sample.json   file

###Tutorials
http://techarena51.com/index.php/buidling-a-database-driven-restful-json-api-in-python-3-with-flask-flask-restful-and-sqlalchemy/

https://techarena51.com/index.php/category/flask-framework-tutorials-and-examples/

###Directory Structure
        Project-Folder
            |-- config.py
            |--run.py
            |--requirements.txt
            |--conf.js
            |__ /venv
            |-- db.py
            |__ /scaffold
            |-- scaffold.py
            |-- tests.bash    #Tests for all modules
            |__ app/
                |-- __init__.py
                +-- module-1
                    |-- __init__.py
                    |-- models.py
                    |-- test_module-1.py  # Unit Tests for module 1
                    |-- views.py
                        
                +-- module-2
                    |-- __init__.py
                    |-- models.py
                    |-- test_module-2.py  # Unit Tests for module 2
                    |-- views.py
                |__ templates
                   |-- index.html
                   |-- login.html
                   |-- home.html
                   +-- static
                          + -- js
                                 |-- app.js
                                 |-- login.js
                          |-- css
                          |-- images
                   +-- module-1
                                   |-- _form.html
                                   |-- index.html
                                   |-- add.html
                                   |-- update.html
                                   |-- controller.js
                                   |--conf.js
                                   |--spec.js
                   +-- module-2
                                   |-- _form.html
                                   |-- index.html
                                   |-- add.html
                                   |-- update.html
                                   |-- controller.js
                                   |-- conf.js
                                   |-- spec.js


## Google Analytics

Add your tracking ID and Domain name in app.js in the app.config  section

      app.config(function (AnalyticsProvider) {
                  // Set a single account
                  AnalyticsProvider.setAccount('UA-XXXXX-xx');
                  AnalyticsProvider.setDomainName('XXX');

       });

For complete Documentation see the [wiki](https://github.com/Leo-G/Flask-Scaffold/wiki/Add-Google-Analytics-to-Angularjs-UI-Routes)
