from elasticsearch import Elasticsearch#, RequestsHttpConnection
from elasticsearch.helpers import bulk
import json

def get_articles():
	# count = 0
	for i in range(1, 16):
		with open('uresearcher_app/supports/doaj_article_data/article_batch_' + str(i) + '.json') as articles:
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
					if identifier['type'] == 'doi':
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

				yield {'_index': 'test_index', 'title': row['title'], 'abstract': abstract, 'abstract_formatted': abstract_formatted, 'doi': doi, 'link': link, 'publisher': publisher, 'publish_date': publish_date, 'keywords': keywords}
				# count += 1
		print('done', i)


es = Elasticsearch(['https://search-test2-rafnssinwfmvmuhivk5gstd7lq.us-east-2.es.amazonaws.com'])
# es.indices.delete('test_index')
# bulk(es, get_articles())

# print('done')

# es.index(index='test_index', id=1, body={'text': 'this is a test'})
# es.index(index='test_index', id=2, body={'text': 'a second test'})
# search = es.search(index='test_index', body={'query': {'match': {'title': 'computer science'}}})
# print(search)
# articles = es.search(index='test_index', size='10000', body={'query': {'match': {'title': 'test'}}})
# articles = es.search(index='test_index', size='10000', body={'query': {'match': {'title': query}}})
# articles = articles['hits']['hits']
# return_articles = [article['_source'] for article in articles]