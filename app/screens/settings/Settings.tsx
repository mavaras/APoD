import React, { useState } from 'react';
import {
  Linking,
  SafeAreaView, Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SectionsMenu from '../../components/common/SectionsMenu';


function SettingsScreen() {
  let [notifications] = useState<Boolean>(false);
  const [items, setItems] = useState<Array<Array<Object>>>([
    [
      {
        title: 'notifications',
        iconName: 'bell',
        extraStyle: { color: '#5b84c2' },
        action: () => handleNotifications(),
      },
      {
        title: 'appearance',
        iconName: 'map',
        extraStyle: { color: '#719259e8' },
        action: () => handleNotifications(),
      },
    ],
    [
      {
        title: 'github',
        iconName: 'github',
        extraStyle: {},
        action: () => Linking.openURL('https://www.github.com/mavaras/APoD'),
      },
      {
        title: 'buy me a coffee',
        iconName: 'coffee',
        extraStyle: { color: 'brown' },
        action: () => Linking.openURL('https://www.buymeacoffee.com/mavaras'),
      },
    ],
    [
      {
        title: 'rate this app',
        iconName: 'star',
        extraStyle: { color: 'orange' },
        action: () => Linking.openURL(''),
      },
    ],
  ]);

  async function handleNotifications() {
    notifications = !notifications;
    let auxItems: Array<Array<Object>> = [...items];
    auxItems[0][0].iconName = notifications ? 'bell-slash' : 'bell';
    setItems(auxItems);
  }

  return (
    <SafeAreaView style={{ height: Dimensions.get('window').height, backgroundColor: '#ececece8' }}>
      <ScrollView>
        <SectionsMenu items={items} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;
