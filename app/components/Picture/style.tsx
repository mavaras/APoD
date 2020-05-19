import { StyleSheet, Dimensions } from 'react-native';


export default StyleSheet.create({
  safeAreaView: {
    height: Dimensions.get('window').height,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },

  touchableHighlight: {
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 19,
  },
  modalMainView: {
    flex: 1,
    height: 140,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  modalContentView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    width: '80%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  modalFooterView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonGroupView: {
    paddingRight: 5,
    paddingLeft: 5,
    width: '35%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#5b84c2',
  },
  buttonLabel: {
    color: 'white',
  },

  scrollView: {
    backgroundColor: 'white',
    height: Dimensions.get('window').height + 400,
    marginTop: 370,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  viewPictureText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPictureExplanation: {
    fontSize: 15.7,
    width: '90%',
    alignItems: 'center',
    textAlign: 'justify',
  },
  textPictureTitle: {
    marginTop: 40,
    width: '90%',
    marginBottom: 30,
    fontSize: 22.5,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  viewPictureDate: {
    fontStyle: 'italic',
    marginTop: 40,
    marginBottom: 15,
    textAlign: 'right',
    marginRight: '17%',
  },

  image: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 0,
  },
  imageSmall: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginBottom: 0,
    borderRadius: 5,
  },

  dialogContent: {
    marginTop: 20,
  },

  viewDate: {
    justifyContent: 'center',
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    backgroundColor: '#dcdcdcb8',
    marginLeft: '5%',
    marginTop: 37,
    width: '90%',
    height: 70,
  },
  viewDate2: {
    flexDirection: 'row'
  },
  viewDateIcon: {
    color: 'black',
  },
  textDate: {
    marginLeft: 10, marginTop: 3, fontSize: 17,
  },

  viewSimilars: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 10,
  },
  textSimilars: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 30,
  },
  scrollViewSimilars: {
    backgroundColor: 'white',
  },
  touchableHighlightSimilars: {
    marginRight: 5,
    width: 130,
  },
});
