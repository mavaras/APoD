import os
import json

from flask import Flask
from flask_cors import CORS

from api.schema import SCHEMA
from back.api.view import APIView

app = Flask(__name__)
CORS(app)


@app.route('/')
def entrypoint():
    return '<h1>APoD API entrypoint</h1>'

app.add_url_rule(
    '/api',
    view_func=APIView.as_view()
)

if __name__ == '__main__':
    app.run()
