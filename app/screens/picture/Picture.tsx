import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { NASA_API_KEY } from 'react-native-dotenv';

import Picture from '../../components/Picture/PictureComponent';
import FirebaseDB from '../../config';
import { filterByWord, shuffleArray } from '../../utils/utils';
import LoadingScreen from '../loading/LoadingScreen';
import WaitingScreen from '../loading/WaitingScreen';


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
  const [, setDataSource] = useState<Array<{[string: string]: string}>>([]);
  const [response, setResponse] = useState<{[string: string]: string}>({});
  const [similars, setSimilars] = useState<{[string: string]: string}>({});

  async function fetchData(): Promise<void> {
    if (!route.params) {
      let mustQuery: boolean = true;
      let lastPicture: any = null;
      setTimeout(async () => {
        await DB.pictures
          .limitToLast(1)
          .once('value', (data: any) => {
            // eslint-disable-next-line prefer-destructuring
            lastPicture = Object.values(data.val())[0];
            const today = new Date();
            // eslint-disable-next-line prefer-template
            const todayDate: string = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
            mustQuery = todayDate !== lastPicture.date;
          });
        if (mustQuery) {
          fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
            .then((_response) => _response.json())
            .then((responseJson) => {
              if (!('error' in responseJson) && responseJson) {
                setResponse(responseJson);
                DB.pictures
                  .orderByChild('title')
                  .equalTo(responseJson.title)
                  .once('value')
                  .then((snapshot: any) => {
                    setDataSource(responseJson);
                    if (!snapshot.val()) {
                      DB.pictures.push({
                        title: response.title,
                        explanation: response.explanation,
                        url: response.url,
                        date: response.date,
                        author: response.author,
                      });
                    }
                  });
              } else {
                setError(true);
                throw new Error('error in response');
              }
            })
            .catch(() => setError(true));
        } else {
          setResponse(lastPicture);
        }
      }, 2000);
    } else {
      setResponse(route.params.attrs);
    }
  }

  async function getSimilars(): Promise<void> {
    const titleWords: Array<string> = response.title.split(' ').filter((word) => word.length > 3);
    const picturesList = DB.picturesList;
    let similarsList: Array<string> = [];
    let maxLen: number = 0;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const word in titleWords) {
      const wordFiltered = filterByWord(picturesList, word);
      if (wordFiltered.length > maxLen) {
        maxLen = wordFiltered.length;
        similarsList = wordFiltered;
      }
    }
    setSimilars(shuffleArray(similarsList));
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (JSON.stringify(response) !== JSON.stringify({})) {
      getSimilars();
      setLoading(false);
    }
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
    <Picture
      attrs={response}
      similars={similars}
      navigation={navigation}
    />
  );
}

export default PictureScreen;
