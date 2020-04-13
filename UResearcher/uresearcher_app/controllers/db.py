# this will contain database table definitions and methods
from flask_sqlalchemy import SQLAlchemy
from ..supports import support
from elasticsearch import Elasticsearch
from string import punctuation
from .modules import query_parsing

db = SQLAlchemy()
# es = Elasticsearch(['https://search-test2-rafnssinwfmvmuhivk5gstd7lq.us-east-2.es.amazonaws.com']) # for development
es = Elasticsearch(['localhost:9200']) # for deployment

class CurrentSearch(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	title = db.Column(db.Text, nullable=False)
	abstract = db.Column(db.Text, nullable=True)
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
	fulltext = db.Column(db.Text, nullable=True)
	doi = db.Column(db.String(50), nullable=True)
	eid = db.Column(db.String(50), nullable=True)
	link = db.Column(db.Text, nullable=True)
	publisher = db.Column(db.Text, nullable=True)
	publish_date = db.Column(db.Text, nullable=True)
	keywords = db.Column(db.Text, nullable=True)
	cluster = db.Column(db.Text, nullable=False) # the only additional column

class Grants(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	keywords = db.Column(db.String(255), nullable = False)
	date = db.Column(db.Integer, nullable = False)
	floor = db.Column(db.Integer, nullable = True)
	ceiling = db.Column(db.Integer, nullable = True)
	close = db.Column(db.Integer, nullable = True)
	category = db.Column(db.String(255), nullable=True)

# init database
def db_init(app):
	global db
	db.init_app(app)
	with app.app_context():
		db.create_all()

## seed database
def db_seed():
	global db
	print("db in db_seed" + str(db))
	support.init_support('doaj')
	print("db seeded!")
	status = "Database seeding completed successfully!"
	return status

## delete database 
def db_delete():
	db.session.query(CurrentSearch).delete()
	db.session.query(SavedCluster).delete()
	db.session.commit()
	print("db deleted!")
	status = "Database deleted successfully!"
	return status
	
# queries the database for all articles that match this query, which would come from the searchbar
def search_articles(query):
	# query our elasticsearch database
	# size parameter is the maximum number of articles to be returned, using 100 for testing purposes
	articles = es.search(index='test_index', size='100', body={'query': {'match': {'title': query}}}, sort="publish_date:desc")
	# convert the returned object to the appropriate form
	articles = articles['hits']['hits']
	return_articles = [article['_source'] for article in articles]

	return return_articles

# saves the most recent search in the local db (for efficiency)
def save_current_search(articles):
	'''Saves the most recent search in the local db (for efficiency).'''
	# delete old search
	db.session.query(CurrentSearch).delete()
	# save new search
	for article in articles:
			record = CurrentSearch(title=article['title'], abstract=article['abstract'], fulltext=None, doi=article['doi'], eid=None, link=article['link'], publisher=article['publisher'], publish_date=article['publish_date'], keywords=article['keywords'])
			db.session.add(record)
	db.session.commit()

# gets the most recent search from the local db
def get_current_search():
	'''gets the most recent search from the local db'''
	articles = CurrentSearch.query.all()
	# convert from db objects to dictionaries
	return_articles = []
	for article in articles:
		dic = article.__dict__
		del dic['_sa_instance_state']
		return_articles += [article.__dict__]

	return return_articles

# saves a fresh set of clusters to a table so they can later be selected
def save_clusters(clusters):
	# delete old clusters
	db.session.query(SavedCluster).delete()
	# create new clusters
	for cluster in clusters:
		for article in clusters[cluster]:
			record = SavedCluster(title=article['title'], abstract=article['abstract'], fulltext=None, doi=article['doi'], eid=None, link=article['link'], publisher=article['publisher'], publish_date=article['publish_date'], keywords=article['keywords'], cluster=cluster)
			db.session.add(record)
	db.session.commit()

def get_cluster(cluster):
	articles = SavedCluster.query.filter_by(cluster=cluster).all()
	# convert from db objects to dictionaries
	return_articles = []
	for article in articles:
		dic = article.__dict__
		del dic['_sa_instance_state']
		return_articles += [article.__dict__]

	return return_articles

def save_grant(keywords, date, floor, ceiling, close, category):
	new_grant = Grants(keywords= keywords, date= date,floor= floor, ceiling= ceiling, close= close, category= category)
	db.session.add(new_grant)
	db.session.commit()


def get_grants(query, categories):
	grant_query = query_parsing.parse_query(query)
	grants =  Grants.query.all()
	return_grants = []
	for grant in grants:
		if grant.category in categories:
			keywords =  grant.keywords.split(",")
			for word in grant_query:
				if word in keywords:
					return_grants.append(grant.__dict__)
					break
	return return_grants


def delete_all_grants():
	db.session.query(Grants).delete()
	db.session.commit()
	status = "Grant database deleted successfully!"
	return status
