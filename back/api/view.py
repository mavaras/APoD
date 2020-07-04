from flask_graphql import GraphQLView
from back.api.middleware import DepthAnalysisBackend
from back.api.schema import SCHEMA


class APIView(GraphQLView):

    @classmethod
    def as_view(cls, **kwargs):
        print("view")
        del kwargs
        options = {
            'name': 'api',
            'graphiql': True,
            'schema': SCHEMA,
            'backend': DepthAnalysisBackend(),
        }
        view = super(APIView, cls).as_view(**options)
        return view
