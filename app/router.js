import React from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import ExploreScreen from './screens/explore/Explore';
import PictureScreen from './screens/picture/Picture';


export const Tabs = createBottomTabNavigator({
  Picture: {
    screen: PictureScreen,
    navigationOptions: {
      tabBarLabel: 'Daily Picture',
      tabBarIcon: ({tintColor}) => <FontAwesome name='meteor' size={26} color={tintColor} />
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
export const rootNavigator = createStackNavigator({
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  ExplorePicture: {
    screen: PictureScreen
  }
});
