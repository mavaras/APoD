import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

import { ThemeColors } from '../../themes';


export const FlatList = styled.FlatList`
  marginTop: 6px;
  marginBottom: 0px;
`;
export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
`;
export const LayoutButton = styled(Icon.Button)`
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  height: 100%;
  borderLeftWidth: 1px;
  borderLeftColor: ${({ theme }: ThemeColors) => theme.borderColor};
  borderRightWidth: 1px;
  borderRightColor: ${({ theme }: ThemeColors) => theme.borderColor};
`;
export const ButtonDisplayLayoutView = styled.View`
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
  width: 12%;
  flex: 1;
  justifyContent: center;
  alignItems: center;
  borderBottomWidth: 2.5px;
  borderBottomColor: ${({ theme }: ThemeColors) => theme.shimmerColor};
`;
export const ButtonDisplayLayout = styled(Icon.Button)`
  backgroundColor: ${({ theme }: ThemeColors) => theme.bgColor};
`;
export const LayoutButtonsView = styled.View`
  flexDirection: row;
  alignContent: flex-start;
  marginLeft: 6px;
`;
export const HeartButtonView = styled.View`
  marginRight: 6px;
  flexDirection: row;
  justifyContent: flex-end;
`;
export const TopLayoutView = styled.View`
  flexDirection: row;
  backgroundColor: ${({ theme }: ThemeColors) => theme.borderColor};
`;
export const SearchInputView = styled.View`
  width: 87%;
`;
export const ActivityIndicator = styled.ActivityIndicator`
  color: #000;
  height: 100px;
  marginBottom: 50px;
`;

export const styles = StyleSheet.create({
  layoutButton: {
    height: '100%',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  layoutButtonIcon: {
    marginLeft: 10,
  },
});
