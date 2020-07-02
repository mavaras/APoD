import { Animated, Dimensions, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Shimmer from 'react-native-shimmer';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

import { ThemeColors } from '../../themes';


export const SafeAreaView = styled.SafeAreaView`
  height: ${Dimensions.get('window').height};
  flex: 1;
  overflow: hidden;
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
`;
export const Video = styled.View`
  width: 100%;
  height: 350px;
  marginBottom: -360px;
`;
export const TouchableHighlight = styled.View`
  height: 0px;
  marginTop: 20px;
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
`;
export const AnimatedScrollView = styled(Animated.ScrollView)`
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  height: ${Dimensions.get('window').height + 400};
  marginTop: 370px;
  borderTopLeftRadius: 20px;
  borderTopRightRadius: 20px;
`;
export const PictureInfoView = styled.View`
  justifyContent: center;
  alignItems: center;
`;
export const PictureDescription = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 15.7px;
  width: 90%;
  alignItems: center;
  textAlign: justify;
`;
export const PictureTitle = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  marginTop: 40px;
  width: 90%;
  marginBottom: 30px;
  fontSize: 22.5px;
  textAlign: center;
  fontWeight: bold;
`;
export const Image = styled.Image`
  width: 100%;
  height: 300px;
  marginTop: 20px;
  borderRadius: 0px;
`;
export const FastImageSmall = styled(FastImage)`
  width: 100%;
  height: 100%;
  position: absolute;
  marginBottom: 0px;
  borderRadius: 5px;
`;
export const ImageShimmer = styled(Shimmer)`
  justifyContent: center;
  marginTop: 20px;
  position: absolute;
`;
export const ImageSmallShimmer = styled(Shimmer)`
  justifyContent: center;
`;
export const ImageSmallShimmerInner = styled.Text`
  width: 100%;
  backgroundColor: ${({ theme }: ThemeColors) => theme.shimmerColor};
  overflow: hidden;
  borderRadius: 5px;
`;
export const ShimmerInner = styled.Text`
  height: 360px;
  width: 500px;
  backgroundColor: ${({ theme }: ThemeColors) => theme.shimmerColor};
  overflow: hidden;
`;
export const DialogContent = styled.Text`
  marginTop: 20px;
`;
export const PictureDateView = styled.View`
  justifyContent: center;
  borderTopLeftRadius: 15px;
  borderBottomRightRadius: 15px;
  alignItems: center;
  backgroundColor: ${({ theme }: ThemeColors) => theme.shimmerColor};
  marginLeft: 5%;
  marginTop: 37px;
  width: 90%;
  height: 70px;
`;
export const PictureDateView2 = styled.View`
  flexDirection: row;
`;
export const PictureDateText = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  marginLeft: 13px;
  marginTop: 2.5px;
  fontSize: 17px;
  fontWeight: 500;
`;
export const PictureIconsView = styled.View`
  marginRight: 5%;
  marginLeft: 5%;
  marginTop: 0px;
  flexDirection: row;
  height: 40px;
`;
export const PictureIconsViewRight = styled.View`
  flexDirection: row;
  justifyContent: flex-end;
  width: 92%;
`;
export const PictureIconsViewLeft = styled.View`
  width: 8%;
`;
export const PictureIconsIcon = styled(Icon.Button)`
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  borderRadius: 0px;
  height: 100%;
`;
export const PictureAuthorView = styled.View`
  flexDirection: row;
  marginTop: -18px;
  marginBottom: 30px;
`;
export const PictureAuthorIcon = styled(Icon)`
  color: ${({ theme }: ThemeColors) => theme.iconColor};
  marginTop: 2.7px;
`;
export const PictureAuthorText = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  marginLeft: 10px;
  fontSize: 15px;
  fontStyle: italic;
`;


export const styles = StyleSheet.create({
  iconStyle: {
    marginRight: -3,
  },
  iconButtonStyle: {
    height: '100%',
  },
  animatedScrollView: {
    marginTop: 370,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
