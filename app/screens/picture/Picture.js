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
      )
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
