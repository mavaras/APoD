import 'react-native-gesture-handler';
import { rootNavigator } from './router';
import { createAppContainer } from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PictureScreen from './screens/picture/Picture';
import ExploreScreen from './screens/explore/Explore';
import React from 'react';


console.disableYellowBox = true;

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tabs.Navigator 
      tabBarOptions={{
        activeTintColor: '#007AFF'
      }}
    >
      <Tabs.Screen
        name='Daily Picture'
        component={PictureScreen}
        options={{
          attrs: undefined,
          tabBarIcon: ({ focused }) => <FontAwesome name='meteor' size={26} color={focused ? '#007AFF' : 'gray'} />
        }}
      />
      <Tabs.Screen
        name='Explore'
        component={ExploreScreen}
        options={{
          navigation: undefined,
          tabBarIcon: ({ focused }) => <FontAwesome name='rocket' size={26} color={focused ? '#007AFF' : 'gray'} />
        }}
      />
    </Tabs.Navigator>
  );
}

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Back'
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Explore Picture'
          component={PictureScreen}
          options={{ headerTitle: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
