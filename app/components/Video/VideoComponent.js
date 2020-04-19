import React from 'react';
import WebView from 'react-native-webview';
import { View } from 'react-native';
import styles from './style';


function Video({ url }) {
  return (
    <View style={styles.videoView}>
      <WebView
        javaScriptEnabled={true}
        source={{uri: url}}
      />
    </View>
  );
}

export default Video;
