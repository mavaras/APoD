import React from 'react';
import {
  ScrollView,
  View 
} from 'react-native';
import { WebView } from 'react-native-webview';
import FirebaseDB from '../../config';
import { NASA_API_KEY } from 'react-native-dotenv';
import Picture from '../../components/Picture/PictureComponent';
import LoadingScreen from '../loading/LoadingScreen';
import GestureRecognizer from 'react-native-swipe-gestures';
import Video from '../../components/Video/VideoComponent';


export default class PictureScreen extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
    };
    this.DB = FirebaseDB.instance;
  }

  componentDidMount() {
    setTimeout(() => {
      fetch('https://api.nasa.gov/planetary/apod?api_key='+NASA_API_KEY)
      .then(response => response.json())
      .then((responseJson) => {
        this.response = responseJson;
        if (1==2) {//['youtube', 'vimeo'].some(slug => this.response.url.split(/[/.]/).includes(slug))) {
          this.DB.pictures.on('value', data => {
            this.pictures_list = data.val();
            this.pictures_list = Object.values(this.pictures_list);
            this.response = this.pictures_list[this.pictures_list.length-2];
            this.setState({
              loading: false,
              dataSource: responseJson
            });
          });
        }
        else {
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
              this.setState({
                loading: false,
                dataSource: responseJson
              });
            });
        }
      })
      .catch(error => console.log(error))},
    3000);
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingScreen/>
      );
    }
    else {
      if (2 == ['youtube', 'vimeo'].some(slug => this.response.url.split(/[/.]/).includes(slug))) {
        // not image but youtube video
        return(
          <View>            
            
          </View>
        );
      }
      else {
        return(
          <GestureRecognizer
            onSwipeLeft={() => { this.props.navigation.navigate('Explore'); }}
          >
            <ScrollView contentContainerStyle={{}}>
              <Picture attrs={this.response}/>
            </ScrollView>
          </GestureRecognizer>
        );
      }
    }
  }
}
