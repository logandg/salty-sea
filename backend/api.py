from flask import Flask
from flask import request
from flask.ext import restful
from functools import wraps

import salt.client
import yaml

app = Flask(__name__)
api = restful.Api(app)
salt_local = salt.client.LocalClient()

# decorator for token auth
# uses a users.yaml file
def token_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            request_token = request.headers["Authorization"].split(" ")[1] # If there's an exception request was bad
            users_file = open("users.yaml")
            users = yaml.load(users_file)
            authed_user = None
            for user, creds in users.get("users").items():
                if creds.get("token") == request_token:
                    print user
                    authed_user = user
            if authed_user:
                request.user = authed_user
                return func(*args, **kwargs)
            restful.abort(401)
        except (KeyError) as e:
            restful.abort(401)
    return wrapper

# restful.Resource that uses our token auth decorator
class TokenAuthResource(restful.Resource):
    method_decorators = [token_auth]


class MinionPillar(TokenAuthResource):
    """
    API Endpoint for Minion pillar actions
    Methods:
    get - return pillar data for minion
    """
    def get(self, minion_name):
        return salt_local.cmd(minion_name, 'pillar.data')

class MinionHighstate(TokenAuthResource):
    """
    API Endpoint for Minion Highstate actions
    Methods:
    get - return highstate data for minion
    post - execute highstate
    """
    def get(self, minion_name):
        return salt_local.cmd(minion_name, 'state.show_top')

    def post(self, minion_name):
        return salt_local.cmd(minion_name, 'state.highstate')


api.add_resource(MinionPillar, '/minion/<string:minion_name>/pillar')
api.add_resource(MinionHighstate, '/minion/<string:minion_name>/highstate')

if __name__ == '__main__':
    app.run(debug=True)
