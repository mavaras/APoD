import React, { useState, useEffect } from 'react';
import {
  FlatList, View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SearchBar } from 'react-native-elements';
import FirebaseDB from '../../config';
import * as _ from './style';
import PictureSmall from '../../components/Picture/PictureComponentSmall';
import PictureListItem from '../../components/common/PictureListItem';
import { filterByWord, shuffleArray } from '../../utils';
import Storage from '../../storage';


let flatListRef: typeof FlatList = FlatList;
function ExploreScreen({ navigation }: any) {
  const DB = FirebaseDB.instance;
  let picturesList: Array<string> = ['notempty'];
  const [picturesLimit, setPicturesLimit] = useState<number>(18);
  const [loading, setLoading] = useState<Boolean>(false);
  const [showFavourites, setShowFavourites] = useState<Boolean>(false);
  const [refreshing, setRefreshing] = useState<Boolean>(false);
  const [searching, setSearching] = useState<Boolean>(false);
  const [loadMore, ] = useState<Boolean>(false);
  const [showPopover, setShowPopover] = useState<Boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pictures, setPictures] = useState<Array<{[string: string]: string}>>([]);
  const [picturesAux, setPicturesAux] = useState<Array<{[string: string]: string}>>([]);
  const [search, setSearch] = useState<string>('');
  const [cols, setCols] = useState<number>(2);
  const [displayStyle, setDisplayStyle] = useState<string>('grid');

  function scrollToTop() {
    setTimeout(() => {
      flatListRef?.scrollToEnd();
    }, 200);
  }

  function scrollToLastTop() {
    if (page > 1 && displayStyle === 'grid') {
      setTimeout(() => {
        flatListRef?.scrollToIndex({
          animated: true,
          index: Math.floor(picturesLimit / cols) - 4,
        });
      }, 200);
    } else {
      scrollToTop();
    }
  }

  async function getNextItems() {
    if (this.picturesList.length === 0 || pictures.length === this.picturesList.length) {
      setRefreshing(false);
      return;
    }
    const newArray: Array<{[string: string]: string}> = [
      ...this.picturesList.slice(0, picturesLimit * page)];
    setPictures(newArray);
    setPicturesAux(newArray);
    setPage(page + 1);
    setRefreshing(false);
    //scrollToLastTop();
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
        //this.picturesList = shuffleArray(this.picturesList);
        getNextItems();
      });
    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => loadData(), 2000);
  }, []);

  function setNumberOfColumns(nCols: number) {
    setCols(nCols);
    //setShowPopover(false);
    //setTimeout(() => { flatListRef?.scrollToEnd(); }, 200);
  }

  function searchFilterFunction(text: string) {
    if (text !== '') {
      setSearching(true);
      const newData = filterByWord(this.picturesList, text);
      setPictures(newData.reverse());
    } else {
      setSearching(false);
      setPictures(picturesAux);
    }
    setSearch(text);
  }

  function renderFooter() {
    if (showFavourites || (!refreshing || searching)) return null;
    return (
      <_.ActivityIndicator />
    );
  }

  async function handleShowFavourites() {
    setShowFavourites(!showFavourites);
    if (!showFavourites) {
      const favourites = await Storage.getItem('@favourites');
      setPictures(JSON.parse(favourites));
      scrollToTop();
    } else {
      setPictures(picturesAux);
    }
  }

  if (!loading) {
    return (
      <_.SafeAreaView>
        <_.TopLayoutView>
          <_.SearchInputView>
            <SearchBar
              lightTheme
              round
              inputStyle={{}}
              containerStyle={_.styles.searchBar}
              searchIcon={{ size: 24 }}
              onChangeText={(text: string) => searchFilterFunction(text)}
              onClear={() => searchFilterFunction('')}
              placeholder="Search pictures..."
              value={search}
            />
          </_.SearchInputView>
          <_.ButtonDisplayLayoutView>
            <Icon.Button
              name="sliders-h"
              size={20}
              iconStyle={{ color: 'gray' }}
              style={_.styles.layoutDisplayButton}
              onPress={() => { setShowPopover(!showPopover); }}
            />
          </_.ButtonDisplayLayoutView>
        </_.TopLayoutView>
        <View
          style={[{ justifyContent: 'space-between', flexDirection: 'row' },
            showPopover ? { height: 45 } : { height: 0 }]}
        >
          <_.LayoutButtonsView>
            <Icon.Button
              name="grip-vertical"
              size={18}
              iconStyle={_.styles.layoutButtonIcon}
              style={_.styles.layoutButton}
              onPress={() => { setNumberOfColumns(2); setDisplayStyle('grid'); }}
            />
            <Icon.Button
              name="grip-horizontal"
              size={18}
              iconStyle={_.styles.layoutButtonIcon}
              style={_.styles.layoutButton}
              onPress={() => { setNumberOfColumns(3); setDisplayStyle('grid'); }}
            />
            <Icon.Button
              name="grip-lines"
              size={18}
              iconStyle={_.styles.layoutButtonIcon}
              style={_.styles.layoutButton}
              onPress={() => { setNumberOfColumns(1); setDisplayStyle('grid'); }}
            />
            <Icon.Button
              name="list-ul"
              size={18}
              iconStyle={_.styles.layoutButtonIcon}
              style={_.styles.layoutButton}
              onPress={() => { setNumberOfColumns(1); setDisplayStyle('list'); }}
            />
          </_.LayoutButtonsView>
          <_.HeartButtonView>
            <Icon.Button
              name="heart"
              size={18}
              iconStyle={[_.styles.layoutButtonIcon, showFavourites ? { color: '#f134d2' } : undefined]}
              style={_.styles.layoutButton}
              onPress={handleShowFavourites}
            />
          </_.HeartButtonView>
        </View>
        <_.FlatList
          inverted={searching || showFavourites}
          ListFooterComponent={renderFooter.bind(this)}
          onEndReached={() => {
            if (!refreshing && !searching && !showFavourites) {
              setRefreshing(true);
              setTimeout(() => getNextItems(), 3000);
            }
          }}
          onEndReachedThreshold={0.1}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
          ref={(ref: typeof FlatList) => {
            if (ref) {
              setTimeout(() => flatListRef = ref, 100);
            }
          }}
          key={cols}
          data={pictures}
          extraData={pictures}
          getItemLayout={(data, indx) => ({
            length: [400, 220, 150][cols - 1] + [2.2, 2.4, 2][cols - 1],
            offset: ([400, 220, 150][cols - 1] + [2.2, 2.4, 2][cols - 1]) * indx,
            index: indx,
          })}
          renderItem={({ item, index }) => {
            return (
              displayStyle === 'list'
                ? (
                  <PictureListItem
                    navigation={navigation}
                    item={item}
                  />
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
      </_.SafeAreaView>
    );
  }

  return null; // temporary call
}

export default ExploreScreen;
