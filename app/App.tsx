import 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import ExploreScreen from './screens/explore/Explore';
import PictureScreen from './screens/picture/Picture';
import SettingsScreen from './screens/settings/Settings';
import { ThemeContext, ThemeHandler, useTheme } from './themes';
import { i18next } from './utils/translations/translate';


console.disableYellowBox = true;

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function BottomTabNavigator() {
  const theme: ThemeContext = useTheme();
  return (
    <Tabs.Navigator
      tabBarVisible={false}
      tabBarOptions={{
        activeTintColor: theme.getColors().activeSectionMenuColor,
        style: {
          backgroundColor: theme.getColors().bgColor,
          position: 'absolute',
          borderTopColor: theme.getColors().bgColor,
        },
      }}
    >
      <Tabs.Screen
        name="Daily Picture"
        component={PictureScreen}
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome name="meteor" size={24} color={focused ? '#007AFF' : 'gray'} />
        }}
      />
      <Tabs.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => <FontAwesome name="rocket" size={24} color={focused ? '#007AFF' : 'gray'} />
        }}
      />
    </Tabs.Navigator>
  );
}

function StackNavigatorContainer() {
  const theme: ThemeContext = useTheme();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Back"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Explore Picture"
          component={PictureScreen}
          options={{
            headerTitleStyle: { color: theme.getColors().fontColor },
            headerStyle: { backgroundColor: theme.getColors().bgColor },
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerTintColor: theme.getColors().fontColor,
            headerTitleStyle: { color: theme.getColors().fontColor },
            headerStyle: { backgroundColor: theme.getColors().bgColor },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function StackNavigator() {
  return (
    <ThemeHandler>
      <I18nextProvider i18n={i18next}>
        <StackNavigatorContainer />
      </I18nextProvider>
    </ThemeHandler>
  );
}

export default StackNavigator;
