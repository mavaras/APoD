import { useLazyQuery, useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import {
  Animated,
  Dimensions,
  View,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import styled from 'styled-components';

import Article from '../../components/News/ArticleComponent';
import Launch from '../../components/News/LaunchComponent';
import { ThemeColors, ThemeContext, useTheme } from '../../themes';
import { ArticleType, RocketLaunchType } from '../../types';
import LoadingScreen from '../loading/LoadingScreen';
import { GET_LAUNCHES, GET_NEWS } from './queries';


const ScreenTitleView = styled(Animated.View)`
  alignSelf: center;
  flexDirection: row;
  width: 90%;
  marginTop: 0px;
  marginBottom: 30px;
`;
const ScreenTitle = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 24px;
  fontWeight: 600;
  width: 87%;
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
  const { t }: UseTranslationResponse = useTranslation();

  const [loading, setLoading] = useState<Boolean>(true);
  const [currView, setCurrView] = useState<string>('news');

  const { data: news } = useQuery(GET_NEWS, {
    onCompleted: () => {
      getLaunches();
    },
  });

  const [getLaunches, { data: launches }] = useLazyQuery(GET_LAUNCHES, {
    onCompleted: () => {
      setLoading(false);
    },
  });

  function changeNewsView() {
    setCurrView(currView === 'news' ? 'rockets' : 'news');
  }

  if (loading) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <SafeAreaView>
      <SegmentedControlTab
        tabsContainerStyle={{ marginTop: 20, marginBottom: 40, width: '90%', marginLeft: '5%' }}
        borderRadius={0}
        values={[t('news.news'), t('news.rockets')]}
        selectedIndex={currView === 'news' ? 0 : 1}
        onTabPress={changeNewsView}
      />
      {/*<ScreenTitleView>
        {currView === 'news'
          ? (
            <ScreenTitle>{t('news.news')}</ScreenTitle>
          ) :
            <ScreenTitle>{t('news.rockets')}</ScreenTitle>
        }
      </ScreenTitleView>*/}
      <Animated.ScrollView
        style={{ marginBottom: 35 }}
      >
        {currView === 'news'
          ? (
            <View>
              {news.news.map((article: ArticleType, index: number) => (
                <Article
                  index={index}
                  item={article}
                  nArticles={news.news.length}
                />
              ))}
            </View>) : (
            <View>
              {launches.launches.map((launch: RocketLaunchType, index: number) => (
                <Launch
                  index={index}
                  item={launch}
                  nLaunches={launches.launches.length}
                />
              ))}
            </View>)
        }
          </Animated.ScrollView>
    </SafeAreaView>
  );
}

export default NewsScreen;
