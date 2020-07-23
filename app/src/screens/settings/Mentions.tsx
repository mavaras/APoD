import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import DataDisplay from '../../components/common/DataDisplay';
import { ThemeContext, useTheme } from '../../themes';
import { MentionsDataType } from '..//../types';


function MentionsScreen() {
  const theme: ThemeContext = useTheme();
  const items: MentionsDataType[] = require('../../res/credits.json');

  return (
    <SafeAreaView style={{ backgroundColor: theme.getColors().bgColor2 }}>
      <ScrollView>
        <DataDisplay items={items} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default MentionsScreen;
