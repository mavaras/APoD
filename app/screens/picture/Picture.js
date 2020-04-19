import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import FirebaseDB from '../../config';
import { NASA_API_KEY } from 'react-native-dotenv';
import Picture from '../../components/Picture/PictureComponent';
import LoadingScreen from '../loading/LoadingScreen';


function PictureScreen({ route }) {
  DB = FirebaseDB.instance;
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  let [response, setResponse] = useState({});

  function fetchData() {
    if (!route.params?.attrs) {
      let must_query = true;
      let last_picture = null;
      setTimeout(async () => {
        await DB.pictures
          .limitToLast(1)
          .once('value', data => { 
            last_picture = Object.values(data.val())[0];
            let today = new Date();
            today = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate();
            must_query = today != last_picture['date'];
          });
        if (must_query) {
          fetch('https://api.nasa.gov/planetary/apod?api_key=' + NASA_API_KEY)
            .then(response => response.json())
            .then((responseJson) => {
              if (!('error' in responseJson)) {
                setResponse(responseJson);
                DB.pictures
                  .orderByChild('title')
                  .equalTo(responseJson.title)
                  .once('value')
                  .then(snapshot => {
                    if (!snapshot.val()) {
                      DB.pictures.push({
                        title: response.title,
                        explanation: response.explanation,
                        url: response.url,
                        date: response.date
                      });
                    }
                    setLoading(false);
                    setDataSource(responseJson);
                  });
              }
              else {
                throw 'error in response';
              }
            })
            .catch(error => console.log(error))
        }
        else {
          setResponse(last_picture);
          setLoading(false);
        }
      }, 2000);
    }
    else {
      setResponse(route.params.attrs);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [route.params]);

  if (loading) {
    return (
      <LoadingScreen/>
    );
  }
  else {
    return (
      <ScrollView contentContainerStyle={{ backgroundColor: 'white', height: '100%' }}>
        <Picture attrs={response}/>
      </ScrollView>
    );
  }
};

export default PictureScreen;
