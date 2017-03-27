import string
import random

from readData import loadCSV

# turns 'comment' fields into an array of words sans punctuation
punctuation = set(string.punctuation)
def processComments(comments):
  return ''.join([c for c in comments.lower() if not c in punctuation]).split()

def getComment(datum):
    return datum['comments'] if len(datum['shortened comment']) == 0 else datum['shortened comment']

def parseData(data):
    y = [f['Final category'] for f in data]
    X = [processComments(getComment(f)) for f in data]
    #X = [processComments(f['original comment']) for f in data] # for testing original comments (no blanks)
    return X, y

def loadCeliasData():
    data = loadCSV('./data/celia.csv')
    random.shuffle(data)
    X, y = parseData(data)
    return X, y

def loadSrkW16Data():
    data = loadCSV('./data/srk-w16.csv')
    random.shuffle(data)
    X, y = parseData(data)
    return X, y

