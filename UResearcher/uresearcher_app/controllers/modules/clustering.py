from sklearn.feature_extraction.text import HashingVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import Normalizer
from sklearn.cluster import MiniBatchKMeans
from sklearn.decomposition import TruncatedSVD
from nltk import word_tokenize, pos_tag
from nltk.stem.snowball import SnowballStemmer
from collections import Counter

num_features = 10000 	# number of features to extract from articles
num_clusters = 5	 	# number of clusters to create

class Cluster:
	def __init__(self, label, articles):
		self.label = label
		self.articles = articles

stemmer = SnowballStemmer("english")

#Read the list of all possible names and minimize errors.
def readFromListToIgnore():
	resultMap = []
	f = open("uresearcher_app/controllers/modules/name_list.txt", "r")
	for val in f:
		resultMap.append(val)
	return resultMap


def stemmingNoun(allNouns):
	allNounsAfterStemming = []
	for nouns in allNouns:
		if allNounsAfterStemming.__contains__(stemmer.stem(nouns)):
			continue
		else:
			allNounsAfterStemming.append(stemmer.stem(nouns))
	return allNounsAfterStemming
				
#This function returns list of nouns eliminating all the duplicates without stemming.
def withoutStemming(allNouns):
	withoutStemming = []
	for nouns in allNouns:
		if withoutStemming.__contains__(nouns):
			continue
		else:
			withoutStemming.append(nouns)
	return withoutStemming

#This function counts the frequency of all the nouns.
def countFrequency(allNouns):
	frequencyCounter = Counter()
	for nouns in allNouns:
		frequencyCounter[nouns] += 1
	return frequencyCounter


#This function returns the top ten clusters to be evaluated.
def returnTopTenClusters(frequencyCounter):
	clusterList = []
	m = readFromListToIgnore()
	for key, value in frequencyCounter.most_common(10):
		if key not in m:
			clusterList.append(key)
	return clusterList

# generates a label for a given cluster
def getClusterLabel(cluster):
	# gets a list of all nouns from articles
	allNouns = []
	for article in cluster:
		if article['abstract'] is None:
			continue
		
		text = word_tokenize(article['abstract']) ## CURRENTLY USING ABSTRACTS
		tagged = pos_tag(text)
		
		nouns = [word for (word, pos) in tagged if pos in ['NN','NNP','NNS','NNPS']]
		for i in nouns:
			allNouns.append(i.lower())

	# gets most frequent nouns
	data = withoutStemming(allNouns)
	freqCount = countFrequency(data)
	topTen = returnTopTenClusters(freqCount)
	
	# returns most frequent
	if not topTen or topTen is None:
		return "Empty"
	else:
		return topTen[0]

def make_clusters(articles):
	# transform articles into vectors
	hasher = HashingVectorizer(n_features=num_features, norm=None)
	vectorizer = make_pipeline(hasher, TfidfTransformer())
	X = vectorizer.fit_transform([article['title'] for article in articles])

	# dimensionality reduction
	svd = TruncatedSVD(n_components=100)
	normalizer = Normalizer(copy=False)
	lsa = make_pipeline(svd, normalizer)
	#X = lsa.fit_transform(X)

	# do clustering
	km = MiniBatchKMeans(n_clusters=num_clusters, init='k-means++')
	km.fit(X)

	# sort articles into clusters
	labels = km.labels_
	clusters = {}

	for x in range(len(articles)):
		if str(labels[x]) not in clusters:
					clusters[str(labels[x])] = [articles[x]]
		else:
			clusters[str(labels[x])].append(articles[x])

	## get labels for clusters
	labeled_clusters = {}
	for cluster in clusters:
		label = getClusterLabel(clusters[cluster])
		labeled_clusters[label] = clusters[cluster]

	return labeled_clusters



# stemmer = SnowballStemmer("english")
  
# def stemmingNoun(allNouns):
# 	allNounsAfterStemming = []
# 	for nouns in allNouns:
# 		if allNounsAfterStemming.__contains__(stemmer.stem(nouns)):
# 			continue
# 		else:
# 			allNounsAfterStemming.append(stemmer.stem(nouns))
# 	return allNounsAfterStemming
				
# #This function returns list of nouns eliminating all the duplicates without stemming.
# def withoutStemming(allNouns):
# 	withoutStemming = []
# 	for nouns in allNouns:
# 		if withoutStemming.__contains__(nouns):
# 			continue
# 		else:
# 			withoutStemming.append(nouns)
# 	return withoutStemming

# #This function counts the frequency of all the nouns.
# def countFrequency(allNouns):
# 	frequencyCounter = Counter()
# 	for nouns in allNouns:
# 		frequencyCounter[nouns] += 1
# 	return frequencyCounter


# #This function returns the top ten clusters to be evaluated.
# def returnTopTenClusters(frequencyCounter):
# 	clusterList = []
# 	for key, value in frequencyCounter.most_common(10):
# 		clusterList.append(key)
# 	return clusterList

# # generates a label for a given cluster
# def getClusterLabel(cluster):
# 	# gets a list of all nouns from articles
# 	allNouns = []
# 	for article in cluster:
# 		if article['abstract'] is None:
# 			continue
		
# 		text = word_tokenize(article['abstract']) ## CURRENTLY USING ABSTRACTS
# 		tagged = pos_tag(text)
		
# 		nouns = [word for (word, pos) in tagged if pos in ['NN','NNP','NNS','NNPS']]
# 		for i in nouns:
# 			allNouns.append(i.lower())

# 	# gets most frequent nouns
# 	data = withoutStemming(allNouns)
# 	freqCount = countFrequency(data)
# 	topTen = returnTopTenClusters(freqCount)
# 	# returns most frequent
# 	return topTen[0]

# def make_clusters(articles):
# 	## make article clusters
# 	# transform articles into vectors
# 	hasher = HashingVectorizer(n_features=num_features, norm=None)
# 	vectorizer = make_pipeline(hasher, TfidfTransformer())
# 	X = vectorizer.fit_transform([article['title'] for article in articles])

# 	# dimensionality reduction
# 	svd = TruncatedSVD(n_components=100)
# 	normalizer = Normalizer(copy=False)
# 	lsa = make_pipeline(svd, normalizer)
# 	X = lsa.fit_transform(X)

# 	# do clustering
# 	km = MiniBatchKMeans(n_clusters=num_clusters, init='k-means++')
# 	km.fit(X)

# 	# sort articles into clusters
# 	labels = km.labels_
# 	clusters = {}

# 	for x in range(len(articles)):
# 		if str(labels[x]) not in clusters:
# 			clusters[str(labels[x])] = [articles[x]]
# 		else:
# 			clusters[str(labels[x])].append(articles[x])

# 	## get labels for clusters
# 	labeled_clusters = {}
# 	for cluster in clusters:
# 		label = getClusterLabel(clusters[cluster])
# 		labeled_clusters[label] = clusters[cluster]

# 	del clusters
# 	return labeled_clusters