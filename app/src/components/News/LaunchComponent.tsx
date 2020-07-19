import React from 'react';
import { View } from 'react-native';
import { Badge } from 'react-native-elements'
import styled from 'styled-components';
import FastImage from 'react-native-fast-image';

import { ThemeColors, ThemeContext, useTheme } from '../../themes';
import { RocketLaunchType } from '../../types';


const LaunchPicture = styled(FastImage)`
  height: 250px;
  marginTop: 8px;
  marginBottom: 25px;
  borderRadius: 3px;
`;
const LaunchTitle = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 20px;
  fontWeight: 600;
`;
const LaunchDescription = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  textAlign: justify;
  marginBottom: 8px;
`;
const LaunchDate = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 17px;
  fontWeight: 600;
`;


interface Props {
  index: number,
  item: RocketLaunchType,
  nLaunches: number,
}
function Launch({ index, item, nLaunches }: Props) {
  const theme: ThemeContext = useTheme();

  return (
    <View
      style={[{
        alignSelf: 'center',
        width: '90%',
        marginBottom: 35,
      },
      index < nLaunches - 1 && nLaunches > 1
        ? { borderBottomWidth: 1.5, borderBottomColor: theme.getColors().bgColor2 }
        : {},
      ]}
    >
      <View>
        <View style={{ marginBottom: 10 }}>
          <LaunchTitle>{item.name}</LaunchTitle>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Badge
            value={item.typeName}
            status={theme.getColors().badge}
            containerStyle={{ alignSelf: 'flex-start', marginBottom: 20, marginRight: 10 }}
          />
          <Badge
            value={item.location}
            status={theme.getColors().badge}
            containerStyle={{ alignSelf: 'flex-start', marginBottom: 20 }}
          />
        </View>
        <LaunchDate>{item.date.split(',')[0]}</LaunchDate>
        <LaunchDescription>{item.description}</LaunchDescription>
        <LaunchPicture source={{ uri: item.image }} />
      </View>
    </View>
  );
}

export default Launch;
