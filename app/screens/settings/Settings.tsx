import React from 'react';
import {
  Linking,
  SafeAreaView, Text, View, Dimensions, StyleSheet,TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../components/Picture/style';
import BackButton from 'react-navigation-stack/lib/typescript/views/Header/BackButtonWeb';
import { ScrollView } from 'react-native-gesture-handler';
import SectionsMenu from '../../components/Settings/SectionsMenu';
import { getActiveChildNavigationOptions } from 'react-navigation';


function algo() { console.log("press"); }
function handleNotifications() {
  console.log("handle notifications");
}

const items = [
  [
    {
      title: 'notifications',
      iconName: 'bell',
      extraStyle: { color: '#5b84c2' },
      action: () => handleNotifications(),
    },
    {
      title: 'appearance',
      iconName: 'moon',
      extraStyle: { color: '#5b84c2' },
      action: () => algo(),
    },
  ],
  [
    {
      title: 'github',
      iconName: 'github',
      extraStyle: {},
      action: () => Linking.openURL('https://www.google.es'),
    },
    {
      title: 'buy me a coffee',
      iconName: 'coffee',
      extraStyle: { color: 'brown' },
      action: () => algo(),
    },
  ],
  [
    {
      title: 'rate this app',
      iconName: 'star',
      extraStyle: { color: 'orange' },
      action: () => algo(),
    },
  ],
];

function SettingsScreen() {
  return (
    <SafeAreaView style={{ height: Dimensions.get('window').height, backgroundColor: '#ececece8' }}>
      <ScrollView>
        <SectionsMenu items={items} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;
