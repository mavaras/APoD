import React from 'react';
import {
  FlatList,
  SafeAreaView,
} from 'react-native';
import FirebaseDB from '../../config';
import styles from './style';
import LoadingScreen from '../loading/LoadingScreen';
import PictureSmall from '../../components/Picture/PictureComponentSmall';


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

  render() {
    if (!this.state.loading && !this.state.loadMore) {
      return (
        <SafeAreaView>
          <FlatList
            style={styles.flatList}              
            data={this.state.pictures}
            renderItem={({item, index}) => (
              <PictureSmall
                picture={item}
                index={index}
                navigation={this.props.navigation} />
            )}
            keyExtractor={item => item.title.toString()}
            onEndReached={() => { this.loadMoreData(); }}
            onEndReachedThreshold={0.5}
            numColumns={2}
            initialNumToRender={6}
          />
        </SafeAreaView>
      );
    }
    return (
      <LoadingScreen/>
    );
  }
}
