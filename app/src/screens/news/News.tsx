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
const SafeAreaView = styled.SafeAreaView`
  height: ${Dimensions.get('window').height};
  flex: 1;
  overflow: hidden;
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
`;


function NewsScreen() {
  const theme: ThemeContext = useTheme();
  const { t }: UseTranslationResponse = useTranslation();

  const [loading, setLoading] = useState<boolean>(true);
  const [currView, setCurrView] = useState<string>('news');

  const { data: news } = useQuery(GET_NEWS, {
    onCompleted: async () => {
      await getLaunches();
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
        tabsContainerStyle={{ marginTop: 20, marginBottom: 30, width: '90%', marginLeft: '5%' }}
        activeTabStyle={{ backgroundColor: theme.getColors().activeSectionMenuColor }}
        activeTabTextStyle={{ color: theme.getColors().bgColor }}
        tabTextStyle={{ color: theme.getColors().activeSectionMenuColor }}
        borderRadius={0}
        values={[t('news.news'), t('news.rockets')]}
        selectedIndex={currView === 'news' ? 0 : 1}
        onTabPress={changeNewsView}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
