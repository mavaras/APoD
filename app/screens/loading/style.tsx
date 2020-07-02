import Animation from 'lottie-react-native';
import styled from 'styled-components';

import { ThemeColors } from '../../themes';


export const AnimationView = styled.View`
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
export const LottieComponent = styled(Animation)`
  width: 700px;
  height: 300px;
`;
