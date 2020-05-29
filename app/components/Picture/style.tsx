import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../themes';


export default StyleSheet.create({
  safeAreaView: {
    height: Dimensions.get('window').height,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: colors.bgColor,
  },

  video: {
    width: '100%',
    height: 350,
    marginBottom: -360,
  },

  touchableHighlight: {
    height: 0,
    marginTop: 20,
    backgroundColor: colors.bgColor,
  },

  scrollView: {
    backgroundColor: colors.bgColor,
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
  shimmer: {
    justifyContent: 'center',
    marginTop: 20,
  },
  innerShimmer: {
    height: 500,
    width: 500,
    backgroundColor: colors.shimmerColor,
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
    flexDirection: 'row',
  },
  viewDateIcon: {
    color: colors.highlightColor,
  },
  textDate: {
    marginLeft: 10, marginTop: 3, fontSize: 17,
  },

  viewSimilars: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: 35,
  },
  textSimilars: {
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 30,
  },
  scrollViewSimilars: {
    backgroundColor: colors.bgColor,
  },
  touchableHighlightSimilars: {
    marginRight: 5,
    width: 130,
  },
  imageSimilars: {
    height: 130,
    borderRadius: 7,
  },

  iconsView: {
    marginRight: '5%',
    marginLeft: '5%',
    marginTop: 0,
    flexDirection: 'row',
    height: 40,
  },
  iconsViewRowRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '92%',
  },
  iconsViewRowLeft: {
    width: '8%',
  },
  iconStyle: {
    color: colors.iconColor,
    marginRight: -3,
  },
  iconButtonStyle: {
    backgroundColor: colors.bgColor,
    height: '100%',
  },

  authorView: {
    flexDirection: 'row',
    marginTop: -23,
    marginBottom: 30,
  },
  authorIcon: {
    color: colors.highlightColor,
    marginTop: 2,
  },
  authorText: {
    marginLeft: 10,
  },
});
