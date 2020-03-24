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
    this.pictures_limit = 8;
    this.pictures = [[], []];
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
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
          this.getNextItems();
        });
    });
    this.setState({loading: false});
  }

  getNextItems() {
    this.pictures_list = this.pictures_list.filter((e) => {
      if(!['youtube', 'vimeo'].some(aux => e.url.split(/[/.]/).includes(aux))) {
        return e;
      }
    });
    this.setState({
      pictures: [...this.pictures_list.splice(0, this.pictures_limit * this.state.page)].reverse(),
      page: this.state.page + 1,
      refreshing: false,
    });
    if (this.state.page > 2) {
      this.flatList_ref.scrollToIndex({animated: true, index: 0.3});  // 0.3 based on SmallPicture marginBottom = 6
    }
  }

  render() {
    if (!this.state.loading) {
      return (
        <SafeAreaView style={styles.safeAreaView}>
          <FlatList inverted
            ref={(ref) => { this.flatList_ref = ref; }}
            style={styles.flatList}
            data={this.state.pictures}
            extraData={this.state}
            getItemLayout={(data, index) => {
              return { length: 200, offset: 200 * index, index: index }
            }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.loadData.bind(this)}
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
    return null;  // temporary call
  }
}
