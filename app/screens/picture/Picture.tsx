import React, { useState, useEffect } from 'react';
import { NASA_API_KEY } from 'react-native-dotenv';
import FirebaseDB from '../../config';
import Picture from '../../components/Picture/PictureComponent';
import LoadingScreen from '../loading/LoadingScreen';


function PictureScreen({ route }: any) {
  const DB = FirebaseDB.instance; // eslint-disable-line no-undef
  const [loading, setLoading] = useState<Boolean>(true);
  const [, setDataSource] = useState<Array<{[string: string]: string}>>([]);
  const [response, setResponse] = useState<{[string: string]: string}>({});

  function fetchData() {
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
            const todayDate: string = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate();
            mustQuery = todayDate !== lastPicture.date;
          });
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
                    if (!snapshot.val()) {
                      DB.pictures.push({
                        title: response.title,
                        explanation: response.explanation,
                        url: response.url,
                        date: response.date,
                      });
                    }
                    setLoading(false);
                    setDataSource(responseJson);
                  });
              } else {
                throw new Error('error in response');
              }
            })
            .catch((error) => console.log(error));
        } else {
          setResponse(lastPicture);
          setLoading(false);
        }
      }, 2000);
    } else {
      setResponse(route.params.attrs);
      setLoading(false);
    }
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
