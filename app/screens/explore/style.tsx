import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  flatList: {
    marginTop: 6,
    marginBottom: 0,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: 'white',
  },

  layoutPopoverView: {
    height: 150,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  layoutButton: {
    backgroundColor: 'white',
  },
  layoutButtonIcon: {
    color: 'gray',
    marginLeft: 10,
  },

  layoutDisplayButtonView: {
    backgroundColor: 'white',
    width: '12%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2.5,
    borderBottomColor: '#f2f2ff',
  },
  layoutDisplayButton: {
    backgroundColor: 'white',
  },

  layoutUpperView: {
    flexDirection: 'row',
    backgroundColor: '#f2f2ff',
  },
  searchBar: {
    backgroundColor: 'white',
    borderBottomWidth: 2.5,
    borderBottomColor: '#f2f2ff',
    borderTopColor: 'white',
  },

  listLayoutItem: {
    flexDirection: 'row',
    height: 60,
    borderBottomColor: '#f2f2ff',
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
