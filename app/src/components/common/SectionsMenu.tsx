import React from 'react';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components";

import { ThemeColors, ThemeContext, useTheme } from '../../themes';
import { SettingMenuItemType } from '../../types';


const ScrollView = styled.ScrollView`
  /*backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};*/
`;

const RowView = styled.View`
  width: 90%;
  alignSelf: center;
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  borderRadius: 10px;
  marginTop: 30px;
`;
const RowTouchableView = styled.View`
  flexDirection: row;
`;
const RowText = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 17px;
  width: 92%;
`;

interface Props {
  items: SettingMenuItemType[][],
}
function SectionsMenu({ items }: Props) {
  const theme: ThemeContext = useTheme();

  return (
    <ScrollView>
      {items.map((sectionItems: SettingMenuItemType[]) => (
        <RowView>
          {sectionItems.map((item: SettingMenuItemType, index: number) => (
            <TouchableHighlight
              style={[{
                width: '90%',
                alignSelf: 'center',
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
              },
              index < sectionItems.length - 1 && sectionItems.length > 1
                ? { borderBottomWidth: 1.5, borderBottomColor: theme.getColors().bgColor2 }
                : {},
              ]}
              onPress={item.action}
              underlayColor="none"
            >
              <RowTouchableView>
                <RowText>{item.title}</RowText>
                <Icon
                  name={item.iconName}
                  size={26}
                  style={[{ width: '8%' }, item.extraStyle]}
                />
              </RowTouchableView>
            </TouchableHighlight>
          ))}
        </RowView>
      ))}
    </ScrollView>
  );
}

export default SectionsMenu;
