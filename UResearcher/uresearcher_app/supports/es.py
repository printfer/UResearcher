from elasticsearch import Elasticsearch#, RequestsHttpConnection
from elasticsearch.helpers import bulk
import json
import time
import re
import nltk
from datetime import datetime
from textblob import TextBlob
from gensim.parsing.preprocessing import preprocess_string, strip_tags, strip_punctuation, remove_stopwords, strip_numeric

#Processes a single sentence/string at a time
def sentence_parsing(sentence):

	#remove all non-ascii characters
	sentence = sentence.encode('ascii', 'ignore').decode('ascii')

	#May want to remove strip numeric in the future. Or give user a choice as this data may be important in certain context
	CUSTOM_FILTERS = [lambda x: x.lower(), remove_stopwords, strip_tags, strip_numeric, strip_punctuation]
	processed = preprocess_string(sentence, CUSTOM_FILTERS)

	return processed

#This will generate new keywords for an article(based on frequency of occurance)
#Returns a list of the keywords.
def generate_new_keywords(article_keywords, article_abstract):
	try:
	
	#Find keywords on an article to article basis
	#for article in articles:	
	
		sentences = []	
		#Generate keywords and use as primary keyword results
		if article_keywords is None:
			keywords = []
				
			#Generate keywords and append to publisher established keywords
		else:
			#Get established keywords, then do some basic preprocessing
			##
			## More preprocessing required here to avoid ANY duplicates
			##
			ktemp = article_keywords
			ktemp2 = ktemp.split(',')
			keywords = [x.lower().lstrip() for x in ktemp2]
				
				
		## FULL TEXT VERSION
		#if article.fulltext is None:
		#	continue
		#else: 			
		#	article_sentences = nltk.tokenize.sent_tokenize(article.fulltext)

			
				
		## Abstracts Version
		if article_abstract is None:
			return None
		else:
			article_sentences = nltk.tokenize.sent_tokenize(article_abstract)
			
			
		blobs = TextBlob(article_abstract)
			
		for curr_sentence in article_sentences:
		
			#Preprocessing(Remove stopwords)
			preproc = sentence_parsing(curr_sentence)
			sentences.append(preproc)
		
					
		#Set up text for tokenization with nltk
		stringtest = ''	
		for lst in sentences:
			for v in lst:
				stringtest += ' ' + v
			
		words = nltk.tokenize.word_tokenize(stringtest)


		#Singular Word Frequencies.
		fdist1 = nltk.FreqDist(words)

		#Set up redundancycheck, all to be added keywords go in here, and we will check against already established keywords.
		redundancycheck = []
		
		for val in fdist1.most_common(7):
			redundancycheck.append(val[0])


		for val in blobs.noun_phrases:
			redundancycheck.append(val)
		
		added = []
		for val in redundancycheck:
				
			#If this generated keyword is a duplicate, do not add. Otherwise, add it.
			if val in keywords or val in added:
				continue
			else:
				added.append(val)
				temp = (val.encode('ascii', 'ignore')).decode("utf-8")
				keywords.append(temp)
			
		
		# throw out keywords less than 5 characters
		final = []
		for keyword in keywords:
			if len(keyword) > 4:
				final += [keyword]

		#Change keyword list back to string, then set it as the articles value.
		article_keywords = ','.join(final)
			
		return article_keywords
	
	except UnicodeEncodeError:
		return article_keywords

def get_articles():
	# count = 0
	for i in range(6, 16):
		with open('C:/Users/Will/Desktop/CS/UResearcher/UResearcher/uresearcher_app/supports/doaj_article_data/article_batch_' + str(i) + '.json') as articles:
			data = json.load(articles)
			db_articles = []
			for row in data:
				publish_date = row['created_date'][:10]
				row = row['bibjson']
				# clean json
				doi = None
				abstract = None
				link = None
				keywords = None
				if 'title' not in row:
					continue
				for identifier in row['identifier']:
					if identifier['type'] == 'doi' and 'id' in identifier:
						doi = identifier['id']						
				if 'keywords' in row:
					keywords = ", ".join(row['keywords'])
				if 'abstract' in row:
					abstract = row['abstract']
				if len(row['link']) > 0:
					link = row['link'][0]['url']
				publisher = row['journal']['publisher']
				if abstract != None and len(abstract) > 500:
					abstract_formatted = abstract[:500] + "..."
				elif abstract == None:
					abstract_formatted = "Abstract not found."
				else:
					abstract_formatted = abstract

				keywords = generate_new_keywords(keywords, abstract)

				# yield {'_index': 'test_index', 'title': row['title'], 'abstract': abstract, 'abstract_formatted': abstract_formatted, 'doi': doi, 'link': link, 'publisher': publisher, 'publish_date': publish_date, 'keywords': keywords}
				yield {'_index': 'test_index', 'title': row['title'], 'abstract': abstract, 'doi': doi, 'link': link, 'publisher': publisher, 'publish_date': publish_date, 'keywords': keywords}
				# count += 1
		print('done', i)


#es = Elasticsearch(['https://search-test2-rafnssinwfmvmuhivk5gstd7lq.us-east-2.es.amazonaws.com'])
es = Elasticsearch(['localhost:9200'])
# es.indices.delete('test_index')
bulk(es, get_articles())

# print('done')

# es.index(index='test_index', id=1, body={'text': 'this is a test'})
# es.index(index='test_index', id=2, body={'text': 'a second test'})
# search = es.search(index='test_index', body={'query': {'match': {'title': 'computer science'}}})
# print(search)
# articles = es.search(index='test_index', size='10000', body={'query': {'match': {'title': 'test'}}})
# articles = es.search(index='test_index', size='10000', body={'query': {'match': {'title': query}}})
# articles = articles['hits']['hits']
# return_articles = [article['_source'] for article in articles]