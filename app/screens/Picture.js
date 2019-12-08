import React from 'react';
import { 
  Image, 
  ScrollView, 
  Text, 
  View 
} from 'react-native';
import FirebaseDB from '../config';
import Picture from '../components/PictureComponent';
import { NASA_API_KEY } from 'react-native-dotenv';


export default class PictureScreen extends React.Component {
  DB = FirebaseDB.instance;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };

    /*pictures.on('value', data => {
      //console.log(data.val());
    });*/
  }

  componentDidMount() {
    fetch('https://api.nasa.gov/planetary/apod?api_key='+NASA_API_KEY)
    .then(response => response.json())
    .then((responseJson) => {
      this.response = responseJson;
      this.setState({
        loading: false,
        dataSource: responseJson
      });
      this.DB.pictures
        .orderByChild("title")
        .equalTo(this.response.title)
        .once("value")
        .then(snapshot => {
          if (!snapshot.val()) {
            this.DB.pictures.push({
              title: this.response.title,
              explanation: this.response.explanation,
              url: this.response.url,
              date: this.response.date
            });
          }
        });
    })
    .catch(error => console.log(error))
  }

  render() {
    if (this.state.loading) {
      return (
        // loading screen
        null
      );
    }
    else {
      if (2 == this.response.url.includes('youtube')) {
        const video_id = this.response.url.split('/')[4].split('?')[0];
        // not image but youtube video
        return(
          null
        );
      }
      else {
        return(
          <ScrollView contentContainerStyle={{}}>
            <Picture attrs={this.response}/>
          </ScrollView>
        );
      }
    }
  }
}
