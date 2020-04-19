import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import FirebaseDB from '../../config';
import styles from './style';
import PictureSmall from '../../components/Picture/PictureComponentSmall';


function ExploreScreen({ navigation }) {
  const DB = FirebaseDB.instance;
  const pictures_limit = 8;
  let pictures_list = ['notempty'];
  let flatList_ref = FlatList;
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    setTimeout(() => loadData(), 2000);
  }, []);

  async function loadData() {
    if (loadMore ||
      pictures.length == pictures_list.length) {
      return;
    }
    setLoading(true);
    setRefreshing(true);
    await DB.pictures
      .once('value', data => { 
        pictures_list = data.val();
        pictures_list = Object.values(pictures_list);
        getNextItems();
      });
    setLoading(false);
  }

  function scrollToLastTop() {
    if (page > 2) {
      setTimeout(() => {this.flatList_ref.scrollToIndex({animated: true, index: 0.3})}, 100);  // 0.3 based on SmallPicture marginBottom = 6
    }
    else {
      setTimeout(() => {this.flatList_ref.scrollToIndex({animated: true, index: 0.5})}, 100);
    }
  }

  async function getNextItems() {
    pictures_list = pictures_list.filter((picture) => {
      if(!['youtube', 'vimeo'].some(aux => picture.url.split(/[/.]/).includes(aux))) {
        return picture;
      }
    });
    setPictures([...pictures_list.splice(0, pictures_limit * page)].reverse());
    setPage(page + 1);
    setRefreshing(false);
    scrollToLastTop();
  }

  if (!loading) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <FlatList inverted
          ref={(ref) => { this.flatList_ref = ref; }}
          style={styles.flatList}
          data={pictures}
          extraData={pictures}
          getItemLayout={(data, index) => {
            return { length: 200, offset: 200 * index, index: index }
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadData.bind(this)}
              tintColor="#5b84c2"
            />
          }
          renderItem={({item, index}) => (
            <PictureSmall
              picture={item}
              index={index}
              navigation={navigation}
            />
          )}
          keyExtractor={item => item.title.toString()}
          numColumns={2}
        />
      </SafeAreaView>
    );
  }

  return null;  // temporary call
}

export default ExploreScreen;
