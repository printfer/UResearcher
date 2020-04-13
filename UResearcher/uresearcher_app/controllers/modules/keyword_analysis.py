import time
import re
import nltk
from nltk.collocations import *
from datetime import datetime
from .preprocessing import sentence_parsing
from textblob import TextBlob



#Generates keywords from grant text. 
#Returns a list of the keywords
def generate_grant_keywords(text):

	sentences = []
	keywords = []
	description = nltk.tokenize.sent_tokenize(text)
	
	for curr_sentence in description:
		
		preproc = sentence_parsing(curr_sentence)
		sentences.append(preproc)
		
	#Set up text for tokenization with nltk
	stringtest = ''	
	for lst in sentences:
		for v in lst:
			stringtest += ' ' + v
			
	words = nltk.tokenize.word_tokenize(stringtest)
	
	
	blobs = TextBlob(text)
	blobphrases = blobs.noun_phrases
	
	
	#Singular Word Frequencies.
	fdist1 = nltk.FreqDist(words)


	#Found holds all found keywords(Singles,Bigrams,Trigrams)
	found = []
	for val in fdist1.most_common(15):
		found.append(val[0])
		
	for val in blobphrases:
		found.append(val)


	res = ",".join(found)
	
	return found
	

#For the keywords in a grouping of articles, will return the filtered keywords and 
#their respective dates. 
def get_keywords(articles):


	worddict = {}
	sortdict = {}
	
	for article in articles:
		
		if article['keywords'] is None:
			continue
		else:
			
			date = article['publish_date']
			datespl = date.split("-")
			year = datespl[0]
			month = datespl[1]
			#day = datespl[2]
			
			#Set day to 1 to get frequencies for articles published in same month...
			refdate = year + "-" + month + "-" + "1"
			time = (datetime.strptime(refdate, '%Y-%m-%d') - datetime(1970,1,1)).total_seconds()
			
			
			#More preprocessing required. Removal of punctuation, empty space, and other characters.
			#Sometimes keyword lists aren't getting split, so sometimes keywords aren't within quotations? Will check up later.
			#SPLIT ON  COMMA AS WELL?
			lower = article['keywords'].lower()	
			lower = (lower.encode('ascii', 'ignore')).decode("utf-8")
			
			#temp = re.findall(r'"(.*?)"', lower)
			temp = lower.split(',')
			
			
			

			for val in temp:		
				if val == "":
					continue
			
				if "," not in val:
					if val in worddict:		
					
						if time in worddict[val]:
							worddict[val][time] = worddict[val][time] + 1
							
						else:
							worddict[val][time] = 1
							
							
					else:
						worddict[val] = {time:1}
						
						
					if val in sortdict:
						sortdict[val] = sortdict[val] + 1
					else:
						sortdict[val] = 1

					
					
				else:
					valsplit = val.split(",")
					valsplit = [x.strip() for x in valsplit]
					
					for nval in valsplit:
						if nval in worddict:		
					

							if time in worddict[nval]:
								worddict[nval][time] = worddict[nval][time] + 1
								
							else:
								worddict[nval][time] = 1
								
							
						else:
							worddict[nval] = {time:1}
							
							
						if nval in sortdict:
							sortdict[nval] = sortdict[nval] + 1
						else:
							sortdict[nval] = 1
	
	
	sr = sorted(sortdict.items(), key=lambda x: x[1], reverse=True)
	if len(sr) > 35:
		topres = sr[:35]
		topdict = dict(topres)
	else:
		topdict = dict(sr)
		
	
	#Set up objects for graphing. Look at return type for more info.
	kwdict = {}
	for k, v in worddict.items():
	
		if k in topdict:
			kwdict[k] = []
			
			for time, freq in v.items():
				kwdict[k].append({'x': time, 'y': freq})
		else:
			continue

	labels, frequencies = [label for label in kwdict], [kwdict[label] for label in kwdict]
	

	return labels, frequencies
	
	
	
###################################
#def generate_new_keywords(article):
#		
#	try:
#	
#	#Find keywords on an article to article basis
#	#for article in articles:	
#	
#		sentences = []	
#		#Generate keywords and use as primary keyword results
#		if article['keywords'] is None:
#			keywords = []
#				
#			#Generate keywords and append to publisher established keywords
#		else:
#			#Get established keywords, then do some basic preprocessing
#			##
#			## More preprocessing required here to avoid ANY duplicates
#			##
#			ktemp = article['keywords']
#			ktemp2 = ktemp.split(',')
#			keywords = [x.lower().lstrip() for x in ktemp2]
#			
#
#		## FULL TEXT VERSION
#		#if article.fulltext is None:
#		#	continue
#		#else: 			
#		#	article_sentences = nltk.tokenize.sent_tokenize(article.fulltext)
#
#				
#		## Abstracts Version
#		if article['abstract'] is None:
#			return None
#		else:
#			article_sentences = nltk.tokenize.sent_tokenize(article['abstract'])
#			
#		
#		blobs = TextBlob(article['abstract'])
#		
#		for curr_sentence in article_sentences:
#		
#			#Preprocessing(Remove stopwords)
#			preproc = sentence_parsing(curr_sentence)
#			sentences.append(preproc)
#		
#
#		#Set up text for tokenization with nltk
#		stringtest = ''	
#		for lst in sentences:
#			for v in lst:
#				stringtest += ' ' + v
#		
#		words = nltk.tokenize.word_tokenize(stringtest)
#
#
#		#Singular Word Frequencies.
#		fdist1 = nltk.FreqDist(words)
#			
#		#Set up redundancycheck, all to be added keywords go in here, and we will check against already established keywords.
#		redundancycheck = []
#
#		for val in fdist1.most_common(7):
#			redundancycheck.append(val[0])
#			
#
#		for val in blobs.noun_phrases:
#			redundancycheck.append(val)
#
#		added = []
#		for val in redundancycheck:
#				
#			#If this generated keyword is a duplicate, do not add. Otherwise, add it.
#			if val in keywords or val in added:
#				continue
#			else:
#				added.append(val)
#				temp = (val.encode('ascii', 'ignore')).decode("utf-8")
#				keywords.append(temp)
#
#		
#		
#		#Change keyword list back to string, then set it as the articles value.
#		article_keywords = ",".join(keywords)
#			
#		return article
#	
#	except UnicodeEncodeError:
#		return article['keywords']
