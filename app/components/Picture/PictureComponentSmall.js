import React from 'react';
import {
  TouchableHighlight,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';


function PictureComponentSmall({ picture, index, navigation }) {
  function itemStyle(indx) {
    return ([
      {
        flex: 1, marginTop: 0, marginBottom: 6, height: 200
      },
      indx % 2 === 0 ? { marginLeft: 6, marginRight: 3 }
        : { marginRight: 6, marginLeft: 3 }
    ]);
  }

  return (
    <TouchableHighlight
      style={itemStyle(index)}
      onPress={() => {
        navigation.navigate('Explore Picture', { attrs: picture });
      }}
    >
      <FastImage
        style={styles.imageSmall}
        source={{ uri: picture.url }}
      />
    </TouchableHighlight>
  );
}

export default PictureComponentSmall;
