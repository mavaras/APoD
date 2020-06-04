import { Animated, Dimensions, StyleSheet } from 'react-native';
import Shimmer from 'react-native-shimmer';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../themes';
import FastImage from 'react-native-fast-image';


export const SafeAreaView = styled.SafeAreaView`
  height: ${Dimensions.get('window').height};
  flex: 1;
  overflow: hidden;
  backgroundColor: ${({ theme }) => theme.bgColor};
  
`;
export const Video = styled.View`
  width: 100%;
  height: 350;
  marginBottom: -360;
`;
export const TouchableHighlight = styled.View`
  height: 0;
  marginTop: 20;
  backgroundColor: ${({ theme }) => theme.bgColor};
`;
export const AnimatedScrollView = styled(Animated.ScrollView)`
  backgroundColor: ${({ theme }) => theme.bgColor};
  height: ${Dimensions.get('window').height + 400};
  marginTop: 370;
  borderTopLeftRadius: 20;
  borderTopRightRadius: 20;
`;
export const PictureInfoView = styled.View`
  justifyContent: center;
  alignItems: center;
`;
export const PictureDescription = styled.Text`
  color: ${({ theme }) => theme.fontColor};
  fontSize: 15.7;
  width: 90%;
  alignItems: center;
  textAlign: justify;
`;
export const PictureTitle = styled.Text`
  color: ${({ theme }) => theme.fontColor};
  marginTop: 40;
  width: 90%;
  marginBottom: 30;
  fontSize: 22.5;
  textAlign: center;
  fontWeight: bold;
`;
export const Image = styled.Image`
  width: 100%;
  height: 300;
  marginTop: 20;
  borderRadius: 0;
`;
export const FastImageSmall = styled(FastImage)`
  width: 100%;
  height: 100%;
  position: absolute;
  marginBottom: 0;
  borderRadius: 5;
`;
export const ImageShimmer = styled(Shimmer)`
  justifyContent: center;
  marginTop: 20;
`;
export const ImageSmallShimmer = styled(Shimmer)`
  justifyContent: center;
`;
export const ImageSmallShimmerInner = styled.Text`
  width: 100%;
  backgroundColor: ${({ theme }) => theme.shimmerColor};
  overflow: hidden;
  borderRadius: 5;
`;
export const ShimmerInner = styled.Text`
  height: 500;
  width: 500;
  backgroundColor: ${({ theme }) => theme.shimmerColor};
`;
export const DialogContent = styled.Text`
  marginTop: 20;
`;
export const PictureDateView = styled.View`
  justifyContent: center;
  borderTopLeftRadius: 15;
  borderBottomRightRadius: 15;
  alignItems: center;
  backgroundColor: ${({ theme }) => theme.shimmerColor};
  marginLeft: 5%;
  marginTop: 37;
  width: 90%;
  height: 70;
`;
export const PictureDateView2 = styled.View`
  flexDirection: row;
`;
export const PictureDateIcon = styled.View``;
export const PictureDateText = styled.Text`
  color: ${({ theme }) => theme.fontColor};
  marginLeft: 10;
  marginTop: 3;
  fontSize: 17;
`;
export const SimilarsView = styled.View`
  marginLeft: 5%;
  marginRight: 5%;
  marginTop: 35;
`;
export const SimilarsText = styled.Text`
  color: ${({ theme }) => theme.fontColor};
  fontWeight: 600;
  fontSize: 20;
  marginBottom: 30;
`;
export const SimilarsScrollView = styled.ScrollView`
  backgroundColor: ${({ theme }) => theme.bgColor};
`;
export const SimilarsTouchableHighlight = styled.TouchableHighlight`
  marginRight: 5;
  width: 130;
`;
export const ImageSimilars = styled.Image`
  height: 130;
  borderRadius: 7;
  width: 100%;
  position: absolute;
  marginBottom: 0;
  borderRadius: 5;
`;
export const PictureIconsView = styled.View`
  marginRight: 5%;
  marginLeft: 5%;
  marginTop: 0;
  flexDirection: row;
  height: 40;
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
  backgroundColor: ${({ theme }) => theme.bgColor};
  height: 100%;
`;
export const PictureAuthorView = styled.View`
  flexDirection: row;
  marginTop: -23;
  marginBottom: 30;
`;
export const PictureAuthorIcon = styled(Icon)`
  color: ${({ theme }) => theme.highlightColor};
  marginTop: 2;
`;
export const PictureAuthorText = styled.Text`
  color: ${({ theme }) => theme.fontColor};
  marginLeft: 10;
`;


export const styles = StyleSheet.create({
  iconStyle: {
    color: colors.iconColor,
    marginRight: -3,
  },
  iconButtonStyle: {
    backgroundColor: colors.bgColor,
    height: '100%',
  },
  animatedScrollView: {
    height: Dimensions.get('window').height + 400,
    marginTop: 370,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
