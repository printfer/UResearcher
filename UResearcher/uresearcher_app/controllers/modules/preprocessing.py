from gensim.parsing.preprocessing import preprocess_string, strip_tags, strip_punctuation, remove_stopwords, strip_numeric



#Processes a single sentence/string at a time
def sentence_parsing(sentence):

	#remove all non-ascii characters
	sentence = sentence.encode('ascii', 'ignore').decode('ascii')

	#May want to remove strip numeric in the future. Or give user a choice as this data may be important in certain context
	CUSTOM_FILTERS = [lambda x: x.lower(), remove_stopwords, strip_tags, strip_numeric, strip_punctuation]
	processed = preprocess_string(sentence, CUSTOM_FILTERS)

	return processed


#Pre-Process on an article to article basis. May be necessary for further multi-threading setup
def articles_parsing(articles):
	return
