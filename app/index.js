/**
 * @format
 */
import './src/node_modules/react-native-gesture-handler';

import React from './src/node_modules/react';
import { ApolloProvider } from 'react-apollo';
import { AppRegistry } from './src/screens/explore/node_modules/react-native';

import { name as appName } from './app.json';
import apolloClient from './src/apollo';
import StackNavigator from './src/App';


const Root = () => (
  <ApolloProvider client={apolloClient}>
    <StackNavigator />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Root);
