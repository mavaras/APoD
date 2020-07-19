import { useLazyQuery, useQuery } from '@apollo/react-hooks';
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
import { ThemeColors } from '../../themes';
import { PictureType, RootStackParamList } from '../../types';
import {
  equalDates, filterByWord, getTodayStringDate, shuffleArray,
} from '../../utils/utils';
import LoadingScreen from '../loading/LoadingScreen';
import WaitingScreen from '../loading/WaitingScreen';
import {
  GET_ALL_PICTURES, GET_LAST_PICTURE, GET_TODAY_PICTURE,
} from './queries';


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

  const [loading, setLoading] = useState<Boolean>(true);
  const [error, setError] = useState<Boolean>(false);
  const [response, setResponse] = useState<PictureType>({} as PictureType);
  const [similars, setSimilars] = useState<Array<PictureType>>([]);

  const [getTodayPicture] = useLazyQuery(GET_TODAY_PICTURE, {
    onCompleted: async (data) => {
      await setResponse(data.todayPicture as PictureType);
    },
    onError: () => {
      setResponse(lastPictureData.lastPicture);
    },
  });

  const { data: allPicturesData } = useQuery(GET_ALL_PICTURES, {
    onError: () => {
      setError(true);
    },
  });

  const { data: lastPictureData } = useQuery(GET_LAST_PICTURE, {
    onCompleted: async () => {
      await getPicture();
    },
    onError: () => {
      setError(true);
    },
  });

  async function getSimilars(): Promise<void> {
    const titleWords: Array<string> = response.title.split(' ').filter((word) => word.length > 3);
    const picturesList = allPicturesData.allPictures;
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

  async function getPicture(): Promise<void> {
    if (!route.params) {
      const today = new Date();
      const todayDate: string = [
        `${today.getFullYear()}-`,
        `${('0' + (today.getMonth() + 1)).slice(-2)}-`,
        `${('0' + today.getDate()).slice(-2)}`,
      ].join('');
      const lastPicture = lastPictureData.lastPicture;
      const mustQuery: boolean = todayDate !== lastPicture.date;
      if (mustQuery) {
        getTodayPicture();
      } else {
        setResponse(lastPicture);
      }
    } else {
      setResponse(route.params.attrs);
    }
  }

  function isDailyPicture(): boolean {
    return equalDates(response.date, getTodayStringDate());
  }

  useEffect(() => {
    (async () => {
      if (allPicturesData && similars.length === 0 && JSON.stringify(response) !== JSON.stringify({})) {
        await getSimilars();
        setLoading(false);
      }
    })();
  }, [response]);

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
