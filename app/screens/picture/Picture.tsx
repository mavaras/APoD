import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import {
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

import Picture from '../../components/Picture/PictureComponent';
import FirebaseDB from '../../config';
import { ThemeColors } from '../../themes';
import { PictureType } from '../../types';
import {
  equalDates, fetchData, filterByWord, getTodayStringDate, shuffleArray,
} from '../../utils/utils';
import LoadingScreen from '../loading/LoadingScreen';
import WaitingScreen from '../loading/WaitingScreen';


const SafeAreaView = styled.SafeAreaView`
  height: ${Dimensions.get('window').height};
  flex: 1;
  overflow: hidden;
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
`;
const SettingsTouchableHighlight = styled(TouchableHighlight)`
  marginLeft: 90%;
  width: 10px;
  height: 30px;
  marginTop: 0px;
  marginBottom: -13px;
`;
const SettingsIcon = styled(Icon)`
  color: ${({ theme }: ThemeColors) => theme.buttonColor};
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  width: 60px;
  overflow: hidden;
`;

type RootStackParamList = {
  Explore: undefined;
  Settings: undefined;
  Picture: undefined;
  ExplorePicture: undefined;
};
interface Props {
  route: any,
  navigation: StackNavigationProp<RootStackParamList, 'Picture'>,
}
function PictureScreen({ route, navigation }: Props) {
  const { t }: UseTranslationResponse = useTranslation();
  const DB = FirebaseDB.instance; // eslint-disable-line no-undef

  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);
  const [response, setResponse] = useState<PictureType>({} as PictureType);
  const [similars, setSimilars] = useState<Array<PictureType>>([]);

  async function getSimilars(): Promise<void> {
    const titleWords: Array<string> = response.title.split(' ').filter((word) => word.length > 3);
    const picturesList = DB.picturesList;
    let similarsList: Array<PictureType> = [];
    let maxLen: number = 0;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const word in titleWords) {
      const wordFiltered = filterByWord(picturesList, word, response.title);
      if (wordFiltered.length > maxLen) {
        maxLen = wordFiltered.length;
        similarsList = wordFiltered;
      }
    }
    setSimilars(shuffleArray(similarsList));
  }

  useEffect(() => {
    (async () => {
      await fetchData(route.params)
        .then((res) => {
          setResponse(res as unknown as PictureType);
        })
        .catch(() => {
          setError(true);
        });
    })();
  }, []);
  useEffect(() => {
    if (JSON.stringify(response) !== JSON.stringify({})) {
      getSimilars();
      setLoading(false);
    }
  }, [response]);

  function isDailyPicture(): boolean {
    return equalDates(response.date, getTodayStringDate());
  }

  if (error) {
    const text = t('picture.waitingScreen');
    return (
      <WaitingScreen text={text} />
    );
  }
  if (loading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <SafeAreaView>
      {isDailyPicture()
        ? (
          <SettingsTouchableHighlight
            underlayColor="none"
            onPress={() => navigation.navigate('Settings', { navigation })}
          >
            <SettingsIcon
              name="cog"
              size={24}
              iconStyle={{ color: 'white' }}
            />
          </SettingsTouchableHighlight>
        ) : undefined}
      <Picture
        attrs={response}
        similars={similars}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}

export default PictureScreen;
