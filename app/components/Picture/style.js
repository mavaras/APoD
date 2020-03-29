import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  touchableHighlight: {
    alignItems: 'center'
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 19
  },
  modalMainView: {
    flex: 1,
    height: 140,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
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
    marginTop: 10
  },
  modalFooterView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalButtonGroupView: {
    paddingRight: 5,
    paddingLeft: 5,
    width: '35%',
    marginBottom: 15
  },
  button: {
    backgroundColor: '#5b84c2'
  },
  buttonLabel: {
    color: 'white'
  },

  viewPictureText: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textPictureExplanation: {
    fontSize: 14.5,
    width: '90%',
    alignItems: 'center',
    textAlign: 'justify'
  },
  textPictureTitle: {
    marginTop: 40,
    width: '90%',
    marginBottom: 30,
    fontSize: 19.5,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  viewPictureDate: {
    fontStyle: 'italic',
    marginTop: 40,
    marginBottom: 15,
    textAlign: 'right',
    marginRight: '17%'
  },

  image: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 0
  },
  imageSmall: {
    width: '100%',
    height: 200,
    marginBottom: 0,
    borderRadius: 5
  },

  dialogContent: {
    marginTop: 20
  }
});