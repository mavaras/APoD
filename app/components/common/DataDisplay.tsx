import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from "styled-components";


const RowView = styled.View`
  width: 90%;
  alignSelf: center;
  backgroundColor: ${({ theme }) => theme.bgColor};
  borderRadius: 10px;
  marginTop: 30px;
`;
const RowTextTitle = styled.Text`
  color: ${({ theme }) => theme.fontColor};
  fontSize: 20px;
  fontWeight: 500;
  marginBottom: 15px;
  width: 92%;
`;
const RowTextPerson = styled.Text`
  color: ${({ theme }) => theme.fontColor};
  fontSize: 18px;
  width: 92%;
`;
const SectionTitleText = styled.Text`
  fontSize: 25px;
  fontWeight: 600;
`;

interface Props {
  items: Array<Array<Object>>,
}
function DataDisplay({ items }: Props) {console.log(items);
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
                  ? { borderBottomWidth: 1.5, borderBottomColor: '#ececece1' }
                  : {},
                ]}
              >
                <View style={{ width: '100%' }}>
                  <RowTextTitle>{item.title}</RowTextTitle>
                  <RowTextPerson>{item.person}</RowTextPerson>
                  <RowTextPerson>{item.url}</RowTextPerson>
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
