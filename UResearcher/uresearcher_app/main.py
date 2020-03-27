## OS
import os
## Flask
from flask import Flask
## Controllers
from .controllers import db
from .controllers import api
from .controllers import route

## Init App ##

"""Create and configure an instance of the Flask application."""
app = Flask(__name__, instance_relative_config=True)

# default config
app.config.from_mapping(
    # a default secret that should be overridden by instance config
    SECRET_KEY="key",
    # default db path
    SQLALCHEMY_DATABASE_URI = "sqlite:///uresearcher.db",
    # FSADeprecationWarning: SQLALCHEMY_TRACK_MODIFICATIONS adds significant overhead and will be disabled by default in the future.  Set it to True or False to suppress this warning.
    SQLALCHEMY_TRACK_MODIFICATIONS= False
)

# load the instance config
app.config.from_pyfile('config.py', silent=True)

# use the function below to get value in configure file 
# print(app.config.get("SECRET_KEY"))

## Init DB ##
db.db_init(app)

## Init route ##
route.route_init(app)
