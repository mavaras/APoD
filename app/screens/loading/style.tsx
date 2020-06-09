import Animation from 'lottie-react-native';
import styled from 'styled-components';


export const AnimationView = styled.View`
  backgroundColor: ${({ theme }) => theme.bgColor};
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;
export const LottieComponent = styled(Animation)`
  width: 700;
  height: 300;
`;
