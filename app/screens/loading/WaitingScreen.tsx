import React from 'react';
import { useTranslation } from 'react-i18next';
import AnimationLayout from '../../components/common/AnimationLayout';


function WaitingScreen() {
  const animation = require('../../res/animations/planet.json'); // eslint-disable-line global-require
  const { t } = useTranslation();
  const text = t('others.waitingScreen');

  return (
    <AnimationLayout animation={animation} text={text} />
  );
}

export default WaitingScreen;
