import React from 'react';
import WebView from 'react-native-webview';
import { View } from 'react-native';


function Video({ url, style }: any) {
  return (
    <View style={style}>
      <WebView
        source={{ uri: url }}
      />
    </View>
  );
}

export default Video;
