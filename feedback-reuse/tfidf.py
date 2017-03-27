import numpy as np
from math import log

from nMostCommonMGrams import *

def computeIdfWords(X, words):
    N = len(X)
    idf = [0]*len(words)
    for d in X:
        reviewText = ''.join(d)
        for (i, w) in enumerate(words):
            idf[i] += 1 if reviewText.count(w) > 0 else 0

    idf = [log(float(N) / c, 10) for c in idf]
    return idf

def tfidf(r, idf, words):
    tf = []
    for w in words:
        tf.append(''.join(r).count(w))

    tfidf = np.multiply(tf, idf)

    return tfidf.tolist()

def bigramIDF(lines, bigrams):
    idf = [0.0]*len(bigrams)
    for i,b in enumerate(bigrams):
        count = 1.0
        for l in lines:
            count += 1.0 if b in getAllBigrams([l]) else 0.0
        idf[i] = log(len(lines) / float(count), 10)
    return idf

def bigramTF_IDF(line, bigrams, idf):
    tf_idf = [0.0]*len(bigrams)
    for i,b in enumerate(bigrams):
        count = getAllBigrams([line]).count(b)
        tf_idf[i] = count*idf[i]
    return tf_idf
