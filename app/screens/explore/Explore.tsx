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
import { shuffleArray } from '../../utils';


function ExploreScreen({ navigation }: any) {
  const DB = FirebaseDB.instance;
  const picturesLimit: number = 8;
  let picturesList: Array<string> = ['notempty'];
  const flatListRef = FlatList;
  const [loading, setLoading] = useState<Boolean>(false);
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const [loadMore, _] = useState<Boolean>(false);
  const [showPopover, setShowPopover] = useState<Boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pictures, setPictures] = useState<Array<{[string: string]: string}>>([]);
  const [picturesAux, setPicturesAux] = useState<Array<{[string: string]: string}>>([]);
  const [search, setSearch] = useState<string>('');
  const [cols, setCols] = useState<number>(2);
  const [displayStyle, setDisplayStyle] = useState<string>('grid');

  function scrollToLastTop() {
    if (page > 1) {
      // 0.3 based on SmallPicture marginBottom = 6
      setTimeout(() => { this.flatListRef.scrollToIndex({ animated: true, index: 0.3 }); }, 200);
    } else {
      setTimeout(() => { this.flatListRef.scrollToIndex({ animated: true, index: 0.5 }); }, 100);
    }
  }

  async function getNextItems() {
    if (this.picturesList.length === 0 || pictures.length === this.picturesList.length) {
      setRefreshing(false);
      return;
    }
    const newArray: Array<{[string: string]: string}> = [...this.picturesList.slice(0, picturesLimit * page)].reverse();
    setPictures(newArray);
    setPicturesAux(newArray);
    setPage(page + 1);
    setRefreshing(false);
    scrollToLastTop();
  }

  async function loadData() {
    if (loadMore || pictures.length === picturesList.length) {
      return;
    }
    setLoading(true);
    setRefreshing(true);
    await DB.pictures
      .once('value', (data: any) => {
        picturesList = data.val();
        this.picturesList = Object.values(picturesList);
        this.picturesList = this.picturesList.filter((picture: {[string: string]: string})
        : {[string: string]: string} | undefined => {
          if (!['youtube', 'vimeo'].some((aux) => picture.url.split(/[/.]/).includes(aux))) {
            return picture;
          }
        });
        this.picturesList = shuffleArray(this.picturesList);
        getNextItems();
      });
    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => loadData(), 2000);
  }, []);

  function setNumberOfColumns(nCols: number) {
    setCols(nCols);
    setShowPopover(false);
  }

  function searchFilterFunction(text: string) {
    if (text !== '') {
      const newData = this.picturesList.filter((picture: {[string: string]: string}) =>
        picture.title.toLowerCase().includes(text.toLowerCase()));
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
            x: 335, y: 100, width: 100, height: 0,
          }}
          placement="bottom"
          onRequestClose={() => setShowPopover(false)}
        >
          <View style={styles.layoutPopoverView}>
            <Icon.Button
              name="grip-vertical"
              size={16}
              iconStyle={{ color: 'gray' }}
              style={styles.layoutButton}
              onPress={() => { setNumberOfColumns(2); setDisplayStyle('grid'); }}
            />
            <Icon.Button
              name="grip-horizontal"
              size={16}
              iconStyle={{ color: 'gray' }}
              style={styles.layoutButton}
              onPress={() => { setNumberOfColumns(3); setDisplayStyle('grid'); }}
            />
            <Icon.Button
              name="grip-lines"
              size={16}
              iconStyle={{ color: 'gray' }}
              style={styles.layoutButton}
              onPress={() => { setNumberOfColumns(1); setDisplayStyle('grid'); }}
            />
            <Icon.Button
              name="list-ul"
              size={16}
              iconStyle={{ color: 'gray' }}
              style={styles.layoutButton}
              onPress={() => { setNumberOfColumns(1); setDisplayStyle('list'); }}
            />
          </View>
        </Popover>
        <View style={styles.layoutUpperView}>
          <View style={{ width: '87%' }}>
            <SearchBar
              lightTheme
              round
              containerStyle={styles.searchBar}
              inputStyle={{}}
              searchIcon={{ size: 24 }}
              onChangeText={(text) => searchFilterFunction(text)}
              onClear={() => searchFilterFunction('')}
              placeholder="Type Here..."
              value={search}
            />
          </View>
          <View style={styles.layoutDisplayButtonView}>
            <Icon.Button
              name="sliders-h"
              size={20}
              iconStyle={{ color: 'gray' }}
              style={styles.layoutDisplayButton}
              onPress={() => { setShowPopover(true); }}
            />
          </View>
        </View>
        <FlatList
          inverted
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          ref={(ref) => { this.flatListRef = ref; }}
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
