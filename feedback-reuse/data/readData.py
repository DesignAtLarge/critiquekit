import csv

# The coded feedback data sets: A3-A8
def loadAllData():
    data = []
    for n in [3,4,5,6,7,8]:
        data += loadAssignment(n)

    return data

def loadAssignment(n):
    data = []
    with open("data/f16-a" + str(n) + ".csv", "rb") as infile:
    #with open("data/f16-orig-a" + str(n) + ".csv", "rb") as infile: # to test original comments (no blanks)
        reader = csv.reader(infile, delimiter=',', quotechar='"')
        headers = next(reader)
        for row in reader:
            data.append({key: value for key, value in zip(headers, row)})

    # data = map(lambda x: x.update(('category', int(x['category']))), data)
    for x in data:
        x['category'] = int(x['category'])
        # x['rubric number'] = int(x['rubric number'])
        x['length'] = int(x['length'])
        x['score'] = int(x['score'])
        #x['frequency'] = int(x['frequency'])
        #x['ID'] = int(x['ID'])

    return data

def loadCSV(filename): # for other data, not HCI assigments
    data = []
    with open(filename, "rb") as infile:
        reader = csv.reader(infile, delimiter=',', quotechar='"')
        headers = next(reader)
        for row in reader:
            data.append({key: value for key, value in zip(headers, row)})

    for x in data:
        if (x['Final category'] != ""):
            x['Final category'] = int(x['Final category'])

    return data
