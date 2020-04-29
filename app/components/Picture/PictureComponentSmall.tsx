import React from 'react';
import {
  TouchableHighlight,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';


function PictureComponentSmall({
  picture, index, cols, navigation,
}: any) {
  function itemStyle(indx: number) {
    // eslint-disable-next-line no-nested-ternary
    const pos = indx % cols === 0 ? 0 : (indx + 1) % cols === 0 ? 1 : 2;
    const imgHeight: number = [400, 200, 150][cols - 1];
    const imgSep = [2.2, 2.8, 2][cols - 1];
    const style = cols === 1 ? [
      {
        flex: 1,
        marginBottom: imgSep * 2,
        marginLeft: imgSep * 2,
        marginRight: imgSep * 2,
        height: imgHeight,
      }] : [
      {
        flex: 1, marginTop: 0, marginBottom: imgSep * 2, height: imgHeight,
      },
      // eslint-disable-next-line no-nested-ternary
      pos === 0 ? { marginLeft: imgSep * 2, marginRight: imgSep }
        : pos === 1
          ? { marginRight: imgSep * 2, marginLeft: imgSep }
          : { marginRight: imgSep, marginLeft: imgSep }];
    return (style);
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
