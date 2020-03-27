import time
import re
import nltk
from datetime import datetime
from .preprocessing import sentence_parsing

#Generates keywords from grant text. 
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
	
	#Singular Word Frequencies.
	fdist1 = nltk.FreqDist(words)

	#bigrams
	bgs = nltk.bigrams(words)	
	fdist2 = nltk.FreqDist(bgs)
			
	#Trigrams
	tgs = nltk.trigrams(words)
	fdist3 = nltk.FreqDist(tgs)
			
	#Create sorted list from the dict. 
	output = sorted(fdist2.items(), key=lambda x: x[1], reverse=True)
	output2 = sorted(fdist3.items(), key=lambda x: x[1], reverse=True)
			
	#Found holds all found keywords(Singles,Bigrams,Trigrams)
	found = []
	for val in fdist1.most_common(5):
		found.append(val[0])

	for val in output:
		#Change bias parameter here?
		if val[1] > 2:
			tempkeyword = val[0][0] + " " + val[0][1]		
			found.append(tempkeyword)
				
		
	for val in output2:
		#Change bias parameter here?
		if val[1] > 2:
			tempkeyword = val[0][0] + " " + val[0][1] + " " + val[0][2]
			found.append(tempkeyword)
				
	#Change keyword list back to string
	res = ', '.join(keywords)
	
	return res
	
	
#test = get_keywords(CurrentSearch.query.all())

#For the keywords in a grouping of articles, will return the filtered keywords and 
#their respective dates. 
#Note: these are currently the innate keywords for a given article, as given by the publisher. 
def get_keywords(articles):

	#generate_new_keywords(articles)
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
		#print("TOP:", topdict)
	else:
		#print(sr)
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
	
	#for i in range(len(labels)):
		#print("LABEL:", labels[i], "FREQ:", frequencies[i])
	
	#print("\n\nlabels:", labels)
	#print("\n\nfreqs:", frequencies)

	return labels, frequencies
