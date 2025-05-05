import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';     // Adjust size elements to screen size
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';                            // Adjust elemet screen resolution

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  splashLogo: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    marginBottom: verticalScale(32),
    backgroundColor: '#fff',
  },
  splashTitle: {
    fontSize: scale(28),
    fontFamily: 'Roboto_500Medium',
    color: Colors.lightCream,
    marginBottom: verticalScale(8),
  },
  splashSubtitle: {
    fontSize: scale(16),
    color: '#fff',
    marginBottom: verticalScale(40),
    fontFamily: 'Roboto_400Regular',
  },
  splashButton: {
    backgroundColor: '#fff',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(40),
    borderRadius: moderateScale(30),
  },
  splashButtonText: {
    color: Colors.deepBrown,
    fontSize: scale(16),
    fontFamily: 'Roboto_500Medium',
  },
  loginContainer: {
    margin: wp('5%'),
    backgroundColor: Colors.lightCream,
    borderRadius: moderateScale(30),
    padding: moderateScale(35),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  loginTitle: {
    fontSize: scale(26),
    fontFamily: 'Roboto_700Bold',
    marginBottom: verticalScale(20),
    color: Colors.deepBrown,
  },
  loginInputLabel: {
    fontSize: scale(14),
    marginBottom: verticalScale(6),
    marginTop: verticalScale(3),
    color: Colors.deepBrown,
    fontFamily: 'Roboto_500Medium',
  },
  loginInput: {
    height: verticalScale(48),
    borderColor: Colors.paleGrey,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    paddingHorizontal: scale(12),
    backgroundColor: '#fff',
    fontFamily: 'Roboto_400Regular',
  },
  loginButton: {
    backgroundColor: Colors.dustyPurple,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  loginButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontFamily: 'Roboto_700Bold',
  },
  loginLink: {
    color: Colors.skyBlue,
    textAlign: 'center',
    marginTop: verticalScale(10),
    fontFamily: 'Roboto_500Medium',
  },
  loginSubLink: {
    textAlign: 'right',
    color: Colors.skyBlue,
    marginBottom: verticalScale(16),
    fontSize: scale(12),
    fontFamily: 'Roboto_500Medium',
  },
  signupContainer: {
    margin: wp('3%'),
    backgroundColor: Colors.lightCream,
    borderRadius: moderateScale(25),
    padding: moderateScale(35),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  signUpInputLabel: {
    fontSize: scale(14),
    marginBottom: verticalScale(3),
    marginTop: verticalScale(2),
    color: Colors.deepBrown,
    fontFamily: 'Roboto_500Medium',
  },
  signupInput: {
    height: verticalScale(48),
    borderColor: Colors.paleGrey,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(5),
    paddingHorizontal: scale(12),
    backgroundColor: '#fff',
    fontFamily: 'Roboto_400Regular',
    
  },
  signupButton: {
    backgroundColor: Colors.dustyPurple,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(6),
    alignItems: 'center',
    marginBottom: verticalScale(12),
    marginTop: verticalScale(10),
  },
  signupButtonText: {
    color: '#fff',
    fontSize: scale(16),
    fontFamily: 'Roboto_700Bold',
  },
  signupLink: {
    color: Colors.skyBlue,
    textAlign: 'center',
    marginTop: verticalScale(12),
    fontFamily: 'Roboto_500Medium',
  },
  homeContainer: {
    margin: wp('5%'),
    padding: moderateScale(35),
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 5,
    justifyContent: 'center',
  },
  homeTitle: {
    fontSize: scale(16),
    fontFamily: 'Roboto_500Medium',
    color: Colors.deepBrown,
    marginBottom: verticalScale(10),
    marginTop: verticalScale(20),
  },
  homeSelectBox: {
    backgroundColor: Colors.dustyPurple,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  homeSelectText: {
    color: '#fff',
    fontFamily: 'Roboto_400Regular',
  },
  arrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  homeButton: {
    backgroundColor: '#fff',
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  homeButtonText: {
    color: Colors.deepBrown,
    fontFamily: 'Roboto_700Bold',
    fontSize: scale(16),
  },

  // two dropdown list in home screen
  dropdown: {
    backgroundColor: Colors.dustyPurple,
    borderWidth: 0,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  
  dropdownContainer: {
    backgroundColor: Colors.lightCream,
    borderWidth: 0,
    elevation: 3,
    zIndex: 1000,
  },
  
  dropdownText: {
    fontSize: 14,
    color: Colors.deepBrown,
    fontFamily: 'Roboto_400Regular',
  }, 
  
  dropdownTitle:{
    color: '#fff',
  },

  // Attractionlist screen
  attractionContainer: {
    flex: 1,
    backgroundColor: '#f8f1f1',
    padding: moderateScale(20),
    borderTopLeftRadius: 60,
    borderBottomRightRadius: 60,
  },

  attractionTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: '#3b2e2e',
    marginBottom: verticalScale(6),
  },

  attractionSubtitle: {
    fontSize: scale(14),
    color: '#3b2e2e',
    marginBottom: verticalScale(20),
  },

  attractionListContainer: {
    paddingBottom: verticalScale(20),
  },

  attractionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  attractionInfo: {
    flex: 1,
  },

  attractionName: {
    fontSize: scale(15),
    fontWeight: '600',
    color: '#3b2e2e',
  },

  attractionDetails: {
    fontSize: scale(12),
    color: '#777',
    marginTop: verticalScale(2),
  },

  attractionRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(12),
  },

  attractionRatingText: {
    fontSize: scale(14),
    marginRight: scale(4),
    color: '#333',
  },

  attractionCheckbox: {
    height: moderateScale(20),
    width: moderateScale(20),
    borderRadius: 4,
  },

  attractionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },

  attractionCreateButton: {
    backgroundColor: '#6e4b63',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(25),
    borderRadius: moderateScale(12),
    flex: 1,
    marginRight: scale(10),
    alignItems: 'center',
  },

  attractionCancelButton: {
    borderWidth: 1,
    borderColor: '#6e4b63',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(25),
    borderRadius: moderateScale(12),
    flex: 1,
    marginLeft: scale(10),
    alignItems: 'center',
  },

  attractionButtonText: {
    color: '#fff',
    fontWeight: '600',
  },

  attractionCancelText: {
    color: '#6e4b63',
    fontWeight: '600',
  },
  
});

export default styles;
