import React from 'react';
import {
  Linking, TouchableHighlight, View, Text
} from 'react-native';
import { Badge } from 'react-native-elements'
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import { ThemeColors, ThemeContext, useTheme } from '../../themes';
import { ArticleType } from '../../types';


const ArticlePicture = styled(FastImage)`
  height: 100px;
  marginTop: 8px;
  marginBottom: 25px;
  borderRadius: 5px;
`;
const ArticleTitle = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 20px;
  fontWeight: 600;
`;

interface Props {
  index: number,
  item: ArticleType,
  nArticles: number,
}
function Article({ index, item, nArticles }: Props) {
  const theme: ThemeContext = useTheme();

  if (!item.image) {
    const mockImages: Array<string> = [
      'https://cdn.spacetelescope.org/archives/images/screen/heic0206c.jpg',
      'https://cdn.spacetelescope.org/archives/images/screen/heic1713a.jpg',
      'https://cdn.spacetelescope.org/archives/images/screen/heic0707a.jpg',
    ]
    const imgIndex: number = Math.floor(Math.random() * 2);
    item.image = mockImages[imgIndex];
  }

  return (
    <TouchableHighlight
      style={[{
        alignSelf: 'center',
        width: '90%',
        marginBottom: 35,
      },
      index < nArticles - 1 && nArticles > 1
        ? { borderBottomWidth: 1.5, borderBottomColor: theme.getColors().bgColor2 }
        : {},
      ]}
      onPress={() => Linking.openURL(item.url)}
      underlayColor="none"
    >
      <View>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <ArticleTitle>{item.title}</ArticleTitle>
        </View>
        <Badge
          value={item.site}
          status={theme.getColors().badge}
          containerStyle={{ alignSelf: 'flex-start' }}
        />
        <Text>{item.categories}</Text>
        <ArticlePicture source={{ uri: item.image }} />
      </View>
    </TouchableHighlight>
  );
}

export default Article;
