from __future__ import print_function
import numpy as np
import pandas as pd
import nltk
import re
import os
import codecs
from sklearn import feature_extraction
import mpld3


from readData import *

# load nltk's English stopwords as variable called 'stopwords'
stopwords = nltk.corpus.stopwords.words('english')


# load nltk's SnowballStemmer as variabled 'stemmer'
from nltk.stem.snowball import SnowballStemmer
stemmer = SnowballStemmer("english")

# here I define a tokenizer and stemmer which returns the set of stems in the text that it is passed

def tokenize_and_stem(text):
    # first tokenize by sentence, then by word to ensure that punctuation is caught as it's own token
    tokens = [word for sent in nltk.sent_tokenize(text) for word in nltk.word_tokenize(sent)]
    filtered_tokens = []
    # filter out any tokens not containing letters (e.g., numeric tokens, raw punctuation)
    for token in tokens:
        if re.search('[a-zA-Z]', token):
            filtered_tokens.append(token)
    stems = [stemmer.stem(t) for t in filtered_tokens]
    return stems


def tokenize_only(text):
    # first tokenize by sentence, then by word to ensure that punctuation is caught as it's own token
    tokens = [word.lower() for sent in nltk.sent_tokenize(text) for word in nltk.word_tokenize(sent)]
    filtered_tokens = []
    # filter out any tokens not containing letters (e.g., numeric tokens, raw punctuation)
    for token in tokens:
        if re.search('[a-zA-Z]', token):
            filtered_tokens.append(token)
    return filtered_tokens


#not super pythonic, no, not at all.
#use extend so it's a big flat list of vocab
for assignmentN in [3,4,5,6]:

    data = loadAssignment(assignmentN)
    comments = [f['comments'].replace('_blank_', '') for f in data if len(f['comments'])]
    comments = [c.replace("'", "") for c in comments]
    totalvocab_stemmed = []
    totalvocab_tokenized = []
    for f in comments:
        allwords_stemmed = tokenize_and_stem(f) #for each item in 'synopses', tokenize/stem
        totalvocab_stemmed.extend(allwords_stemmed) #extend the 'totalvocab_stemmed' list

        allwords_tokenized = tokenize_only(f)
        totalvocab_tokenized.extend(allwords_tokenized)

    vocab_frame = pd.DataFrame({'words': totalvocab_tokenized}, index = totalvocab_stemmed)
    # print 'there are ' + str(vocab_frame.shape[0]) + ' items in vocab_frame'


    from sklearn.feature_extraction.text import TfidfVectorizer

    #define vectorizer parameters
    tfidf_vectorizer = TfidfVectorizer(max_df=0.8, max_features=100000,
                                     min_df=0.05, stop_words='english',
                                     use_idf=True, tokenizer=tokenize_and_stem, ngram_range=(1,1))

    tfidf_matrix = tfidf_vectorizer.fit_transform(comments) #fit the vectorizer to synopses

    terms = tfidf_vectorizer.get_feature_names()

    from sklearn.metrics.pairwise import cosine_similarity
    dist = 1 - cosine_similarity(tfidf_matrix)

    from sklearn.cluster import KMeans

    num_clusters = 6

    km = KMeans(n_clusters=num_clusters)

    km.fit(tfidf_matrix)

    clusters = km.labels_.tolist()

    print(clusters)

    # films = { 'title': titles, 'rank': ranks, 'synopsis': synopses, 'cluster': clusters, 'genre': genres }
    # {'category': 2, '': '',
    #  'original comment': '',
    #  'comments': 'Relatively more detailed, more relatable POV',
    #  'rubric number': '1',
    #  'length': 6,
    #  'score': 1,
    #  'frequency': 0,
    #  'ID': 0,
    #  'rubric item': 'Point of view takes a high-level look at a deep user need w/o providing a solution'}

    categories = [f['category'] for f in data]
    # comments = [f['comments'] for f in data]

    feedbacks = {'category': categories, 'comments': comments, 'cluster': clusters}

    frame = pd.DataFrame(feedbacks, index = [clusters] , columns = ['category', 'comments', 'cluster'])
    # frame = pd.DataFrame(films, index = [clusters] , columns = ['rank', 'title', 'cluster', 'genre'])

    # print frame['cluster'].value_counts() #number of films per cluster (clusters from 0 to 4)

    print("Top terms per cluster:")
    print()
    #sort cluster centers by proximity to centroid
    order_centroids = km.cluster_centers_.argsort()[:, ::-1]

    num_clusters = len(set(clusters))
    for i in range(num_clusters):
        print("Cluster %d words:" % i, end='')

        for ind in order_centroids[i, :2]: #replace 6 with n words per cluster
            print(' %s' % vocab_frame.ix[terms[ind].split(' ')].values.tolist()[0][0].encode('utf-8', 'ignore'), end=',')
        print() #add whitespace
        print() #add whitespace

        print("Cluster %d comments:" % i, end='\n')
        for title in frame.ix[i]['comments'].values.tolist():
            print(' %s,' % title, end='\n')
        print() #add whitespace
        print() #add whitespace

    print()
    print()
