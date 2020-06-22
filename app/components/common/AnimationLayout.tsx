import Animation from 'lottie-react-native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import styled from "styled-components";

import { ThemeColors } from '../../themes';


const ScrollView = styled.SafeAreaView`
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  height: 100%;
`;
const AnimationView = styled.View`
  marginTop: 55%;
  justifyContent: center;
  alignItems: center;
`;
const AnimationComponent = styled(Animation)`
  width: 100px;
  height: 100px;
  backgroundColor: ${({ theme }: ThemeColors) => (theme.fontColor === 'black' ? theme.bgColor : theme.fontColor)};
  borderRadius: 60px;
`;
const AnimationText = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 21px;
  textAlign: center;
`;

interface Props {
  animation: Animation,
  text: string,
  render?: boolean,
}
function AnimationLayout({ animation, text, render = true }: Props) {
  let animationAux: Animation = animation;

  useEffect(() => {
    if (render) {
      animationAux.play();
    }
  });

  if (render) {
    return (
      <ScrollView>
        <AnimationView>
          <AnimationComponent
            ref={(animationRef) => { animationAux = animationRef; }}
            source={animation}
          />
        </AnimationView>
        <View>
          <AnimationText>
            {text}
          </AnimationText>
        </View>
      </ScrollView>
    );
  }
  return (null);
}

export default AnimationLayout;
