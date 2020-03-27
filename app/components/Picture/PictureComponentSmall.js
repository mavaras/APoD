import React from 'react';
import {
  TouchableHighlight,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './style';


export default class PictureSmall extends React.Component {
  constructor(props) {
    super(props);
  }

  itemStyle(index) {
    return (
      [
        {flex: 1, marginTop: 0, marginBottom: 6, height: 200 },
        index % 2 == 0 ? { marginLeft: 6, marginRight: 3 } :
                          { marginRight: 6, marginLeft: 3 }
      ]
    );
  };

  render() {
    return (
      <TouchableHighlight
        style={this.itemStyle(this.props.index)}
        onPress={() => {
          this.props.navigation.navigate('ExplorePicture', {attrs: this.props.picture})
        }}>
        <FastImage
          style={styles.imageSmall}
          source={{uri: this.props.picture.url}}
        />
      </TouchableHighlight>);
  }
}