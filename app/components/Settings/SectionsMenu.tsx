import React from 'react';
import {
  SafeAreaView, Text, View, Dimensions, StyleSheet,TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import style from '../../components/Picture/style';
import BackButton from 'react-navigation-stack/lib/typescript/views/Header/BackButtonWeb';
import { ScrollView } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
  rowView: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 30,
  },
  rowTouchable: {
    width: '90%', alignSelf: 'center',
    height: 60,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ececece1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTouchableView: {
    flexDirection: 'row',
  },
  rowText: {
    fontSize: 17,
    width: '92%',
  },
  rowIcon: {
    width: '8%',
  },
});

function SectionsMenu({ items }) {
  return (
    <ScrollView>
      {items.map((sectionItems) => (
        <View style={styles.rowView}>
          {sectionItems.map((item) => (
            <TouchableHighlight
              style={styles.rowTouchable}
              onPress={item.action}
              underlayColor="none"
            >
              <View style={styles.rowTouchableView}>
                <Text style={styles.rowText}>{item.title}</Text>
                <Icon name={item.iconName} size={26} style={[styles.rowIcon, item.extraStyle]} />
              </View>
            </TouchableHighlight>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

export default SectionsMenu;
