import 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PictureScreen from './screens/picture/Picture';
import SettingsScreen from './screens/settings/Settings';
import ExploreScreen from './screens/explore/Explore';
import { useTheme, ThemeHandler } from './themes';


console.disableYellowBox = true;

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function BottomTabNavigator() {
  const theme = useTheme();
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

function StackNavigator() {
  const theme = useTheme();
  return (
    <ThemeHandler>
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
              headerTitleStyle: { color: 'white' },
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeHandler>
  );
}

export default StackNavigator;
