import Animation from 'lottie-react-native';
import React, { useEffect } from 'react';

import * as _ from './style';


function LoadingScreen() {
  let animation: Animation = require('../../res/animations/loading_line.json'); // eslint-disable-line no-undef, global-require

  useEffect(() => {
    animation.play();
  }, []);

  return (
    <_.AnimationView>
      <_.LottieComponent
        ref={(animationRef: Animation) => { animation = animationRef; }}
        source={animation}
      />
    </_.AnimationView>
  );
}

export default LoadingScreen;
