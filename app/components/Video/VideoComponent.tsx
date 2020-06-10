import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';


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
