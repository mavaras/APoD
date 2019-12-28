import React from 'react';
import { ScrollView, Text, View, Image, TouchableHighlight } from 'react-native';
import FirebaseDB from '../../config';
import styles from './style';
import Picture from '../../components/Picture/PictureComponent';
import LoadingScreen from '../loading/LoadingScreen';
import GestureRecognizer from 'react-native-swipe-gestures';


export default class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
    this.DB = FirebaseDB.instance;
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
        const n_pictures = this.pictures_list.length;
        this.pictures = [this.pictures_list.slice(0, n_pictures/2),
                         this.pictures_list.slice(n_pictures/2, n_pictures-1)];
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

  render() {
    if (!this.state.loading) {
      return (
        <GestureRecognizer
          onSwipeRight={() => { this.props.navigation.navigate('Picture'); }}
        >
          <ScrollView contentContainerStyle={{}}>
            <Text style={styles.exploreTitle}>
              Explore Pictures
            </Text>
            <View style={styles.exploreView}>
              <View style={styles.rightColumn}>
                {this.pictures[0].map((item, ) => (
                  <TouchableHighlight
                    onPress={() => {
                      this.props.navigation.navigate('ExplorePicture', {attrs: item})
                    }}>
                    <Image
                      style={styles.image}
                      source={{uri: item.url}}
                    />
                  </TouchableHighlight>
                ))}
              </View>
              <View style={styles.leftColumn}>
                {this.pictures[1].map((item, ) => (
                  <TouchableHighlight
                  onPress={() => {
                    this.props.navigation.navigate('ExplorePicture', {attrs: item})
                  }}>
                    <Image
                      style={styles.image}
                      source={{uri: item.url}}
                    />
                  </TouchableHighlight>
                ))}
              </View>
            </View>
          </ScrollView>
        </GestureRecognizer>
      );
    }
    return (
      <LoadingScreen/>
    );
  }
}
