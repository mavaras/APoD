import React, { useState, useEffect } from 'react';
import { NASA_API_KEY } from 'react-native-dotenv';
import FirebaseDB from '../../config';
import Picture from '../../components/Picture/PictureComponent';
import LoadingScreen from '../loading/LoadingScreen';
import { filterByWord } from '../../utils';


function PictureScreen({ route }: any) {
  const DB = FirebaseDB.instance; // eslint-disable-line no-undef
  const [loading, setLoading] = useState<Boolean>(true);
  const [, setDataSource] = useState<Array<{[string: string]: string}>>([]);
  const [response, setResponse] = useState<{[string: string]: string}>({});

  function fetchData() {
    if (!route.params) {
      let mustQuery: boolean = true;
      let lastPicture: any = null;
      console.log("!!");
      setTimeout(async () => {
        await DB.pictures
          .limitToLast(1)
          .once('value', (data: any) => {
            // eslint-disable-next-line prefer-destructuring
            lastPicture = Object.values(data.val())[0];
            const today = new Date();
            // eslint-disable-next-line prefer-template
            const todayDate: string = today.getFullYear() + '-' +
                                      ('0' + (today.getMonth() + 1)).slice(-2) + '-' +
                                      ('0' + today.getDate()).slice(-2);
            mustQuery = todayDate !== lastPicture.date;
          });console.log(mustQuery);
        if (mustQuery) {
          fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
            .then((_response) => _response.json())
            .then((responseJson) => {
              if (!('error' in responseJson)) {
                setResponse(responseJson);
                DB.pictures
                  .orderByChild('title')
                  .equalTo(responseJson.title)
                  .once('value')
                  .then((snapshot: any) => {
                    setLoading(false);
                    setDataSource(responseJson);
                    if (!snapshot.val()) {
                      DB.pictures.push({
                        title: response.title,
                        explanation: response.explanation,
                        url: response.url,
                        date: response.date,
                      });
                    }
                  });
              } else {
                throw new Error('error in response');
              }
            })
            .catch((error) => console.log(error));
        } else {
          setResponse(lastPicture);
          setLoading(false);
          getSimilars();
        }
      }, 2000);
    } else {
      setResponse(route.params.attrs);
      setLoading(false);
    }
  }

  async function getSimilars() {
    const titleWords = response.title.split(' ').filter((word) => word.length > 3);
    let picturesList = ['noempty'];
    await DB.pictures
      .once('value', (data: any) => {
        picturesList = data.val();
        picturesList = Object.values(picturesList);
        picturesList = picturesList.filter((picture: {[string: string]: string})
        : {[string: string]: string} | undefined => {
          if (!['youtube', 'vimeo'].some((aux) => picture.url.split(/[/.]/).includes(aux))) {
            return picture;
          }
        });
      });
    let similarsList = [];
    let maxLen = 0;
    for (const word in titleWords) {
      const wordFiltered = filterByWord(picturesList, word);
      if (wordFiltered.length > maxLen) {
        maxLen = wordFiltered.length;
        similarsList = wordFiltered;
      }
    }
    return similarsList;
  }

  useEffect(() => {
    fetchData();
  }, [route.params]);

  if (loading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <Picture attrs={response} />
  );
}

export default PictureScreen;
