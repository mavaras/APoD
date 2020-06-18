import Animation from 'lottie-react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import { ThemeContext, useTheme } from '../../themes';


interface Props {
  animation: Animation,
  text: string,
  render?: boolean,
}
function AnimationLayout({ animation, text, render = true }: Props) {
  const theme: ThemeContext = useTheme();
  let animationAux: Animation = animation;

  useEffect(() => {
    if (render) {
      animationAux.play();
    }
  });

  if (render) {
    return (
      <SafeAreaView style={{ backgroundColor: theme.getColors().bgColor, height: '100%' }}>
        <View style={{ marginTop: '55%', justifyContent: 'center', alignItems: 'center' }}>
          <Animation
            ref={(animationRef) => { animationAux = animationRef; }}
            style={{ width: 100, height: 100, backgroundColor: theme.getColors().fontColor, borderRadius: 60 }}
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
