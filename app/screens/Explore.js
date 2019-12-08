import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Picture from '../components/PictureComponent';
import FirebaseDB from '../config';
import styles from './style';


export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
    this.db = FirebaseDB.instance;
  }

  componentDidMount() {
    this.db.pictures.on('value', data => { this.pictures_list = data.val(); });
    this.pictures_list = Object.values(this.pictures_list);
    const n_pictures = this.pictures_list.length;
    this.pictures = [this.pictures_list.slice(0, n_pictures/2),
                     this.pictures_list.slice(n_pictures/2, n_pictures-1)];
    this.setState({
      loading: false
    });
    // this._getRandomHeight();
  }

  _getRandomHeight() {
    const heights = [200, 300]
    this.setState({
      loading: false
    });
    return heights[Math.floor(Math.random()*heights.length)];
  }

  render() {
    if (!this.state.loading) {
      return (
        <ScrollView contentContainerStyle={{}}>
          <Text style={styles.exploreTitle}>
            Explore Pictures
          </Text>
          <View style={styles.exploreView}>
            <View style={styles.rightColumn}>
              {this.pictures[0].map((item, ) => (
                <Image
                  style={styles.image}
                  source={{uri: item.url}}
                />
              ))}
            </View>
            <View style={styles.leftColumn}>
              {this.pictures[1].map((item, ) => (
                <Image
                  style={styles.image}
                  source={{uri: item.url}}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      );
    }
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }
}