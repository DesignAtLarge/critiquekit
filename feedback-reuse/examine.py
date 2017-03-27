from collections import defaultdict
import nltk
from sklearn import linear_model
import numpy as np

from featurize import getFeaturizer
from data.loadF16Data import loadData
from data.loadCeliasData import loadCeliasData, loadSrkW16Data

X, y = loadData()
X2, y2 = loadCeliasData()
X3, y3 = loadSrkW16Data()

featurize = getFeaturizer(X + X2 + X3, y + y2 + y3)

X = [featurize(x) for x in X]
y = y
xTrain = X[:int(round(8*len(X)/10.0))]
yTrain = y[:int(round(8*len(y)/10.0))]
xTest = X[int(round(8*len(X)/10.0)):]
yTest = y[int(round(8*len(y)/10.0)):]

def trainClassifier(xTrain, yTrain):
    clf = linear_model.LogisticRegression(fit_intercept=False, solver="newton-cg")
    clf.fit(xTrain, yTrain)
    return clf

clf = trainClassifier(xTrain, yTrain)

def predict(datum):
    X = np.asarray(featurize(datum))
    X = X.reshape((1,-1))
    return clf.predict(X)

#predictions = clf.predict(xTrain)
#
#correctPredictions = 0
#for (i,x) in enumerate(predictions):
    #if x == yTrain[i]:
        #correctPredictions += 1
#
#print "Train % correct:", float(correctPredictions) / len(predictions)
#
#predictions = clf.predict(xTest)
#correctPredictions = 0
#for (i,x) in enumerate(predictions):
    #if x == yTest[i]:
        #correctPredictions += 1
#
#print "Test % correct:", float(correctPredictions) / len(predictions)


# stopwords = nltk.corpus.stopwords.words('english')
# counts = [(wordCount[w], w) for w in wordCount if w not in stopwords]
# counts.sort()
# counts.reverse()
#
# words = [x[1] for x in counts[:350]]
#
# print words[:10]
# print words[-10:]
