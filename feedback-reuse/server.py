import eventlet
import eventlet.wsgi
eventlet.monkey_patch()

from flask import Flask, url_for, request
app = Flask(__name__)

import re

from examine import predict
def classifyFeedback(feedback):
    sentences = re.split('[.|!]', feedback)
    print sentences
    categories = reduce(lambda acc, x: acc + [predict(x).tolist()[0]], sentences, [])

    return set(categories)


@app.route('/rate/', methods=['POST'])
def rate():
    #print "GOT IT BABY", comment
    print "REQUEST BODY:", request.form['comment']
    comment = request.form['comment']

    if comment == "":
        return "000"

    categories = classifyFeedback(comment)
    ret = ""
    ret += "1" if 1 in categories else "0"
    ret += "1" if 2 in categories else "0"
    ret += "1" if 3 in categories else "0"
    return ret
    #print predict(comment)
    #stringCategory = prediction[0]
    #return str(prediction.item(0))


if __name__ == "__main__":
    # wrap Flask application with engineio's middleware
    #app = socketio.Middleware(sock, app)
    print("Starting server on port {}", 8000)
    # deploy as an eventlet WSGI server
    eventlet.wsgi.server(eventlet.listen(('', 8000)), app)
    url_for('static', filename='index.html')
