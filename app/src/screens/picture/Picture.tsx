import { useLazyQuery } from '@apollo/react-hooks';
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
import { PictureType, RootStackParamList } from '../../types';
import {
  equalDates, fetchData, filterByWord, getTodayStringDate, shuffleArray,
} from '../../utils/utils';
import LoadingScreen from '../loading/LoadingScreen';
import WaitingScreen from '../loading/WaitingScreen';
import { GET_LAST_PICTURE, GET_TODAY_PICTURE } from './queries';


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
  const [lastPicture, setLastPicture] = useState<PictureType>({} as PictureType);
  const [similars, setSimilars] = useState<Array<PictureType>>([]);

  const [getTodayPicture] = useLazyQuery(GET_TODAY_PICTURE, {
    onCompleted: (data) => {
      setResponse(data.todayPicture as PictureType);
    },
    onError: () => {
      setError(true);
    },
  });

  const [getLastPicture] = useLazyQuery(GET_LAST_PICTURE, {
    onCompleted: (data) => {
      setLastPicture(data.lastPicture as PictureType);
    },
    onError: () => {
      setError(true);
    },
  });

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

  async function getPicture() {
    if (!route.params) {
      const today = new Date();
      const todayDate: string = [
        `${today.getFullYear()}-`,
        `${('0' + (today.getMonth() + 1)).slice(-2)}-`,
        `${('0' + today.getDate()).slice(-2)}`,
      ].join('');
      await getLastPicture();
      const mustQuery: boolean = todayDate !== lastPicture.date;
      if (mustQuery) {
        await getTodayPicture();
      } else {
        setResponse(lastPicture);
      }
    } else {
      setResponse(route.params.attrs);
    }
  }

  useEffect(() => {
    (async () => {
      await getPicture()
        .catch(() => {
          setError(true);
        });
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (JSON.stringify(response) !== JSON.stringify({})) {
        await getSimilars();
        setLoading(false);
      }
    })();
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
