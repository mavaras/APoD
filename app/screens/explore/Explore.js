import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Image,
  TouchableHighlight
} from 'react-native';
import FirebaseDB from '../../config';
import styles from './style';
import LoadingScreen from '../loading/LoadingScreen';
import GestureRecognizer from 'react-native-swipe-gestures';


export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadMore: false,
      page: 1,
      pictures: []
    }
    this.DB = FirebaseDB.instance;
    this.n_pictures = 0;
    this.pictures_limit = 6;
    this.pictures = [[], []];
  }

  componentDidMount() {
    this.loadMoreData();
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  loadMoreData() {
    const { loadMore } = this.state;
    if (loadMore ||
      this.state.pictures.length == this.pictures_list) {
      return;
    }
    this.setState({
      loading: false,
      loadMore: true
    });
    this.DB.pictures
      .on('value', data => { 
        this.pictures_list = data.val();
        this.pictures_list = Object.values(this.pictures_list);
        this.pictures_list = this.pictures_list.filter((e) => {
          if(!['youtube', 'vimeo'].some(aux => e.url.split(/[/.]/).includes(aux))) {
            return e;
          }
        });
        this.pictures_list.splice(-1, 1).sort(() => Math.random() - 0.5);
        this.n_pictures = this.pictures_list.length;
        this.setState({
          pictures: [...this.pictures_list.splice(0, this.pictures_limit * this.state.page)],
          page: this.state.page + 1
        });
    });
    this.setState({
      loading: false,
      loadMore: false,
    });
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
    if (!this.state.loading && !this.state.loadMore) {
      return (
        <GestureRecognizer
          onSwipeRight={() => { this.props.navigation.navigate('Picture'); }}
        >
          <SafeAreaView>
            {/*<View>
              <Text style={styles.exploreTitle}>Explore Pictures</Text>
            </View>*/}
            <FlatList
              style={styles.flatList}              
              data={this.state.pictures}
              renderItem={({item, index}) => (
                <TouchableHighlight
                  style={this.itemStyle(index)}
                  onPress={() => {
                    this.props.navigation.navigate('ExplorePicture', {attrs: item})
                  }}>
                  <Image
                    style={styles.image}
                    source={{uri: item.url}}
                  />
                </TouchableHighlight>
              )}
              keyExtractor={item => item.title.toString()}
              onEndReached={() => {this.loadMoreData();}}
              onEndReachedThreshold={0.5}
              numColumns={2}
              initialNumToRender={6}
            />
          </SafeAreaView>
        </GestureRecognizer>
      );
    }
    return (
      <LoadingScreen/>
    );
  }
}
