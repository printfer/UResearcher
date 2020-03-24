import os
import json
from ..controllers import db

def init_support(resource_name):
	if (resource_name == 'doaj'):
		get_doaj_resources()

def get_doaj_resources():
	test = os.getcwd()
	# print("test" + test)
	for i in range(1, 2):
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
					temp = json.dumps(row['keywords'])
					#temp = json.loads(row['keywords'])
					strtemp = temp 
					keywords = strtemp
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
				# add row to db
				# db.db_add_record(row['title'], abstract, abstract_formatted, None, doi, None, link, publisher, publish_date, keywords)
				db_articles += [{'title': row['title'], 'abstract': abstract, 'abstract_formatted': abstract_formatted, 'fulltext': None, 'doi': doi, 'eid': None, 'link': link, 'publisher': publisher, 'publish_date': publish_date, 'keywords': keywords}]
				# print(db_articles)
				# input('waiting for input...')
			db.db_add_records(db_articles)