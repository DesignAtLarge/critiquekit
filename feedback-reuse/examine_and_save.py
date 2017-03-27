from collections import defaultdict
import string
import nltk
import random
from sklearn import linear_model

from tfidf import *
from nMostCommonMGrams import *
from readData import *

final_result = []

def processComments(comments):
  return ''.join([c for c in comments.lower() if not c in punctuation]).split()


def parseData(data):
    y = [f['category'] for f in data]
    X = [processComments(f['comments']) for f in data]
    return X, y

data = reduce(lambda acc, x: acc + loadAssignment(x), range(3, 10), [])
random.shuffle(data)
X, y = parseData(data)

test_data = loadCSV("data/crowdcrit_dashboard.csv")
testX, testY = parseData(test_data)

for row in test_data:
    final_result.append({"comment": row["comments"], "original category": row["category"]})

unigrams, unigramId, idToUnigram = nMostCommonUnigrams(X, -1)
unigramSet = set(unigrams)
#print unigrams

bigrams, bigramId, idToBigram = nMostCommonBigrams(X, 50)
bigramSet = set(bigrams)
#print bigrams

idf = computeIdfWords(X, unigrams)

def bigramFeatures(datum):
    bigramFeatures = [0]*len(bigrams)
    for b in bigram(datum):
        if b in bigrams:
            bigramFeatures[bigramId[b]] += 1
    return bigramFeatures

X = [bigramFeatures(x) + [1] + tfidf(x, idf, unigrams)  for x in X]
y = y

testX = [bigramFeatures(x) + [1] + tfidf(x, idf, unigrams)  for x in testX]
testY = testY

clf = linear_model.LogisticRegression(fit_intercept=False, solver="newton-cg")
clf.fit(X, y)
theta = clf.coef_

predictions = clf.predict(testX)
correctPredictions = 0
totalPredictions = 0
for (i,x) in enumerate(predictions):
    final_result[i]["auto category"] = x

    if x == testY[i]:
        correctPredictions += 1
        final_result[i]["correct?"] = "yes"
    else:
        final_result[i]["correct?"] = "no"

    if final_result[i]["original category"] != 0:
        totalPredictions += 1

print "Test % correct:", float(correctPredictions) / totalPredictions

csv_outfile = open("test_result.csv", 'w')

writer = csv.DictWriter(csv_outfile, fieldnames=["comment", "original category", "auto category", "correct?"])

writer.writeheader()
writer.writerows(final_result) 

# stopwords = nltk.corpus.stopwords.words('english')
# counts = [(wordCount[w], w) for w in wordCount if w not in stopwords]
# counts.sort()
# counts.reverse()
#
# words = [x[1] for x in counts[:350]]
#
# print words[:10]
# print words[-10:]
