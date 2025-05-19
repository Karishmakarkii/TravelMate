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
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
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
    height: verticalScale(40),
    borderColor: Colors.paleGrey,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(4),
    paddingHorizontal: scale(10),
    backgroundColor: '#fff',
    fontFamily: 'Roboto_400Regular',
  },

  errorText: {
    fontFamily: 'Roboto_700Bold',
    color: 'red',
    marginBottom: verticalScale(4),
    minHeight: verticalScale(14),
  },

  loginButton: {
    backgroundColor: Colors.dustyPurple,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
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

  resetButton: {
    backgroundColor: Colors.dustyPurple,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginBottom: verticalScale(12),
    marginTop: verticalScale(12),
  },

  resetButtonText: {
    color: '#fff',
    fontFamily: 'Roboto_700Bold',
    fontSize: scale(16),

  },

  signupContainer: {
    marginHorizontal: wp('5%'),
    marginTop: verticalScale(30),
    backgroundColor: Colors.lightCreamTransparent,
    borderRadius: moderateScale(16),
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    maxHeight: '90%',
  },

  signUpInputLabel: {
    fontSize: scale(13),
    marginBottom: verticalScale(4),
    marginTop: verticalScale(10),
    color: Colors.deepBrown,
    fontFamily: 'Roboto_500Medium',
  },

  signupInput: {
    height: verticalScale(40),
    borderColor: Colors.paleGrey,
    borderWidth: 1,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(4),
    paddingHorizontal: scale(10),
    backgroundColor: '#fff',
    fontFamily: 'Roboto_400Regular',
    fontSize: scale(13),
  },

  signupButton: {
    backgroundColor: Colors.dustyPurple,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: verticalScale(20),
  },

  signupButtonText: {
    color: '#fff',
    fontSize: scale(15),
    fontFamily: 'Roboto_700Bold',
  },

  signupLink: {
    color: Colors.darkskyBlue,
    textAlign: 'center',
    marginTop: verticalScale(12),
    fontFamily: 'Roboto_500Medium',
    fontSize: scale(13),
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
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
    borderColor: Colors.deepBrown,
    backgroundColor: Colors.lightCream,
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
    borderRadius: 12,
    borderColor: Colors.deepBrown,
    backgroundColor: Colors.dustyPurple,
    height: 48,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  dropdownContainer: {
    borderRadius: 12,
    borderColor: Colors.deepBrown,
    backgroundColor: Colors.lightCream,
    elevation: 4,
  },

  placeholderStyle: {
    color: Colors.lightCream,
    fontFamily: 'Roboto_600SemiBold',
  },

  dropdownText: {
    fontSize: 14,
    color: Colors.deepBrown,
    fontFamily: 'Roboto_400Regular',
  },



  dropdownTitle: {
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
  disabledButton: {
    backgroundColor: Colors.paleGrey,
    opacity: 0.6,
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
    marginTop: verticalScale(20),
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
  saveText: {
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
  noResultContainer: {
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

  // setting modal
  settingContainer: {
    padding: 20,
    backgroundColor: Colors.lightCream,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: '85%',
    minHeight: '60%',
    maxWidth: '100%',
  },
  settingBottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  settingScrollContainer: {
    paddingBottom: 40,
  },
  settingProfileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingProfileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.dustyPurple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  settingProfileInitial: {
    color: '#fff',
    fontWeight: '700',
  },
  settingProfileEmail: {
    fontWeight: '600',
    color: Colors.deepBrown,
  },
  settingEditProfileText: {
    color: Colors.skyBlue,
    fontSize: 12,
    marginTop: 2,
  },
  settingSectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: '600',
    color: Colors.mauveBrown,
  },
  settingPreferenceLabel: {
    fontSize: 14,
    color: Colors.deepBrown,
    marginBottom: 5,
  },
  settingToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },

  settingLinkText: {
    color: Colors.dustyPurple,
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginBottom: 10,
  },
  settingDropdown: {
    marginBottom: 10,
    zIndex: 3000,
    elevation: 3,
  },
  settingDropdownContainer: {
    borderColor: Colors.deepBrown,
    zIndex: 2000,
    elevation: 2,
  },


  // Profile modal

  profileModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  profileContainer: {
    backgroundColor: Colors.lightCream,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '65.5%',
  },
  profileBackButton: {
    marginBottom: 10,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.dustyPurple,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileAvatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
  },
  profileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.deepBrown,
  },
  profileInputGroup: {
    marginBottom: 12,
  },
  profileLabel: {
    fontWeight: '600',
    marginBottom: 5,
    color: Colors.deepBrown,
  },
  profileInput: {
    borderWidth: 1,
    borderColor: Colors.paleGrey,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  profileActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
    marginTop: 20,
  },
  profileActionBtn: {
    color: Colors.dustyPurple,
    textAlign: 'center',
    marginTop: 24,
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 15,
  },

  // premium modal 
  premiumContainer: {
    flex: 1,
    backgroundColor: Colors.paleGrey,
    margin: 20,
    marginTop: 60,
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center', // ← Center content vertically
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  premiumBackBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
  },

  premiumTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.deepBrown,
    marginBottom: 16,
  },

  premiumIconCircle: {
    backgroundColor: Colors.dustyPurple,
    padding: 16,
    borderRadius: 50,
    marginBottom: 16,
  },

  premiumDescription: {
    fontSize: 16,
    color: Colors.deepBrown,
    textAlign: 'center',
    marginBottom: 24,
  },

  premiumBenefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  premiumBenefitIcon: {
    marginRight: 10,
  },

  premiumBenefitText: {
    fontSize: 15,
    color: Colors.deepBrown,
  },

  premiumUpgradeBtnText: {
    fontSize: 14,
    color: Colors.deepBrown,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: '600',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: Colors.deepBrown,
    backgroundColor: Colors.lightCream,
  },

  premiumPrice: {
    fontSize: 16,
    color: '#6E4C42',
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },

  premiumCancelNote: {
    fontSize: 12,
    color: '#8A7F7B',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  premiumUnlockBtn: {
    borderColor: Colors.deepBrown,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },

  premiumUnlockBtnText: {
    fontSize: 14,
    color: Colors.deepBrown,
    fontWeight: '600',
  },
});




export default styles;