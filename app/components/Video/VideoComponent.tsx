import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';


interface Props {
  url: string,
  style: object,
}
function Video({ url, style }: Props) {
  return (
    <View style={style}>
      <WebView
        source={{ uri: url }}
      />
    </View>
  );
}

export default Video;
