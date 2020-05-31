import React from 'react';
import { TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import styled from "styled-components";


const RowView = styled.View`
  width: 90%;
  alignSelf: center;
  backgroundColor: white;
  borderRadius: 10;
  marginTop: 30;
`;
const RowTouchableView = styled.View`
  flexDirection: row;
`;
const RowText = styled.Text`
  fontSize: 17;
  width: 92%;
`;

function SectionsMenu({ items }) {
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
                index % 2 === 0 && sectionItems.length > 1
                  ? { borderBottomWidth: 1.5, borderBottomColor: '#ececece1' }
                  : {},
              ]}
              onPress={item.action}
              underlayColor="none"
            >
              <RowTouchableView>
                <RowText>{item.title}</RowText>
                <Icon name={item.iconName} size={26} style={[{ width: '8%'}, item.extraStyle]} />
              </RowTouchableView>
            </TouchableHighlight>
          ))}
        </RowView>
      ))}
    </ScrollView>
  );
}

export default SectionsMenu;
