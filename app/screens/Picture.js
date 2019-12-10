import React from 'react';
import { 
  ScrollView, 
  Text, 
  View 
} from 'react-native';
import { WebView } from 'react-native-webview';
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
        <View>
          <Text>loading...</Text>
        </View>
      );
    }
    else {
      if (2 == this.response.url.includes('youtube')) {
        const video_id = this.response.url.split('/')[4].split('?')[0];
        // not image but youtube video
        return(
          <View>
            <Text>asldkf</Text>
            <WebView
              chromeClient={true}
              style={{ flex: 1, 'width': 500, margin: 20, 'border': '1px solid black'}}
              source={{ uri: 'https://www.youtube.com/embed/8fy5HrbMUbA' }}
              javaScriptEnabled={true}
            />
          </View>
        );
      }
      else {console.log(this.response);
        return(
          <ScrollView contentContainerStyle={{}}>
            <Picture attrs={this.response}/>
          </ScrollView>
        );
      }
    }
  }
}
