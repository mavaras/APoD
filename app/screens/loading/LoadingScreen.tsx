import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animation from 'lottie-react-native';
import styles from './style';


function LoadingScreen() {
  let animation = require('../../res/animations/loading_line.json'); // eslint-disable-line no-undef, global-require

  useEffect(() => {
    animation.play();
  }, []);

  return (
    <View style={styles.animationView}>
      <Animation
        ref={(animationn) => { animation = animationn; }}
        style={styles.lottieComponent}
        source={animation}
      />
    </View>
  );
}

export default LoadingScreen;
