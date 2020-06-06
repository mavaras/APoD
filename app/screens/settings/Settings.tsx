import React, { useState } from 'react';
import {
  Linking,
  SafeAreaView, Dimensions,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import SectionsMenu from '../../components/common/SectionsMenu';
import { useTheme } from '../../themes';


function SettingsScreen() {
  const theme = useTheme();
  let [notifications] = useState<Boolean>(false);
  let [currTheme, setCurrTheme] = useState<string>();
  const [items, setItems] = useState<Array<Array<Object>>>([
    [
      {
        title: 'Appearance',
        iconName: 'map',
        extraStyle: { color: '#719259e8' },
        action: () => changeTheme(),
      },
    ],
    [
      {
        title: 'Buy me a coffee',
        iconName: 'coffee',
        extraStyle: { color: 'brown' },
        action: () => Linking.openURL('https://www.buymeacoffee.com/mavaras'),
      },
      {
        title: 'Source code',
        iconName: 'github',
        extraStyle: { color: '#2a2f38' },
        action: () => Linking.openURL('https://www.github.com/mavaras/APoD'),
      },
      {
        title: 'Report an issue',
        iconName: 'wrench',
        extraStyle: { color: '#384f7e' },
        action: () => Linking.openURL('https://www.github.com/mavaras/APoD/issues'),
      },
    ],
    [
      {
        title: 'Rate this app',
        iconName: 'star',
        extraStyle: { color: 'orange' },
        action: () => Linking.openURL(''),
      },
    ],
  ]);

  async function changeTheme() {
    theme.setTheme(theme.getTheme() === 'lightTheme' ? 'darkTheme' : 'lightTheme');
  }

  return (
    <SafeAreaView style={{ height: Dimensions.get('window').height, backgroundColor: theme.getColors().bgColor2 }}>
      <ScrollView>
        <SectionsMenu items={items} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;
