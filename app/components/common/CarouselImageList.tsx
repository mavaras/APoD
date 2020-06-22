import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { View } from 'react-native';
import Shimmer from 'react-native-shimmer';
import styled from 'styled-components';

import { ThemeColors } from '../../themes';


const SimilarsView = styled.View`
  marginLeft: 5%;
  marginRight: 5%;
  marginTop: 35;
`;
const SimilarsText = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontWeight: 600;
  fontSize: 20;
  marginBottom: 30;
`;
const SimilarsScrollView = styled.ScrollView`
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
`;
const SimilarsTouchableHighlight = styled.TouchableHighlight`
  marginRight: 5;
  width: 130;
`;
const ImageSimilars = styled.Image`
  height: 130;
  borderRadius: 7;
  width: 100%;
  position: absolute;
  marginBottom: 0;
  borderRadius: 5;
`;
const ImageShimmer = styled(Shimmer)`
  justifyContent: center;
`;
const ShimmerInner = styled.Text`
  height: 130;
  width: 100%;
  backgroundColor: ${({ theme }: ThemeColors) => theme.shimmerColor};
  overflow: hidden;
  borderRadius: 5;
`;

type RootStackParamList = {
  Explore: undefined;
  Settings: undefined;
  Picture: undefined;
  ExplorePicture: undefined;
};
interface Props {
  navigation: StackNavigationProp<RootStackParamList, 'Picture'>,
  list: Array<object>,
}
function CarouselPictureList({ navigation, list }: Props) {
  const { t }: UseTranslationResponse = useTranslation();

  if (Object.keys(list).length === 0) {
    return (null);
  }
  return (
    <SimilarsView>
      <SimilarsText>{t('picture.similarsLabel')}</SimilarsText>
      <SimilarsScrollView
        horizontal={true}
        contentContainerStyle={{ height: 300 }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        decelerationRate="fast"
        pagingEnabled
      >
        {list?.map((item) => (
          <SimilarsTouchableHighlight
            underlayColor="none"
            onPress={() => {
              navigation.push('Explore Picture', { attrs: item });
            }}
          >
            <View>
              <ImageShimmer
                pauseDuration={580}
                opacity={0.55}
              >
                <ShimmerInner />
              </ImageShimmer>
              <ImageSimilars source={{ uri: item.url }} />
            </View>
          </SimilarsTouchableHighlight>
        ))}
      </SimilarsScrollView>
    </SimilarsView>
  );
}

export default CarouselPictureList;
