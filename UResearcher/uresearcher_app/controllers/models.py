from flask_sqlalchemy import SQLAlchemy
from ..main import app
# from ..supports import support

db = SQLAlchemy(app)

class Article(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.Text, nullable=False)
	abstract = db.Column(db.Text, nullable=True)
	abstract_formatted = db.Column(db.Text, nullable=True)
	fulltext = db.Column(db.Text, nullable=True)
	doi = db.Column(db.String(50), nullable=True)
	eid = db.Column(db.String(50), nullable=True)
	link = db.Column(db.Text, nullable=True)
	publisher = db.Column(db.Text, nullable=True)
	publish_date = db.Column(db.Text, nullable=True)
	keywords = db.Column(db.Text, nullable=True)

class SavedCluster(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.Text, nullable=False)
	abstract = db.Column(db.Text, nullable=True)
	abstract_formatted = db.Column(db.Text, nullable=True)
	fulltext = db.Column(db.Text, nullable=True)
	doi = db.Column(db.String(50), nullable=True)
	eid = db.Column(db.String(50), nullable=True)
	link = db.Column(db.Text, nullable=True)
	publisher = db.Column(db.Text, nullable=True)
	publish_date = db.Column(db.Text, nullable=True)
	keywords = db.Column(db.Text, nullable=True)
	cluster = db.Column(db.Text, nullable=False)

class Grants(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	keywords = db.Column(db.String(255), nullable = False)
	date = db.Column(db.Integer, nullable = False)
	close = db.Column(db.Integer, nullable = True)
	floor = db.Column(db.Integer, nullable = True)
	ceiling = db.Column(db.Integer, nullable = True)
	category = db.Column(db.String(255), nullable=True)

class Citations(db.Model):
	id = db.Column(db.String(1250), primary_key=True)
	citations = db.Column(db.String(1250), nullable = True)
	citation_dates = db.Column(db.String(1250), nullable = True)
	references = db.Column(db.String(1250), nullable = True)
	reference_dates = db.Column(db.String(1250), nullable = True)

class Feedback(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.String(255), nullable=False)
	comment = db.Column(db.String(255), nullable=False)