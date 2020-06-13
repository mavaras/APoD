import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Linking,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import SectionsMenu from '../../components/common/SectionsMenu';
import Storage from '../../storage';
import { ThemeContext, useTheme } from '../../themes';


function SettingsScreen() {
  const theme: ThemeContext = useTheme();
  const { t } = useTranslation();
  const [items, setItems] = useState<Array<Array<Object>>>([
    [
      {
        title: t('settings.labels.appearance'),
        iconName: 'circle',
        extraStyle: { color: theme.getColors().fontColor },
        action: () => changeTheme(),
      },
    ],
    [
      {
        title: t('settings.labels.buyMeACoffee'),
        iconName: 'coffee',
        extraStyle: { color: 'brown' },
        action: () => Linking.openURL(t('settings.links.buyMeACoffee')),
      },
      {
        title: t('settings.labels.repo'),
        iconName: 'github',
        extraStyle: { color: '#2a2f38' },
        action: () => Linking.openURL(t('settings.links.repo')),
      },
      {
        title: t('settings.labels.issues'),
        iconName: 'wrench',
        extraStyle: { color: '#384f7e' },
        action: () => Linking.openURL(t('settings.links.issues')),
      },
    ],
    [
      {
        title: t('settings.labels.rateApp'),
        iconName: 'star',
        extraStyle: { color: 'orange' },
        action: () => Linking.openURL(''),
      },
    ],
  ]);

  async function changeTheme() {
    const newTheme: string = theme.getTheme() === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    theme.setTheme(newTheme);
    const itemsAux = items.slice();
    itemsAux[0][0].extraStyle = { color: newTheme === 'lightTheme' ? '#131415' : '#fffcf6' };
    setItems(itemsAux);
    await Storage.setItem('@APODapp:theme', newTheme);
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
