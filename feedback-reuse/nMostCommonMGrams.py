import itertools
import string
from collections import defaultdict

punctuation = set(string.punctuation)

def bigram(iterable):
    "s -> (s0,s1), (s1,s2), (s2, s3), ..."
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)

def getAllBigrams(texts):

    bigrams = reduce(lambda acc, r: acc + bigram(r), texts, [])

    bigramCount = defaultdict(lambda: 0)
    for b in bigrams:
        bigramCount[b] += 1

    counts = [(bigramCount[w], w) for w in bigramCount]
    counts.sort()
    counts.reverse()

    allBigrams = [b for (c,b) in counts]
    return allBigrams

def nMostCommonBigrams(texts, n):
    allBigrams = getAllBigrams(texts)
    if n is -1:
        nMostCommonBigrams = allBigrams
    else:
        nMostCommonBigrams = allBigrams[:n]
    bigramId = dict(zip(nMostCommonBigrams, range(len(nMostCommonBigrams))))
    idToBigram = dict(zip(range(len(nMostCommonBigrams)), nMostCommonBigrams))

    return nMostCommonBigrams, bigramId, idToBigram

def nMostCommonUnigrams(texts, n):
    wordCount = defaultdict(int)
    for t in texts:
        for w in t:
            wordCount[w] += 1

    counts = [(wordCount[w], w) for w in wordCount]
    counts.sort()
    counts.reverse()

    if n is -1:
        words = [x[1] for x in counts]
    else:
        words = [x[1] for x in counts[:n]]

    wordId = dict(zip(words, range(len(words))))
    idToWord = dict(zip(range(len(words)), words))
    return words, wordId, idToWord
