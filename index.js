/**
 * @format
 */
import 'react-native-gesture-handler';

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { AppRegistry } from 'react-native';

import { name as appName } from './app.json';
import apolloClient from './app/apollo';
import StackNavigator from './app/App';


const Root = () => (
  <ApolloProvider client={apolloClient}>
    <StackNavigator />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => Root);
