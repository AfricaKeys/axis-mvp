


import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, request, jsonify
import axis

app = Flask(__name__)

@app.route('/run-bot', methods=['POST'])
def run_bot():
    data = request.json
    message = data.get('message', '')
    reply = axis.handle_message(message)  # This should be your axis function
    return jsonify({'response': reply})

@app.route('/', methods=['GET'])
def home():
    return "Flask backend is up ✅", 200

@app.route('/health', methods=['GET'])
def health():
    return "OK", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002)
