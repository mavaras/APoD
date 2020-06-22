import React from 'react';
import { Linking, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components";

import { ThemeColors, ThemeContext, useTheme } from '../../themes';


const RowView = styled.View`
  width: 90%;
  alignSelf: center;
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  borderRadius: 10px;
  marginTop: 30px;
`;
const RowTextTitle = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 20px;
  fontWeight: 500;
  marginBottom: 15px;
  width: 90%;
`;
const RowTextPerson = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.iconColor};
  fontSize: 18px;
  width: 95%;
`;
const SectionTitleText = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 29px;
  marginLeft: 18px;
  fontWeight: 600;
`;

interface Props {
  items: Array<Array<Object>>,
}
function DataDisplay({ items }: Props) {
  const theme: ThemeContext = useTheme();

  return (
    <ScrollView>
      {items.map((sectionItems: Array<Object>) => (
        <View>
          <View style={{ width: '90%', alignSelf: 'center', marginTop: 50 }}>
            <SectionTitleText>{sectionItems.title}</SectionTitleText>
          </View>
          <RowView>
            {sectionItems.titles.map((item, index: number) => (
              <View
                style={[{
                  width: '90%',
                  alignSelf: 'center',
                  paddingTop: 20,
                  paddingBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                },
                index < sectionItems.titles.length - 1 && sectionItems.titles.length > 1
                  ? { borderBottomWidth: 1.5, borderBottomColor: theme.getColors().bgColor2 }
                  : {},
                ]}
              >
                <View style={{ width: '100%' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <RowTextTitle>{item.title}</RowTextTitle>
                    {item.url
                      ? (
                        <Icon.Button
                          name="link"
                          size={20}
                          style={{
                            height: 50,
                            marginTop: -11,
                            borderRadius: 0,
                            backgroundColor: theme.getColors().bgColor,
                          }}
                          iconStyle={{
                            color: theme.getColors().iconColor,
                          }}
                          onPress={() => Linking.openURL(item.url)}
                        />
                      ) : undefined}
                  </View>
                  <RowTextPerson>by {item.person}</RowTextPerson>
                </View>
              </View>
            ))}
          </RowView>
        </View>
      ))}
    </ScrollView>
  );
}

export default DataDisplay;
