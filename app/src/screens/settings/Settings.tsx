import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import {
  Dimensions,
  Linking,
  SafeAreaView,
  Text,
  View, ViewStyle,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import SectionsMenu from '../../components/common/SectionsMenu';
import Storage from '../../storage';
import { ThemeContext, useTheme } from '../../themes';
import { RootStackParamList, SettingMenuItemType } from '../../types';


interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Settings'>,
}
function SettingsScreen({ navigation }: Props) {
  const theme: ThemeContext = useTheme();
  const { t }: UseTranslationResponse = useTranslation();
  const [items, setItems] = useState<Array<Array<SettingMenuItemType>>>([
    [
      {
        title: t('settings.labels.appearance'),
        iconName: 'circle',
        extraStyle: { color: theme.getColors().fontColor } as ViewStyle,
        action: () => changeTheme(),
      },
    ],
    [
      {
        title: t('settings.labels.buyMeACoffee'),
        iconName: 'coffee',
        extraStyle: { color: 'brown' } as ViewStyle,
        action: () => Linking.openURL(t('settings.links.buyMeACoffee')),
      },
      {
        title: t('settings.labels.repo'),
        iconName: 'github',
        extraStyle: { color: '#2a2f38' } as ViewStyle,
        action: () => Linking.openURL(t('settings.links.repo')),
      },
      {
        title: t('settings.labels.issues'),
        iconName: 'wrench',
        extraStyle: { color: '#384f7e' } as ViewStyle,
        action: () => Linking.openURL(t('settings.links.issues')),
      },
    ],
    [
      {
        title: t('settings.labels.rateApp'),
        iconName: 'star',
        extraStyle: { color: 'orange' } as ViewStyle,
        action: () => {},
      },
      {
        title: t('settings.labels.mentions'),
        iconName: 'map-signs',
        extraStyle: { color: '#5eb8dd' } as ViewStyle,
        action: () => navigation.navigate('Mentions'),
      },
    ],
  ]);

  async function changeTheme(): Promise<void> {
    const newTheme: string = await theme.getTheme() === 'lightTheme' ? 'darkTheme' : 'lightTheme';
    theme.setTheme(newTheme);
    const itemsAux: Array<Array<SettingMenuItemType>> = items.slice();
    itemsAux[0][0].extraStyle = { color: newTheme === 'lightTheme' ? '#131415' : '#fffcf6' } as ViewStyle;
    setItems(itemsAux);
    await Storage.setItem('@APODapp:theme', newTheme);
  }

  return (
    <SafeAreaView style={{ height: Dimensions.get('window').height, backgroundColor: theme.getColors().bgColor2 }}>
      <ScrollView>
        <SectionsMenu items={items} />
        <View style={{ alignItems: 'center', height: 100, marginTop: 270 }}>
          <Text style={{ fontSize: 14, color: theme.getColors().fontColor }}>
            2020 - Mario Varas
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsScreen;
