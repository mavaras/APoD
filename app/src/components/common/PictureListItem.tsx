import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { PictureType, RootStackParamList } from '../../types';


const styles = StyleSheet.create({
  listLayoutItem: {
    flexDirection: 'row',
    height: 60,
    borderBottomColor: '#f2f2ff',
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  listLayoutItemTextView: {
    width: '87%',
  },
  listLayoutItemImageView: {
    width: '13%',
  },
  listLayoutItemText: {
    fontSize: 15,
  },
  listLayoutItemImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
});
interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Picture' | 'Explore'>,
  item: PictureType,
}

function PictureListItem({ navigation, item }: Props) {
  return (
    <TouchableHighlight
      underlayColor="white"
      onPress={() => {
        navigation.navigate('Explore Picture', { attrs: item });
      }}
    >
      <View style={styles.listLayoutItem}>
        <View style={styles.listLayoutItemTextView}>
          <Text style={styles.listLayoutItemText}>{item.title}</Text>
        </View>
        <View style={styles.listLayoutItemImageView}>
          <FastImage
            style={styles.listLayoutItemImage}
            source={{ uri: item.url }}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default PictureListItem;
