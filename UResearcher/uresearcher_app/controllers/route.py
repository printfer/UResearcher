from flask import (jsonify, make_response, redirect,
				   render_template, request, session)
from flask_restful import Api, Resource
from . import db

from .modules.clustering import make_clusters
from .modules.grant_analysis import complete_analysis, complete_update, daily_update
from .modules.keyword_analysis import get_keywords, generate_new_keywords, generate_grant_keywords
from .modules.latent_knowledge_analysis import get_2d_projection, get_cosine_list, get_phrase_connections, get_analogy_list
from .modules.citation_analysis import citation_count_query


def route_init(app):
	#############################
	## Navigation Page Routing 
	#############################

	# Index Page
	@app.route('/')
	@app.route('/index')
	def index():
		return render_template('index.html', title='Home')

	# About Page
	@app.route('/about')
	def about():
		return render_template('about.html')

	# Help Page
	@app.route('/settings')
	def help():
		return render_template('settings.html')

	# Feedback Page
	@app.route('/feedback')
	def feedback():
		return render_template('feedback.html')


	#############################
	## Datebase Page Routing 
	#############################
	@app.route('/db')
	def db_page():
		# seed db
		requestSeed = request.args.get('seed')
		requestSeed = str(requestSeed).lower()
		if(requestSeed == 'true'):
			status = db.db_seed()
			return render_template('db.html', notification=status)
		# delete db
		requestDelete = request.args.get('delete')
		requestDelete = str(requestDelete).lower()
		if(requestDelete == 'true'):
			status = db.db_delete()
			return render_template('db.html', notification=status)
		# Seeding All Grants
		requestSeed = request.args.get('seedgrantsall')
		requestSeed = str(requestSeed).lower()
		if(requestSeed == 'true'):
			grants = complete_update()
			for grant in grants.keys():
				text = grant + " " + grants[grant]["Description"]
				db.save_grant(text, grants[grant]["Post"], grants[grant]["Floor"], grants[grant]["Ceiling"])
			return render_template('db.html', notification=status)
		# Seeding the recently added grants
		requestSeed = request.args.get('seedgrantsdaily')
		requestSeed = str(requestSeed).lower()
		if(requestSeed == 'true'):
			grants = daily_update()
			for grant in grants.keys():
				text = grant + " " + grants[grant]["Description"]
				db.save_grant(text, grants[grant]["Post"], grants[grant]["Floor"], grants[grant]["Ceiling"])
			return render_template('db.html', notification=status)
		# Deleting All Grants
		requestDelete = request.args.get('deletegrants')
		requestDelete = str(requestDelete).lower()
		if(requestDelete == 'true'):
			status = db.delete_all_grants()
			return render_template('db.html', notification=status)
		return render_template('db.html')

	#############################
	## Search Page Routing 
	#############################

	# Search
	@app.route('/search')
	def search():
		query = request.args.get('query')
		return render_template('search_results.html', title='Search')

	# # Clustering Direct Route
	# @app.route('/clustering')
	# def cluster_direct():
	# 	query = request.args.get('query')
	# 	return render_template('search_results.html', query=query, active='cluster')

	# # LKA Direct Route
	# @app.route('/lka')
	# def lka_direct():
	# 	query = request.args.get('query')
	# 	return render_template('search_results.html', query=query, active='lka')



	## AJAX methods for react

	# Article Search
	@app.route('/search/<string:query>')
	def article_search(query):
		article_list = db.search_articles(query)
		db.save_current_search(article_list)
		return jsonify({'article_list': article_list})

	# Get Clusters
	@app.route('/clusters/<string:query>')
	def get_clusters(query):
		article_list = db.get_current_search()
		clusters = make_clusters(article_list)
		db.save_clusters(clusters) # save clusters to db for later retreval
		# final data should be in form { nodes: [], links: [] }
		nodes = [{'id': 'root', 'name': query, 'val': 10}]
		nodes += [{'id': cluster, 'name': cluster, 'val': 5} for cluster in clusters]
		links = [{'source': 'root', 'target': node['id']} for node in nodes[1:]]
		return jsonify({'clusters': {'nodes': nodes, 'links': links}})

	@app.route('/select-cluster/<string:cluster>')
	def select_cluster(cluster):
		new_articles = db.get_cluster(cluster)
		db.save_current_search(new_articles)
		return jsonify({'articles': new_articles})
		

	# Grant Analysis
	@app.route('/grant/<string:query>')
	def get_grant_analysis(query):
		floors, ceilings = complete_analysis(db.get_grants(query))
		return jsonify({'floors': floors, 'ceilings': ceilings})


	# Keyword Analysis
	@app.route('/keyword')
	def get_keyword_analysis():
		article_list = db.get_current_search()
		labels, frequencies = get_keywords(article_list)
		return jsonify({'data': frequencies, 'labels': labels})

	# LKA Vocab (for autocomplete text fields)
	@app.route('/vocab')
	def get_vocab():
		# get the article list
		article_list = db.get_current_search()
		# convert articles to 2d phrase projection, discard the vectors
		small_vecs, vocab = get_2d_projection(article_list)
		return jsonify({'vocab': sorted(vocab)})

	#tsne graph
	@app.route('/tsne')
	def tsne_ajax():
		# get the article list
		article_list = db.get_current_search()
		# convert articles to 2d phrase projection
		small_vecs, vocab = get_2d_projection(article_list)
		# put the resulting vectors into the appropriate form
		data = [{'x': vec[0], 'y': vec[1]} for vec in small_vecs]
		return jsonify({'data': data, 'labels': vocab})

	# cosine similarity
	@app.route('/cosine/<string:phrase_query>')
	def cosine_ajax(phrase_query):
		# get the article list
		article_list = db.get_current_search()
		# get the cosine similarity list for the query
		word_list = get_cosine_list(article_list, phrase_query)
		return jsonify({'word_list': word_list})

	# phrase connections
	@app.route('/phrase', methods=['POST'])
	def lka_connections():
		# extract json data
		main_phrase = request.json['main_phrase']
		tert_phrases = request.json['tert_phrases']
		connections = request.json['connections']
		# get the article list
		article_list = db.get_current_search()
		# get phrase connections and return
		nodes, connections = get_phrase_connections(article_list, main_phrase, tert_phrases, connections)
		return jsonify({'clusters': {'nodes': nodes, 'links': connections}})

	# analogies
	@app.route('/analogy/<string:word1>/<string:word2>/<string:word3>')
	def lka_analogy(word1, word2, word3):
		# get the article list
		article_list = db.get_current_search()
		# get analogy results 
		analogy = get_analogy_list(article_list, word1, word2, word3)
		return jsonify({'word_list': analogy})
