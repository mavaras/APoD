import React from 'react';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import styles from './style';


export default class Video extends React.Component {
  constructor(props) {
    super(props);console.log(this.props.url);
  }

  render() {
    return(
      <View style={styles.videoView}>
        <WebView
          style={{flex:1}}
          javaScriptEnabled={true}
          source={{uri: this.props.url}}
        />
      </View>
    );
  }
}