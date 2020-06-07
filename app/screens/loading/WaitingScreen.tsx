import React, { useEffect } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import Animation from 'lottie-react-native';
import { useTheme } from '../../themes';


function WaitingScreen() {
  const theme = useTheme();
  let animation = require('../../res/animations/planet.json'); // eslint-disable-line global-require

  useEffect(() => {
    animation.play();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: theme.getColors().bgColor, height: '100%' }}>
      <View style={{ marginTop: '55%', justifyContent: 'center', alignItems: 'center' }}>
        <Animation
          ref={(animationRef) => { animation = animationRef; }}
          style={{ width: 100, height: 100 }}
          source={animation}
        />
      </View>
      <View>
        <Text style={{ color: theme.getColors().fontColor, fontSize: 21, textAlign: 'center' }}>
          Today&apos;s APoD will appear soon.
          {'\n'}
          Stay tuned!
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default WaitingScreen;
