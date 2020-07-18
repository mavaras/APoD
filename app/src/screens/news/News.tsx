import { useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions, Linking, ScrollView,
  Text, View,
} from 'react-native';
import styled from 'styled-components';

import Article from '../../components/News/ArticleComponent';
import { ThemeColors } from '../../themes';
import { ArticleType } from '../../types';
import LoadingScreen from '../loading/LoadingScreen';
import { GET_NEWS } from './queries';


const ScreenTitleView = styled(Animated.View)`
  alignSelf: center;
  width: 90%;
  marginTop: 40px;
  marginBottom: 40px;
`;
const ScreenTitle = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 24px;
  fontWeight: 600;
  width: 92%;
`;
const ArticleTitle = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 18px;
  fontWeight: 500;
`;
const SafeAreaView = styled.SafeAreaView`
  height: ${Dimensions.get('window').height};
  flex: 1;
  overflow: hidden;
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
`;


function NewsScreen() {
  const [loading, setLoading] = useState<Boolean>(true);
  const [isScrolling, setIsScrolling] = useState<Boolean>(false);
  const [scrollY] = useState<Animated.Value>(new Animated.Value(0));
  const ImageScale: Animated.AnimatedInterpolation = scrollY.interpolate({
    inputRange: [-10, 0, 10],
    outputRange: [1, 1.1, 1],
    extrapolate: 'clamp',
  });

  const { data: news } = useQuery(GET_NEWS, {
    onCompleted: () => {
      setLoading(false);
    },
  });

  if (loading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <SafeAreaView>
      <ScreenTitleView>
        <ScreenTitle>Latest Astronomy News</ScreenTitle>
      </ScreenTitleView>
      <Animated.ScrollView
        style={{ marginBottom: 35 }}        
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          },
        )}
      >
        <View>
          {news.news.map((article: ArticleType, index: number) => (
            <Article
              index={index}
              item={article}
              nArticles={news.news.length}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

export default NewsScreen;
