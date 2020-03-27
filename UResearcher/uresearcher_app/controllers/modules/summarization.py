import argparse

from collections import defaultdict

from heapq import nlargest

from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.probability import FreqDist

from string import punctuation

#pass in the list of articles to summarize.
def summarize_articles(articles):
	#args = parse_arguments()
	data = ""

	for article in articles:
		if article['abstract'] != None:
			data += article['abstract'] + " "

	# try:
	#	 with open(filename, "r") as file:
	#		 data = file.read()

	# except IOError:
	#	 print(
	#		 f"Fatal Error: File ({filename}) could not be located or is not readable."
	#	 )
	#	 exit()

	content = sanitize_input(data)
	sentence_tokens, word_tokens = tokenize_content(content)
	sentence_ranks = score_tokens(word_tokens, sentence_tokens)

	return summarize(sentence_ranks, sentence_tokens, 6)



#def parse_arguments():
#	parser = argparse.ArgumentParser()
#	parser.add_argument("filepath", help="File name of text to summarize")
#	parser.add_argument(
#		"-l", "--length", default=6, help="Number of sentences to return"
#	)
#	args = parser.parse_args()
#

#	return args

#sanitizes the input.
def sanitize_input(data):
	replace = {ord("\f"): " ", ord("\t"): " ", ord("\n"): " ", ord("\r"): None}

	return data.translate(replace)


#this function tokenizes the content and traslates it into lower case.
def tokenize_content(content):
	stop_words = set(stopwords.words("english") + list(punctuation))
	words = word_tokenize(content.lower())

	return (sent_tokenize(content), [word for word in words if word not in stop_words])


#this function scores the token by taking in the filtered words.
def score_tokens(filterd_words, sentence_tokens):
	word_freq = FreqDist(filterd_words)

	ranking = defaultdict(int)

	for i, sentence in enumerate(sentence_tokens):
		for word in word_tokenize(sentence.lower()):
			if word in word_freq:
				ranking[i] += word_freq[word]

	return ranking

#Function that summarizes the given text.
def summarize(ranks, sentences, length):
	if length > len(sentences):
		print(
			"Error, more sentences requested than available. Use --l (--length) flag to adjust."
		)
		exit()

	indices = nlargest(length, ranks, key=ranks.get)
	final_sentences = [sentences[j] for j in sorted(indices)]

	return " ".join(final_sentences)

# filename = "/Users/riteshsharma/Desktop/UResearcher/UResearcher/UResearcher/uresearcher_app/controllers/modules/testFile.txt"

# print(summarize_articles(filename))