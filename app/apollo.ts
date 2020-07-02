import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { APOD_GRAPHQL_API } from 'react-native-dotenv';


const httpLink = {
  uri: APOD_GRAPHQL_API,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const apolloClient = new ApolloClient({
  link: new HttpLink(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
