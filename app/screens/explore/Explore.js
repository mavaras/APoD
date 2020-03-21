import React from 'react';
import {
  FlatList,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import FirebaseDB from '../../config';
import styles from './style';
import PictureSmall from '../../components/Picture/PictureComponentSmall';


export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      loadMore: false,
      page: 1,
      pictures: []
    }
    this.DB = FirebaseDB.instance;
    this.n_pictures = 0;
    this.pictures_limit = 8;
    this.pictures = [[], []];
  }

  componentDidMount() {
    this.loadMoreData();
  }

  async loadMoreData() {
    const { loadMore } = this.state;
    if (loadMore ||
      this.state.pictures.length == this.pictures_list) {
      return;
    }
    this.setState({
      loading: true,
      refreshing: true,
    }, async () => {
      await this.DB.pictures
        .once('value', data => { 
          this.pictures_list = data.val();
          this.pictures_list = Object.values(this.pictures_list);
          this.pictures_list = this.pictures_list.filter((e) => {
            if(!['youtube', 'vimeo'].some(aux => e.url.split(/[/.]/).includes(aux))) {
              return e;
            }
          });
          this.n_pictures = this.pictures_list.length;
          this.setState({
            pictures: [...this.pictures_list.splice(0, this.pictures_limit * this.state.page)].reverse(),
            page: this.state.page + 1,
            loading: false,
            refreshing: false,
          });
        });
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList inverted
          style={styles.flatList}
          data={this.state.pictures}
          extraData={this.state}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.loadMoreData.bind(this)}
            />
          }
          renderItem={({item, index}) => (
            <PictureSmall
              picture={item}
              index={index}
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={item => item.title.toString()}
          numColumns={2}
        />
      </SafeAreaView>
    );
  }
}
