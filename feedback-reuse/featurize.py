from tfidf import *
from nMostCommonMGrams import *

def getFeaturizer(X, y):
    unigrams, unigramId, idToUnigram = nMostCommonUnigrams(X, -1)
    unigramSet = set(unigrams)
    print unigrams

    bigrams, bigramId, idToBigram = nMostCommonBigrams(X, 50)
    bigramSet = set(bigrams)
    print bigrams
    idf = computeIdfWords(X, unigrams)

    def bigramFeatures(datum):
        bigramFeatures = [0]*len(bigrams)
        for b in bigram(datum):
            if b in bigrams:
                bigramFeatures[bigramId[b]] += 1
        return bigramFeatures

    def featurize(datum):
        return bigramFeatures(datum) + [1] + tfidf(datum, idf, unigrams)

    return featurize
