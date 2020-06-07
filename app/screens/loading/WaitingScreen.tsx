import React from 'react';
import AnimationLayout from '../../components/common/AnimationLayout';


function WaitingScreen() {
  const animation = require('../../res/animations/planet.json'); // eslint-disable-line global-require
  const text = "Today's APoD will appear soon.\nStay tuned!";

  return (
    <AnimationLayout animation={animation} text={text} />
  );
}

export default WaitingScreen;
