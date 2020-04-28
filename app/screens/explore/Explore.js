import React, { useState, useEffect } from 'react';
import {
  FlatList, View,
  SafeAreaView,
  RefreshControl,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import Popover from 'react-native-popover-view';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import FirebaseDB from '../../config';
import styles from './style';
import PictureSmall from '../../components/Picture/PictureComponentSmall';
import { shuffle_array } from '../../utils';


function ExploreScreen({ navigation }) {
  const DB = FirebaseDB.instance;
  const pictures_limit = 8;
  let pictures_list = ['notempty'];
  let flatList_ref = FlatList;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, ] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [picturesAux, setPicturesAux] = useState([]);
  const [search, setSearch] = useState('');
  const [cols, setCols] = useState(2);
  const [displayStyle, setDisplayStyle] = useState('grid');

  useEffect(() => {
    setTimeout(() => loadData(), 2000);
  }, []);

  async function loadData() {
    if (loadMore || pictures.length === pictures_list.length) {
      return;
    }
    setLoading(true);
    setRefreshing(true);
    await DB.pictures
      .once('value', (data) => {
        pictures_list = data.val();
        this.pictures_list = Object.values(pictures_list);
        this.pictures_list = this.pictures_list.filter((picture) => {
          if (!['youtube', 'vimeo'].some((aux) => picture.url.split(/[/.]/).includes(aux))) {
            return picture;
          }
        });
        this.pictures_list = shuffle_array(this.pictures_list);
        getNextItems();
      });
    setLoading(false);
  }

  function scrollToLastTop() {
    if (page > 1) {
      // 0.3 based on SmallPicture marginBottom = 6
      setTimeout(() => { this.flatList_ref.scrollToIndex({ animated: true, index: 0.3 }); }, 200);
    } else {
      setTimeout(() => { this.flatList_ref.scrollToIndex({ animated: true, index: 0.5 }); }, 100);
    }
  }

  async function getNextItems() {
    if (this.pictures_list.length === 0 || pictures.length === this.pictures_list.length) {
      setRefreshing(false);
      return;
    }
    setPictures([...this.pictures_list.slice(0, pictures_limit * page)].reverse());
    setPicturesAux([...this.pictures_list.slice(0, pictures_limit * page)].reverse());
    setPage(page + 1);
    setRefreshing(false);
    scrollToLastTop();
  }

  function setNumberOfColumns(n) {
    setCols(n);
    setShowPopover(false);
  }

  function searchFilterFunction(text) {
    if (text !== '') {
      const newData = this.pictures_list.filter(
        (picture) => picture.title.toLowerCase().includes(text.toLowerCase())
      );
      setPictures(newData);
    } else {
      setPictures(picturesAux);
    }
    setSearch(text);
  }

  if (!loading) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Popover
          isVisible={showPopover}
          fromRect={{
            x: 335, y: 100, width: 100, height: 0
          }}
          placement="bottom"
          onRequestClose={() => setShowPopover(false)}
        >
          <View style={{ height: 130, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon.Button
              name="grip-vertical"
              size={16}
              iconStyle={{ color: 'gray' }}
              style={{ backgroundColor: 'white' }}
              onPress={() => { setNumberOfColumns(2); setDisplayStyle('grid'); }}
            />
            <Icon.Button
              name="grip-horizontal"
              size={16}
              iconStyle={{ color: 'gray' }}
              style={{ backgroundColor: 'white' }}
              onPress={() => { setNumberOfColumns(3); setDisplayStyle('grid'); }}
            />
            <Icon.Button
              name="grip-lines"
              size={16}
              iconStyle={{ color: 'gray' }}
              style={{ backgroundColor: 'white' }}
              onPress={() => { setNumberOfColumns(1); setDisplayStyle('grid'); }}
            />
            <Icon.Button
              name="list-ul"
              size={16}
              iconStyle={{ color: 'gray' }}
              style={{ backgroundColor: 'white' }}
              onPress={() => { setNumberOfColumns(1); setDisplayStyle('list'); }}
            />
          </View>
        </Popover>
        <View style={{ flexDirection: 'row', backgroundColor: '#f2f2ff' }}>
          <View style={{ width: '87%' }}>
            <SearchBar
              lightTheme
              round
              containerStyle={{ backgroundColor: '#f2f2ff' }}
              inputStyle={{}}
              searchIcon={{ size: 24 }}
              onChangeText={(text) => searchFilterFunction(text)}
              onClear={() => searchFilterFunction('')}
              placeholder="Type Here..."
              value={search}
            />
          </View>
          <View style={{ backgroundColor: '#f2f2ff', width: '13%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon.Button
              name="sliders-h"
              size={20}
              iconStyle={{ color: 'gray' }}
              style={{ backgroundColor: '#f2f2ff' }}
              onPress={() => { setShowPopover(true); }}
            />
          </View>
        </View>
        <FlatList
          inverted
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          ref={(ref) => { this.flatList_ref = ref; }}
          key={cols}
          style={styles.flatList}
          data={pictures}
          extraData={pictures}
          getItemLayout={(data, indx) => ({ length: 200, offset: indx, index: indx })}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getNextItems.bind(this)}
              tintColor="#5b84c2"
            />
          )}
          renderItem={({ item, index }) => {
            return (
              displayStyle === 'list'
                ? (
                  <TouchableHighlight
                    underlayColor="white"
                    onPress={() => {
                      navigation.navigate('Explore Picture', { attrs: item });
                    }}
                  >
                    <View style={{ flexDirection: 'row', height: 60, borderBottomColor: '#f2f2ff', borderBottomWidth: 1, flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 30, marginRight: 30 }}>
                      <View style={{ width: '87%' }}>
                        <Text style={{ fontSize: 15 }}>{item.title}</Text>
                      </View>
                      <View style={{ width: '13%' }}>
                        <FastImage
                          style={{ width: 40, height: 40, borderRadius: 30 }}
                          source={{ uri: item.url }}
                        />
                      </View>
                    </View>
                  </TouchableHighlight>
                ) : (
                  <PictureSmall
                    picture={item}
                    cols={cols}
                    index={index}
                    navigation={navigation}
                  />
                ));
          }}
          keyExtractor={(item) => item.title.toString()}
          numColumns={cols}
        />
      </SafeAreaView>
    );
  }

  return null; // temporary call
}

export default ExploreScreen;
