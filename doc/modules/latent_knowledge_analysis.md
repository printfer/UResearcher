# Using Latent Knowledge Analysis

1. Accessing Latent Knowledge Analysis
    * Click on the “Latent Knowledge” side panel from the results page.
    
    <img src="images/lka1.png" width="1838" height="875"/>
    
    * Wait for the results to load.(May take several moments.)
    
    <img src="images/lka2.png" width="1838" height="875"/>
	
    * Access the graph from the Latent Knowledge page at any time by clicking the keyword projection tab
	
    <img src="images/lka3.png" width="1838" height="875"/>

2. Isolating Specific Data Points
    * Click on the “Target Word(s)” bar to show a list of available words selection.

    <img src="images/lka4.png" width="1838" height="875"/>
	
    * Select any desired words to isolate
    * Clink the “Find” button to select and isolate the words on the graph.
	
    <img src="images/lka5.png" width="1838" height="875"/>
	
3. Interpreting Keyword Projection
    * The graph uses words from the articles in the search results.
    * Each point represents a word interest in the search topic.
    * The closer the words are located on the graph, the more likely the words are related, by context or meaning.

3. Accessing Cosine Similarity



# Developer Documentation

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