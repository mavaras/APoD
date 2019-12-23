import React from 'react';
import {
  View
} from 'react-native';
import Animation from 'lottie-react-native';
import styles from './style';


export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.animation = require('./../../res/animations/rocket.json');
  }

  componentDidMount() {
    this.animation.play();
  }

  render() {
    return(
      <View style={styles.animationView}>
        <Animation
          ref={animation => { this.animation = animation; }}
          loop={true}
          style={styles.lottieComponent}
          source={this.animation}
        />
      </View>
    );
  }
}