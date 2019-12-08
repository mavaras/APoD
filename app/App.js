import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';
import { Tabs } from './router';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { createAppContainer } from 'react-navigation';


console.disableYellowBox = true;
export default createAppContainer(Tabs);
