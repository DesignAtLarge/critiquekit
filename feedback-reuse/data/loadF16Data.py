import string
import random

from readData import loadAssignment

# turns 'comment' fields into an array of words sans punctuation
punctuation = set(string.punctuation)
def processComments(comments):
  return ''.join([c for c in comments.lower() if not c in punctuation]).split()

def parseData(data):
    y = [f['category'] for f in data]
    X = [processComments(f['comments']) for f in data]
    #X = [processComments(f['original comment']) for f in data] # for testing original comments (no blanks)
    return X, y

def loadData():
    data = reduce(lambda acc, x: acc + loadAssignment(x), range(3, 10), [])
    random.shuffle(data)
    X, y = parseData(data)
    return X, y
