import React from 'react';
import { useTranslation } from 'react-i18next';

import AnimationLayout from '../../components/common/AnimationLayout';


function WaitingScreen({ text }) {
  const animation = require('../../res/animations/planet.json'); // eslint-disable-line global-require

  return (
    <AnimationLayout animation={animation} text={text} />
  );
}

export default WaitingScreen;
