## Author: Christopher Liu
## Date Created: 4/3/2020

import nltk
from string import punctuation


def parse_query(query):

	tokens = nltk.word_tokenize(query)
	words = [word.lower() for word in tokens]
	filter_table = str.maketrans('','',punctuation)
	words = [word.translate(filter_table) for word in words]
	words = [word for word in words if word.isalpha()]

	return words


## Executable Definition for Testing
def main():
	from string import punctuation

	query = "Hello's World-robot.  "
	grant_query = parse_query(query)
	print(grant_query)

if __name__ == "__main__":
    main()