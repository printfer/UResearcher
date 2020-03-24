# Latent Knowledge Analysis

*  ### get_wordvecs(articles)

**Parameters:** Articles List Object 

**Return:** Returns all the word vectors from the newly trained Word2Vec Model 

**Description:** This function is where the model is trained on the article 
data and where pre-processing and parsing of the text occurs. What we get back 
is the resulting word vectors 

*  ### get_2d_projection(vectors)

**Parameters:** Word Vectors (EG:word vectors retrieved from get_wordvecs) 

**Return:** The t-SNE(t-distributed Stochastic neighbor embedding) projection 
of the word vectors. 

**Description:** Calculates the t-sne of the word vectors. The idea is this will
reduce high dimensional objects to a 2d form where closely modeled objects
are the most similar, making visualization of related words/phrases easy. 

*  ### get_connections(wv, main, tertiary, connections)

**Parameters:** word vectors object, a word(STRING) for the main(target phrase), 
a tertiary word(STRING) for a related phrase, and an integer for the number of 
connections to find 

**Return:** Finds the n most similar word vectors(n determined by connections 
parameter)

**Description:** Will find the most similar words to a target word/phrase.

*  ### get_analogy_list(wv, word1, word2, word3)

**Parameters:** word vectors object, word one, two, and three, are all strings
which will be used to find the analogy list.  

**Return:** the n most similar word vectors to the newly computed word vector

**Description:** Will do vector computation on the words given, resulting in a 
way tosee related words under varying contexts. For example, with an 
appropriately trained dataset, doing Iron - Fe + He = Helium . As Iron and Fe 
should be equivelant by the context they appear in text. 