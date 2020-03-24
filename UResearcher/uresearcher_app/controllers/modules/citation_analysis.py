import re
from requests import get
from json import loads



def citation_count_query(article,api_key):

	if article['doi'] is None:
		return None
	query = article['doi']
	
	url = "https://api.elsevier.com/content/search/scopus?query=DOI(" + query + ")&field=citedby-count" 
	header = {'content-type': 'application/json', 'X-ELS-APIKey': api_key}
	response = get(url, headers=header)
	
	
	if response.status_code == 200:
		content = response.content
		jsonresponse = loads(content)
		
		for item in jsonresponse["search-results"]["entry"]:
		
			#if "prism:url" in item:
				#prismurl = item["prism:url"]
			
			if "citedby-count" in item:
				citecount = item["citedby-count"]
				#print("CITE COUNT:", citecount)
				return citecount
	else:
		#print("Response:", response.status_code)
		return None
		

#def citation_information_query(query,api_key):
	
#	print("\n" + query)
	#https://api.elsevier.com/content/abstract/citations?doi=10.1287%2Fmnsc.42.4.541&apiKey={apiKey}&httpAccept=application%2Fjson
	
	#Good request, bad permissions. 
#	url = "https://api.elsevier.com/content/abstract/citations?doi=" + query + "&apiKey=" + api_key + "&httpAccept=application%2Fjson"
	
	#https://api.elsevier.com/content/abstract/EID:[]?apiKey=[]&view=REF
	
	## Not working yet
	#url = "https://api.elsevier.com/content/abstract/EID:" + query + "?apiKey=" + api_key +"&view=REF"
	#header = {'content-type': 'application/json'} # 'X-ELS-APIKey': api_key}
	#response = get(url, headers=header)
	
#	response = get(url)
	
#	if response.status_code == 200:
#		content = response.content
#		jsonresponse = loads(content)
		
#		print("JSON RES:", jsonresponse)
		
#	else:
#		print("RESPONSE:", response.text)
#		print("Response code:", response.status_code)
#		this = ""


#Broken. Internal error server side everytime....
#def citation_info_query_opencit(query):
	
#	url = "https://opencitations.net/index/coci/api/v1/metadata/" + query 
	
#	response = get(url)
	
#	if response.status_code == 200:
#		content = response.content
#		jsonresponse = loads(content)
		
#		print("JSON RES:", jsonresponse)
	
#	else:
		#Keep getting internal server errors.. Not sure where to go from there. 
#		print(response.text)



#def retrieve_article_citations(article, api_key):
		
		#test_retrieve(article, api_key)
	
		#if article['doi'] is None:
		#	continue
		#else:
		#	tempcount = citation_count_query(article['doi'],api_key)
		
		# Further citation information requires special permissions from elsevier.
		# Still working on this, will need to talk to Prof. Wang to have him email Integration Staff. 
		
		#if article['doi'] is None:
		#	continue
		#else:
		#	tempinf = citation_information_query(article['doi'], api_key)
		
	
#def test_retrieve(articles, api_key):
	
#	sendstring = ""
	
#	count = 0
	
#	for article in articles:
#		count = count + 1
#		if count == 6:
#			break
		#print("ARTICLE:", article)
		
		#if article['doi'] is None:
		#	continue
		#else:
		#	tempcount = citation_count_query(article['doi'],api_key)
		
		
		# Further citation information requires special permissions from elsevier.
		# Still working on this, will need to talk to Prof. Wang to have him email Integration Staff. 
		
#		if article['doi'] is None:
#			continue
	#	else:
			#tempinf = citation_information_query(article['doi'], api_key)
	#		sendstring = sendstring + article['doi'] + "__"
	
	#citation_info_query_opencit(sendstring)


	

