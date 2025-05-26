import { Platform, StyleSheet } from 'react-native';
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

  topInfoCard: {
    backgroundColor: Colors.lightCreamTransparent,
    backdropFilter: 'blur(6px)',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 35,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  topInfoTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: Colors.dustyPurple,
  marginBottom: 4,
},

topInfoSubtitle: {
  fontSize: 14,
  color: Colors.deepBrown,
  textAlign: 'center',
},

  icon: {
  fontSize: 18, // adjust based on visual balance
  marginHorizontal: 4,
},
  attractionHeader: {
  padding: 20,
  backgroundColor: Colors.lightCreamTransparent,
  borderRadius: 12,
  margin: 16,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
  attractionTitle: {
  fontSize: 20,
  fontWeight: '600',
  color: '#333',
},
  attractionSubtitle: {
  fontSize: 14,
  color: '#555',
  marginTop: 6,
  lineHeight: 20,
},

  centeredContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
},

  attractionListContainer: {
  paddingHorizontal: 16,
  paddingBottom: 100,
},

  attractionInfo: {
  flex: 1,
  marginRight: 10,
},

  attractionCheckbox: {
  height: 20,
  width: 20,
},
  footerButtons: {
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: 'rgba(255,255,255,0.9)',
  flexDirection: 'column',
  alignItems: 'center',
  borderTopWidth: 0.5,
  borderColor: '#ccc',
},
  attractionCancelText: {
  color: '#6e4b63',
  fontSize: 14,
  marginBottom: 10,
},
  createItineraryButton: {
  backgroundColor: '#6e4b63',
  paddingVertical: 14,
  paddingHorizontal: 30,
  borderRadius: 8,
  alignItems: 'center',
  width: '100%',
},
  createItineraryButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
  disabledButton: {
  backgroundColor: '#ccc',
},
  attractionCard: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},

  cardTop: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 12,
},

  attractionName: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 4,
},

  attractionDetails: {
  fontSize: 13,
  color: '#666',
  marginBottom: 2,
},

  attractionVicinity: {
  fontSize: 13,
  color: '#333',
},

  ratingBox: {
  alignItems: 'flex-end',
  minWidth: 50,
},

  attractionRatingText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#333',
  marginBottom: 2,
},

  checkboxRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
},

  checkboxLabel: {
  fontSize: 13,
  marginLeft: 10,
  color: '#555',
},


  // Shadow (iOS + Android)
shadowStyle: {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 6,
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

  // model dialog box
  dialogOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  paddingHorizontal: 20,
},

  dialogBox: {
  backgroundColor: 'rgba(255,255,255,0.95)',
  width: '100%',
  borderRadius: 20,
  paddingVertical: 28,
  paddingHorizontal: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 6,
},

  dialogTitle: {
  fontSize: 22,
  fontWeight: '700',
  textAlign: 'center',
  color: '#1c1c1e',
  marginBottom: 12,
},

  dialogMessage: {
  fontSize: 15,
  textAlign: 'center',
  color: '#444',
  lineHeight: 22,
  marginBottom: 24,
},

  dialogButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 12,
},

  dialogButton: {
  flex: 1,
  backgroundColor: '#f1f1f1',
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
},

  dialogButtonText: {
  fontSize: 15,
  fontWeight: '600',
  color: '#4b4453',
},

  dialogButtonPrimary: {
  flex: 1,
  backgroundColor: '#6e4b63',
  paddingVertical: 12,
  borderRadius: 10,
  alignItems: 'center',
},

  dialogButtonTextPrimary: {
  fontSize: 15,
  fontWeight: '600',
  color: '#fff',
},

tripSummaryCard: {
  backgroundColor: Colors.whiteTransparent,
  marginHorizontal: 20,
  padding: 20,
  borderRadius: 18,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: Platform.OS === 'android' ? 0.05 : 0.08,
  shadowRadius: 4,
  elevation: Platform.OS === 'android' ? 1 : 2, // lighter
  alignItems: 'center',
  marginBottom: 20,
  marginTop: 20,
  alignSelf: 'center', // ✅ Added
},

  tripSummaryImage: {
  width: '100%',
  height: 200,
  aspectRatio: 1, // maintains image proportions
  resizeMode: 'cover',
  marginBottom: 0,
  padding: 0,
},

  tripSummaryTitle: {
  fontSize: 20,
  fontWeight: '600',
  color: Colors.deepBrown,
  marginTop: 0,
},

  divider: {
  height: 1,
  backgroundColor: '#e0e0e0',
  marginVertical: 12,
  width: '100%',
},

  tripSummaryItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  marginVertical: 4,
},

  label: {
  fontSize: 16,
  color: '#666',
  fontWeight: '400',
},

  value: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1c1c1e',
},

  itinerarytripCard: {
  backgroundColor: 'white',
  borderRadius: 16,
  padding: 16,
  marginBottom: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
},

  tripCardTop: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 6,
},

  tripCardTitle: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1c1c1e',
  flex: 1,
  paddingRight: 12,
},

  tripCardRating: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 4,
},

  tripCardRatingText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#444',
},

  tripCardMeta: {
  fontSize: 13,
  color: '#666',
  marginTop: 4,
},

  tripCardAddress: {
  fontSize: 14,
  fontWeight: '500',
  color: '#2e2e2e',
  marginTop: 4,
},


  //saved trips
  savedTripCard: {
  backgroundColor: 'rgba(255,255,255,0.92)',
  padding: 18,
  borderRadius: 18,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 4,
},

  savedTripHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},

  savedTripTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: '#1c1c1e',
  flexShrink: 1,
},

  savedTripDate: {
  fontSize: 13,
  fontWeight: '500',
  color: '#6e4b63',
},

  savedTripInfo: {
  marginBottom: 14,
},

  savedTripText: {
  fontSize: 14,
  color: '#444',
  marginBottom: 4,
},

  savedTripAction: {
  fontSize: 14,
  fontWeight: '600',
  color: '#6e4b63',
},

  savedTripActions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 12,
},

  actionButton: {
  flex: 1,
  marginHorizontal: 4,
  paddingVertical: 10,
  backgroundColor: '#eee',
  borderRadius: 8,
  alignItems: 'center',
},

  actionText: {
  color: '#333',
  fontWeight: '600',
},

  deleteButton: {
  backgroundColor: '#f2f2f2',
},

  deleteText: {
  color: '#a00',
  fontWeight: '600',
},

  buttonHover: {
  backgroundColor: '#d0d0d0',
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

  FlatListContainer: {
  backgroundColor: Colors.lightCreamTransparent,
},

// Map card
mapCardContainer: {
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 16,
  overflow: 'hidden',
  elevation: Platform.OS === 'android' ? 2 : 4,  // reduce on Android
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: Platform.OS === 'android' ? 0.05 : 0.1,  // lighter shadow on Android
  shadowRadius: 4,
  marginBottom: 20,
  alignSelf: 'center', // ✅ Fixes off-center container on Android
},


  mapCardImageWrapper: {
  position: 'relative',
  width: '100%',
  height: 180,
},

  mapCardImage: {
  width: '100%',
  height: '100%',
},

  mapPin: {
  position: 'absolute',
  top: 60,
  left: '50%',
  marginLeft: -12,
  width: 24,
  height: 24,
},

  mapLabel: {
  position: 'absolute',
  top: 90,
  left: '50%',
  transform: [{ translateX: -50 }],
  backgroundColor: '#fff',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 12,
  elevation: 2,
},

  mapLabelText: {
  fontSize: 12,
  color: '#333',
  textAlign: 'center',
},

  mapCardButton: {
  backgroundColor: '#6e4b63',
  paddingVertical: 12,
  alignItems: 'center',
},

  mapCardButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},


});






export default styles;