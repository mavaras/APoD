import React from 'react';
import { Image, ScrollView, Text } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ExploreScreen from './screens/Explore';
import PictureScreen from './screens/Picture';


export const Tabs = createBottomTabNavigator({
  Picture: {
    screen: PictureScreen,
    navigationOptions: {
      tabBarLabel: 'Daily Picture',
      tabBarIcon: ({tintColor}) => <FontAwesome name='airbnb' size={26} color={tintColor} />
    },
  },
  Explore: {
    screen: ExploreScreen,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: ({tintColor}) => <FontAwesome name='rocket' size={26} color={tintColor} />
    },
  },
});

export const createRootNavigator = () => createAppContainer(Tabs);
