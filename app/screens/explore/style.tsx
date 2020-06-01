import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../themes';
import { SearchBar } from 'react-native-elements';


export const FlatList = styled.FlatList`
  marginTop: 6;
  marginBottom: 0;
`;
export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  backgroundColor: ${colors.bgColor};
`;
export const LayoutButton = styled(Icon.Button)`
  backgroundColor: ${colors.bgColor};
  height: 100%;
  borderLeftWidth: 1;
  borderLeftColor: ${colors.borderColor};
  borderRightWidth: 1;
  borderRightColor: ${colors.borderColor};
`;
export const ButtonDisplayLayoutView = styled.View`
  backgroundColor: ${colors.bgColor};
  width: 12%;
  flex: 1;
  justifyContent: center;
  alignItems: center;
  borderBottomWidth: 2.5;
  borderBottomColor: ${colors.borderColor};
`;
export const ButtonDisplayLayout = styled(Icon.Button)`
  backgroundColor: ${colors.bgColor};
`;
export const LayoutButtonsView = styled.View`
  flexDirection: row;
  alignContent: flex-start;
  marginLeft: 6;
`;
export const HeartButtonView = styled.View`
  marginRight: 6;
  flexDirection: row;
  justifyContent: flex-end;
`;
export const TopLayoutView = styled.View`
  flexDirection: row;
  backgroundColor: ${colors.borderColor};
`;
export const SearchInputView = styled.View`
  width: 87%;
`;
export const ActivityIndicator = styled.ActivityIndicator`
  color: #000;
  height: 100;
  marginBottom: 50;
`;

export const styles = StyleSheet.create({
  layoutButton: {
    backgroundColor: colors.bgColor,
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: colors.borderColor,
    borderRightWidth: 1,
    borderRightColor: colors.borderColor,
  },
  layoutButtonIcon: {
    color: colors.buttonColor,
    marginLeft: 10,
  },
  searchBar: {
    backgroundColor: colors.bgColor,
    borderBottomWidth: 2.5,
    borderBottomColor: colors.borderColor,
    borderTopColor: colors.bgColor,
  },
  layoutDisplayButton: {
    backgroundColor: colors.bgColor,
  },
});
