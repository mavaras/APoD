import React from 'react';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from "styled-components";

import { ThemeColors, ThemeContext, useTheme } from '../../themes';


const ScrollView = styled.ScrollView`
  /*backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};*/
`;

const RowView = styled.View`
  width: 90%;
  alignSelf: center;
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  borderRadius: 10;
  marginTop: 30;
`;
const RowTouchableView = styled.View`
  flexDirection: row;
`;
const RowText = styled.Text`
  color: ${({ theme }: ThemeColors) => theme.fontColor};
  fontSize: 17;
  width: 92%;
`;

interface Props {
  items: Array<Array<Object>>,
}
function SectionsMenu({ items }: Props) {
  const theme: ThemeContext = useTheme();

  return (
    <ScrollView>
      {items.map((sectionItems: Array<Object>) => (
        <RowView>
          {sectionItems.map((item, index) => (
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
