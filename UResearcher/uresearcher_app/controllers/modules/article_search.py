from json import loads
from os import mkdir, path
from requests import get
import yaml


# ELS_API_KEY = ""
count = 20

# def set_api_key(key):
# 	ELS_API_KEY = key

#PROJECT_ROOT = __file__ +"/../../../"

#PROJECT_ROOT = os.path.abspath(PROJECT_ROOT)

#with open(PROJECT_ROOT + "/instance/config.yaml", 'r') as config:
#	try:
#		yaml_config = yaml.safe_load(config)
#		ELS_API_KEY = yaml_config["ELS_API_KEY"]
#	except yaml.YAMLError as exc:
#		print(exc)

## Article Info
# class Article:
# 	def __init__(self, title, creator, doi, eid, text, key):
# 		self.title = title
# 		self.creator = creator
# 		self.doi = doi
# 		self.eid = eid
# 		self.text = text
# 		ELS_API_KEY = key

# def get_article_retrieval_doi_url(doi): return "https://api.elsevier.com/content/article/doi/" + doi + "?APIKey=" + ELS_API_KEY
# def get_article_retrieval_eid_url(eid): return "https://api.elsevier.com/content/article/eid/" + eid + "?APIKey=" + ELS_API_KEY

def checkConnectionStatus(response):
	if response.status_code == 200:
		return True
	elif response.status_code == 404:
		return False
	else:
		return False


def article_search(query, ELS_API_KEY):
	articles = []

	## Query details
	database = {"affiliation": "affiliation", "author": "author", "sciencedirect": "sciencedirect", "scopus": "scopus"}
	url = "https://api.elsevier.com/content/search/" + database["scopus"] + "?query=" + query + "&apiKey=" + ELS_API_KEY + "&count=" + str(count)
	header = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}

	## GET
	response = get(url, headers=header)
	checkConnectionStatus(response)

	## Check valid content
	rContent = response.content
	rJson = loads(rContent)
	for item in rJson["search-results"]["entry"]:
		hasId = 0
		eid = ""
		doi = ""
		if "prism:doi" in item:
			hasId = 1
			doi = item["prism:doi"]
		if "eid" in item:
			hasId = 1
			eid = item["eid"]
		if not hasId:
			continue
		if "dc:title" in item:
			title = item["dc:title"]
		if "dc:creator" in item:
			creator = item["dc:creator"]

		abstract = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English..."
		articles.append({'title': title, 'creator': creator, 'doi': doi, 'eid': eid, 'text': "", 'abstract': abstract})

	return articles


def get_articles_text(articles, ELS_API_KEY):
	article_retrieval_header = {'content-type': 'application/json', 'Accept-Charset': 'UTF-8'}
	text = ''
	for article in articles:
		if article['doi'] is not None:
			doi_url = "https://api.elsevier.com/content/article/doi/" + article['doi'] + "?APIKey=" + ELS_API_KEY
			response_article_doi = get(doi_url, headers=article_retrieval_header)

			if checkConnectionStatus(response_article_doi):
				text = str(response_article_doi.content)

		if text == '' and article['eid'] is not None:
			eid_url = "https://api.elsevier.com/content/article/eid/" + article['eid'] + "?APIKey=" + ELS_API_KEY
			response_article_eid = get(eid_url, headers=article_retrieval_header)

			if checkConnectionStatus(response_article_eid):
				text = str(response_article_eid.content)

		article['text'] = text

	return articles

## For debugging purposes ##
# article_search("computer science")
