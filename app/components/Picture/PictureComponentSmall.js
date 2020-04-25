import React from 'react';
import {
  TouchableHighlight,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';


function PictureComponentSmall({
  picture, index, cols, navigation
}) {
  function itemStyle(indx) {
    // eslint-disable-next-line no-nested-ternary
    const pos = indx % cols === 0 ? 0 : (indx + 1) % cols === 0 ? 1 : 2;
    const img_height = [400, 200, 150][cols - 1];
    return ([
      {
        flex: 1, marginTop: 0, marginBottom: 6, height: img_height,
      },
      // eslint-disable-next-line no-nested-ternary
      pos === 0 ? { marginLeft: 6, marginRight: 3 }
        : pos === 1 ? { marginRight: 6, marginLeft: 3 } : { marginRight: 3, marginLeft: 3 }
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
