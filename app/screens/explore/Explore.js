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
    }
    this.DB = FirebaseDB.instance;
    this.n_pictures = 0;
    this.pictures_limit = 3;
    this.pictures = [[], []];
  }

  componentDidMount() {
    this.DB.pictures
      .on('value', data => { 
        this.pictures_list = data.val();
        this.pictures_list = Object.values(this.pictures_list);
        this.pictures_list = this.pictures_list.filter((e) => {
          if(!['youtube', 'vimeo'].some(aux => e.url.split(/[/.]/).includes(aux))) {
            return e;
          }
        });
        this.pictures_list.sort(() => Math.random() - 0.5);
        this.n_pictures = this.pictures_list.length;
        const aux = this.pictures_list;
        this.pictures = [aux.slice(0, this.pictures_limit),
                         aux.slice(this.pictures_limit, this.pictures_limit * 2)];
        this.setState({
          loading: false
        });
    });
  }

  _getRandomHeight() {
    const heights = [200, 300]
    this.setState({
      loading: false
    });
    return heights[Math.floor(Math.random()*heights.length)];
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  loadMoreData = async () => {
    const { loadMore } = this.state;
    if (loadMore ||
      this.n_pictures < this.pictures[0].length +
      this.pictures[1].length + 6) {
      return;
    }
    this.setState({
      loading: false,
      loadMore: true
    });
    await setTimeout(() => {}, 2000);
    this.n_pictures = this.pictures_list.length;
    const aux = this.pictures_list;
    this.pictures = [aux.slice(0, this.pictures[0].length + this.pictures_limit),
                     aux.slice(this.pictures[0].length + this.pictures_limit,
                              (this.pictures[0].length + this.pictures_limit) * 2)];
    this.setState({
      loading: false,
      loadMore: false,
    });
  }

  render() {
    if (!this.state.loading && !this.state.loadMore) {
      return (
        <GestureRecognizer
          onSwipeRight={() => { this.props.navigation.navigate('Picture'); }}
        >
          <SafeAreaView>

            <FlatList
              data={this.pictures_list}
              renderItem={({item}) => (
                <TouchableHighlight
                  style={styles.touchableHighlight}
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
