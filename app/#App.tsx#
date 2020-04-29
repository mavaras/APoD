import 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PictureScreen from './screens/picture/Picture';
import ExploreScreen from './screens/explore/Explore';


console.disableYellowBox = true;

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tabs.Navigator
      tabBarVisible={false}
      tabBarOptions={{
        activeTintColor: '#007AFF',
        style: {
          position: 'absolute',
          height: 90,
          marginTop: 20,
          paddingBottom: 24,
          borderRadius: 17,
        },
      }}
    >
      <Tabs.Screen
        name="Daily Picture"
        component={PictureScreen}
        options={{
          attrs: undefined,
          tabBarIcon: ({ focused }) => <FontAwesome style={{ marginBottom: -8 }} name="meteor" size={26} color={focused ? '#007AFF' : 'gray'} />
        }}
      />
      <Tabs.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          navigation: undefined,
          tabBarIcon: ({ focused }) => <FontAwesome style={{ marginBottom: -8 }} name="rocket" size={26} color={focused ? '#007AFF' : 'gray'} />
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
          name="Back"
          component={BottomTabNavigator}
          options={{ headerShown: false, tabBarVisible: false }}
        />
        <Stack.Screen
          name="Explore Picture"
          component={PictureScreen}
          options={{ headerTitle: null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
