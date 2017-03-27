import nltk
import random
from collections import defaultdict
import string

from readData import *

def parse_feedback_data(data):
    y = [f['category'] for f in data]
    X = [f['comments'] for f in data]
    return y, X


data_set = reduce(lambda acc, x: acc + loadAssignment(x), range(3, 7), [])
random.shuffle(data_set)
y_train, X_train = parse_feedback_data(data_set)

# training_set = reduce(lambda acc, x: acc + loadAssignment(x), range(3, 6), [])
# y_train, X_train = parse_feedback_data(training_set)

# validation_set = loadAssignment(6)
# y_validate, X_validate = parse_feedback_data(validation_set)

# test_set = loadAssignment(7)
# y_test, X_test = parse_feedback_data(test_set)

good_words = ["good", "great", "nice", "awesome", ":)", ":D", "correct", "close enough", "i like", "ok"]

bad_words = ["incorrect", "bad", "didn't", "did not", "doesn't", "does not", "don't", "do not", "not", "forgot", "isn't", "is not", "aren't", "are not", "but", "however", "bug", "error", "fail", "failed"]

should_words = ["should", "please", "next time", "don't forget", "need", "needs", "try to", "could", "consider", "avoid", "include", "add"]

def countIn(inMe, howManyOfThese):
    containedWords = [x for x in howManyOfThese if x in inMe]
    return len(containedWords)

def getNMostUsedWords(N):
    data = loadAllData()
    ### How many unique words are there?

    wordCount = defaultdict(int)
    punctuation = set(string.punctuation)
    for d in data:
      r = ''.join([c for c in d['comments'].lower() if not c in punctuation])
      for w in r.split():
        wordCount[w] += 1

    # print len(wordCount)

    stopwords = nltk.corpus.stopwords.words('english')
    counts = [(wordCount[w], w) for w in wordCount if w not in stopwords]
    counts.sort()
    counts.reverse()

    words = [x[1] for x in counts[:350]]
    return words

mostPopularWords = getNMostUsedWords(100)
def feedback_features(f):
    features = {}
    for w in mostPopularWords:
        features[w] = 1 if w in f else 0
    return features
    # return {
    #     'has_good_words': countIn(f, good_words) > 0,
    #     'has_bad_words': countIn(f, bad_words) > 0,
    #     'has_should_words': countIn(f, should_words) > 0
    # }
    # return {
    #     'num_good_words': countIn(f, good_words),
    #     'num_bad_words': countIn(f, bad_words),
    #     'num_should_words': countIn(f, should_words)
    # }

featuresets = [(feedback_features(f), category) for (f, category) in zip(X_train, y_train)]
# print len(featuresets) # 182
train_set, validation_set = featuresets[:91], featuresets[91:]
classifier = nltk.NaiveBayesClassifier.train(train_set)

# random.shuffle(labeled_names)
print(nltk.classify.accuracy(classifier, validation_set))
# print(classifier.show_most_informative_features(5))

classifier = nltk.DecisionTreeClassifier.train(train_set)
print(nltk.classify.accuracy(classifier, validation_set))
