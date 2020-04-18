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
      setTimeout(() => {
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
          .catch(error => console.log(error))},
      2000);
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
