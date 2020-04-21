from gensim.models import Word2Vec
from gensim.test.utils import common_texts
from sklearn.manifold import TSNE
from nltk import tokenize
from .preprocessing import sentence_parsing
#from flask import jsonify

import multiprocessing
import time

## Aside from using the abstract/fulltext of an article, we need to split them into sentences before splitting into words
def get_wordvecs(articles):


	#if len(articles) < 10:
	#	print("\n\nLKA CHECKED")
	#	return jsonify('Not enough articles available to train the model')


	cores = multiprocessing.cpu_count()
	sentences = []

	for article in articles:
		# if 'text' in article and article['text'] != '':
		# 	sentences.append(article['text'].split())
		# elif 'abstract' in article and article['abstract'] != '':
		# 	sentences.append(article['abstract'].split())
		# else:
		#sentences.append(article.title.split())
		
		
		## FULL TEXT VERSION
		#if article.fulltext is None:
		#	continue
		#else: 			#Include Title in sentences?
		#	article_sentences = tokenize.sent_tokenize(article.fulltext)
		#	
		#	for curr_sentence in article_sentences:
		#		sentences.append(nltk.word_tokenize(curr_sentence))
		
		
		## Abstracts Version
		if article['abstract'] is None:
			continue
		else:
			#Eventually this step should be moved into the preprocessing module, tokenization 
			#and pre processing should and can be done at the same time. Also, splitting up
			#and feeding articles/sentences into the model in groups may be required for 
			#fast multi-threading when the datasets are huge. 
			article_sentences = tokenize.sent_tokenize(article['abstract'])
			
			for curr_sentence in article_sentences:
			
				preproc = sentence_parsing(curr_sentence)
			
				#sentences.append(tokenize.word_tokenize(preproc))
				#print(tokenize.word_tokenize(curr_sentence))
				
				
				sentences.append(preproc)
				

	
	model = Word2Vec(sentences, min_count=3, workers=cores-1)
	#model.build_vocab(sentences, progress_per=10000)


	return model.wv

def get_2d_projection(articles):
	vectors = get_wordvecs(articles)

	vocab = [word for word in vectors.vocab]
	wordvecs = []
	for word in vocab:
		wordvecs.append(vectors[word])

	embedded = TSNE(n_components=2).fit_transform(wordvecs)
	return embedded.tolist(), vocab

def get_cosine_list(articles, query):
	vectors = get_wordvecs(articles)
	return vectors.similar_by_word(word=query, topn=10)

def get_phrase_connections(articles, main_phrase, tert_phrases, connections):
	wv = get_wordvecs(articles)
	# get the N most similar words to each main phrase/tertiary phrase pair
	temp_nodes = [main_phrase] + tert_phrases
	final_connections = []
	for i in range(len(tert_phrases)):
		# temp_connections = get_connections(wv, main_phrase, tert_phrases[i], int(connections[i]))
		temp_connections = wv.most_similar(positive=[main_phrase, tert_phrases[i]], topn=connections[i])
		for con in temp_connections:
			final_connections += [{'source': main_phrase, 'target': con[0]}]
			final_connections += [{'source': con[0], 'target': tert_phrases[i]}]
			if con[0] not in temp_nodes:
				temp_nodes += [con[0]]
	
	final_nodes = []
	for node in temp_nodes:
		final_nodes += [{'name': node, 'id': node}]

	return final_nodes, final_connections

def get_connections(wv, main, tertiary, connections):
	most_similar = wv.most_similar(positive=[main, tertiary], topn=connections)
	return most_similar

def get_analogy_list(articles, word1, word2, word3):
	wv = get_wordvecs(articles)
	# use wv.accuracy or wv.evaluate_word_analogies to get the top N contendors to finish this analogy
	# return as a list of tuples/lists where index 0 is the word and index 2 is its 'accuracy'
	
	
	#Amount of similars words/vectors to return.
	similarcount = 5
	
	
	#results = wv.similar_by_word(wv[word1] - wv[word2] + wv[word3])
	results = wv.similar_by_vector(wv[word1] - wv[word2] + wv[word3], similarcount)
	
	
	#Return type is a list of tuples where the tuple is (string, float) for the word and 
	return results