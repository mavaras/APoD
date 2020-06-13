import React from 'react';

import AnimationLayout from '../../components/common/AnimationLayout';


interface Props {
  text: string;
}
function WaitingScreen({ text }: Props) {
  const animation = require('../../res/animations/planet.json'); // eslint-disable-line global-require

  return (
    <AnimationLayout animation={animation} text={text} />
  );
}

export default WaitingScreen;
