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
  backgroundColor: ${({ theme }) => theme.bgColor};
`;
export const LayoutButton = styled(Icon.Button)`
  backgroundColor: ${({ theme }) => theme.bgColor};
  height: 100%;
  borderLeftWidth: 1;
  borderLeftColor: ${({ theme }) => theme.borderColor};
  borderRightWidth: 1;
  borderRightColor: ${({ theme }) => theme.borderColor};
`;
export const ButtonDisplayLayoutView = styled.View`
  backgroundColor: ${({ theme }) => theme.bgColor};
  width: 12%;
  flex: 1;
  justifyContent: center;
  alignItems: center;
  borderBottomWidth: 2.5;
  borderBottomColor: ${({ theme }) => theme.shimmerColor};
`;
export const ButtonDisplayLayout = styled(Icon.Button)`
  backgroundColor: ${({ theme }) => theme.bgColor};
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
  backgroundColor: ${({ theme }) => theme.borderColor};
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
});
