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
    height: 120,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  modalContentView: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 30
  },
  modalFooterView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalButtonGroupView: {
    paddingRight: 5,
    paddingLeft: 5,
    width: '40%'
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
    alignItems: 'center'
  },
  textPictureTitle: {
    marginTop: 40,
    width: '90%',
    marginBottom: 10,
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
    width: '90%',
    height: 300,
    marginTop: 20,
    borderRadius: 3.5
  },

  dialogContent: {
    marginTop: 20
  }
});