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
    backgroundColor: Colors.lightCreamTransparent,
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
  errorText: {
    fontFamily: 'Roboto_700Bold',
    color: 'red'
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
    color: Colors.darkskyBlue,
    textAlign: 'center',
    marginTop: verticalScale(10),
    fontFamily: 'Roboto_500Medium',
  },
  loginSubLink: {
    textAlign: 'right',
    color: Colors.darkskyBlue,
    marginBottom: verticalScale(16),
    fontSize: scale(12),
    fontFamily: 'Roboto_500Medium',
  },
  signupContainer: {
    margin: wp('3%'),
    backgroundColor: Colors.lightCreamTransparent,
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
    maxHeight: '85%',
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
    color: Colors.darkskyBlue,
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
    backgroundColor: Colors.lightCream,
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
    margin: 15,
    padding: 20,
    backgroundColor: Colors.lightCreamTransparent,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: '90%', //prevent it from stretching to full screen
    maxWidth: '100%',
  },
  

  attractionTitle: {
    fontSize: scale(20),
    fontWeight: '700',
    color: '#3b2e2e',
    marginBottom: verticalScale(10),
    marginTop: scale(8),
  },

  attractionSubtitle: {
    fontSize: scale(12),
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
    justifyContent: 'flex-end',
    marginTop: verticalScale(20),
  },

  createItineraryButtonText: {
    color: Colors.deepBrown,
    fontWeight: '600',
    marginRight: scale(20)

  },
  createItineraryButton: {
    backgroundColor: Colors.lightCream,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: verticalScale(15),
    width: wp('50%'),
  },
  

  attractionCancelText: {
    color: Colors.deepBrown,
    fontWeight: '600',
    marginRight: scale(20),
    marginBottom: scale(10),
    textAlign: 'center',
  },

  //itinerary screen
  itineraryContainer: {
    margin: 5,
    padding: 10,
    backgroundColor: 'transparent',
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    elevation: 3,
    maxHeight: '80%', //prevent it from stretching to full screen
  },
  itineraryInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
    marginTop:verticalScale(20),
    backgroundColor: Colors.lightCreamTransparent,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  itinerarySaveButton: {
    backgroundColor: Colors.lightCream,
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    marginBottom: verticalScale(15),
    width: wp('50%'),
    
  },
  saveText:{
    color: Colors.deepBrown,
    fontWeight: '500',
  },

  itineraryInfoText: {
    fontSize: scale(13),
    color: '#3b2e2e',
    fontWeight: '500',
    marginBottom: verticalScale(2),
  },
  
  itineraryMapButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  itineraryMapText: {
    fontSize: scale(12),
    color: '#6e4b63',
    fontWeight: '600',
    marginTop: 2,
  },
  scrollWrapper: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 100, // Leave space above Footer
  },
  
  dialogOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.deepBrown,
  },
  dialogMessage: {
    fontSize: 14,
    color: Colors.deepBrown,
    textAlign: 'center',
    marginBottom: 20,
  },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    margin: 10,
  },
  dialogLink: {
    color: Colors.Lavender,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  
  //saved trips
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  tripTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3C2D30',
  },
  
  tripMeta: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  
  tripActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  
  tripLink: {
    color: '#6e4b63',
    fontWeight: '600',
    fontSize: 13,
  },
  // No result screen
  noResultContainer:{
    margin: 15,
    padding: 20,
    backgroundColor: Colors.lightCreamTransparent,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: '60%', //prevent it from stretching to full screen
    maxWidth: '90%',
  },

  //setting screen
  settingContainer:{
    margin: 15,
    marginTop: 15,
    marginBottom: 0,
    padding: 20,
    backgroundColor: Colors.lightCream,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: '60%', //prevent it from stretching to full screen
    maxWidth: '90%',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dustyPurple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileInitial: {
    color: '#fff',
    fontWeight: '700',
  },
  profileEmail: {
    fontWeight: '600',
    color: Colors.deepBrown,
  },
  editProfileText: {
    color: Colors.skyBlue,
    fontSize: 12,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
    color: Colors.mauveBrown,
  },
  preferenceLabel: {
    fontSize: 14,
    color: Colors.deepBrown,
    marginBottom: 5,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  linkText: {
    color: Colors.dustyPurple,
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginBottom: 10,
  }
  

  
});

export default styles;
