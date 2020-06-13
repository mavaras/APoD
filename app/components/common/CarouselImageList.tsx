import React from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import styled from 'styled-components';

import { ThemeContext, useTheme } from '../../themes';


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

function CarouselPictureList({ navigation, list }) {
  const theme: ThemeContext = useTheme();
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
            <ImageSimilars source={{ uri: item.url }} />
          </SimilarsTouchableHighlight>
        ))}
      </SimilarsScrollView>
    </SimilarsView>
  );
}

export default CarouselPictureList;
