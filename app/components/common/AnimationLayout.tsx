import React, { useEffect } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import Animation from 'lottie-react-native';
import { useTheme } from '../../themes';


function AnimationLayout({ animation, text, render = true }) {
  const theme = useTheme();
  let animationAux = animation;

  useEffect(() => {
    if (render) animationAux.play();
  }, []);

  if (render) {
    return (
      <SafeAreaView style={{ backgroundColor: theme.getColors().bgColor, height: '100%' }}>
        <View style={{ marginTop: '55%', justifyContent: 'center', alignItems: 'center' }}>
          <Animation
            ref={(animationRef) => { animationAux = animationRef; }}
            style={{ width: 100, height: 100 }}
            source={animation}
          />
        </View>
        <View>
          <Text style={{ color: theme.getColors().fontColor, fontSize: 21, textAlign: 'center' }}>
            {text}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  return (null);
}

export default AnimationLayout;
