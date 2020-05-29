import { StyleSheet } from 'react-native';
import colors from '../../themes';


export default StyleSheet.create({
  flatList: {
    marginTop: 6,
    marginBottom: 0,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },

  layoutPopoverView: {
    height: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
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

  layoutDisplayButtonView: {
    backgroundColor: colors.bgColor,
    width: '12%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2.5,
    borderBottomColor: colors.borderColor,
  },
  layoutDisplayButton: {
    backgroundColor: colors.bgColor,
  },

  layoutUpperView: {
    flexDirection: 'row',
    backgroundColor: colors.borderColor,
  },
  searchBar: {
    backgroundColor: colors.bgColor,
    borderBottomWidth: 2.5,
    borderBottomColor: colors.borderColor,
    borderTopColor: colors.bgColor,
  },

  listLayoutItem: {
    flexDirection: 'row',
    height: 60,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  listLayoutItemTextView: {
    width: '87%',
  },
  listLayoutItemImageView: {
    width: '13%',
  },
  listLayoutItemText: {
    fontSize: 15,
  },
  listLayoutItemImage: {
    width: 40,
    height: 40,
    borderRadius: 30,
  },
});
