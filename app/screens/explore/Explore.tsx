import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import PictureSmall from '../../components/Picture/PictureComponentSmall';
import FirebaseDB from '../../config';
import Storage from '../../storage';
import { ThemeContext, useTheme } from '../../themes';
import { filterByWord } from '../../utils/utils';
import LoadingScreen from '../loading/LoadingScreen';
import WaitingScreen from '../loading/WaitingScreen';
import * as _ from './style';


let flatListRef: typeof FlatList = FlatList;

type RootStackParamList = {
  Explore: undefined;
  Settings: undefined;
  Picture: undefined;
  ExplorePicture: undefined;
};
interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Explore'>,
}
function ExploreScreen({ navigation }: Props) {
  const theme: ThemeContext = useTheme();
  const { t } = useTranslation();
  const DB = FirebaseDB.instance;

  let picturesList: Array<string> = ['notempty'];
  const [error, setError] = useState<Boolean>(false);
  const [picturesLimit, ] = useState<number>(18);
  const [loading, setLoading] = useState<Boolean>(false);
  const [showFavourites, setShowFavourites] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
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
  }

  async function loadData() {
    if (pictures.length === picturesList.length) {
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
        getNextItems();
      })
      .catch(() => setError(true));
    setLoading(false);
  }

  useEffect(() => {
    setTimeout(() => loadData(), 2000);
  }, []);

  function setNumberOfColumns(nCols: number) {
    setCols(nCols);
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
    setTimeout(async () => {
      setShowFavourites(!showFavourites);
      if (!showFavourites) {
        const favourites = await Storage.getItem('@APODapp:favourites');
        setPictures(JSON.parse(favourites));
        scrollToTop();
      } else {
        setPictures(picturesAux);
      }
    }, 200);
  }

  if (error) {
    const text = t('explore.waitingScreen');
    return (
      <WaitingScreen text={text} />
    );
  }
  if (loading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <_.SafeAreaView>
      <_.TopLayoutView>
        <_.SearchInputView>
          <SearchBar
            lightTheme
            round
            inputStyle={{}}
            containerStyle={{
              borderBottomWidth: 2.5,
              backgroundColor: theme.getColors().bgColor,
              borderBottomColor: theme.getColors().shimmerColor,
              borderTopColor: theme.getColors().bgColor,
            }}
            searchIcon={{ size: 24 }}
            onChangeText={(text: string) => searchFilterFunction(text)}
            onClear={() => searchFilterFunction('')}
            placeholder={t('explore.searchBarPlaceholder')}
            value={search}
          />
        </_.SearchInputView>
        <_.ButtonDisplayLayoutView>
          <Icon.Button
            name="sliders-h"
            size={20}
            iconStyle={{ color: theme.getColors().buttonColor }}
            style={{ backgroundColor: theme.getColors().bgColor }}
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
            style={[
              _.styles.layoutButton,
              {
                backgroundColor: theme.getColors().bgColor,
                borderRightColor: theme.getColors().bgColor,
                borderLeftColor: theme.getColors().bgColor,
              },
            ]}
            onPress={() => { setNumberOfColumns(2); setDisplayStyle('grid'); }}
          />
          <Icon.Button
            name="grip-horizontal"
            size={18}
            iconStyle={_.styles.layoutButtonIcon}
            style={[
              _.styles.layoutButton,
              {
                backgroundColor: theme.getColors().bgColor,
                borderRightColor: theme.getColors().bgColor,
                borderLeftColor: theme.getColors().bgColor,
              },
            ]}
            onPress={() => { setNumberOfColumns(3); setDisplayStyle('grid'); }}
          />
          <Icon.Button
            name="grip-lines"
            size={18}
            iconStyle={_.styles.layoutButtonIcon}
            style={[
              _.styles.layoutButton,
              {
                backgroundColor: theme.getColors().bgColor,
                borderRightColor: theme.getColors().bgColor,
                borderLeftColor: theme.getColors().bgColor,
              },
            ]}
            onPress={() => { setNumberOfColumns(1); setDisplayStyle('grid'); }}
          />
        </_.LayoutButtonsView>
        <_.HeartButtonView>
          <Icon.Button
            name="heart"
            size={18}
            iconStyle={[_.styles.layoutButtonIcon, showFavourites ? { color: '#f134d2' } : undefined]}
            style={[
              _.styles.layoutButton,
              {
                backgroundColor: theme.getColors().bgColor,
                borderRightColor: theme.getColors().bgColor,
                borderLeftColor: theme.getColors().bgColor,
              },
            ]}
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
        renderItem={({ item, index }) => (
          <PictureSmall
            picture={item}
            cols={cols}
            index={index}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.title.toString()}
        numColumns={cols}
      />
    </_.SafeAreaView>
  );
}

export default ExploreScreen;
