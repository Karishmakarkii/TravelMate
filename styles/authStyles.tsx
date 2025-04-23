import { StyleSheet } from 'react-native';
import { Colors } from './colors';

const styles = StyleSheet.create({
  //Splash Screen Styles
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  splashLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 32,
    backgroundColor: '#fff',
  },
  splashTitle: {
    fontSize: 28,
    fontFamily: 'Roboto_500Medium',
    color: Colors.lightCream,
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    fontFamily: 'Roboto_400Regular',
  },
  splashButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  splashButtonText: {
    color: Colors.deepBrown,
    fontSize: 16,
    fontFamily: 'Roboto_500Medium',
  },

  // Login Screen Styles
  loginContainer: {
    margin: 20,
    backgroundColor: Colors.lightCream,
    borderRadius: 30,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,

    // border styles
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  loginTitle: {
    fontSize: 26,
    fontFamily: 'Roboto_700Bold',
    marginBottom: 20,
    color: Colors.deepBrown,
  },
  loginInput: {
    height: 48,
    borderColor: Colors.paleGrey,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontFamily: 'Roboto_400Regular',
  },
  loginButton: {
    backgroundColor: Colors.dustyPurple,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
  },
  loginLink: {
    color: Colors.skyBlue,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Roboto_500Medium',
  },
  loginSubLink: {
    textAlign: 'right',
    color: Colors.skyBlue,
    marginBottom: 16,
    fontSize: 12,
    fontFamily: 'Roboto_500Medium',
  },

  // Sign-Up Screen Styles
  signupContainer: {
    margin: 20,
    backgroundColor: Colors.lightCream,
    borderRadius: 30,
    padding: 35,

    // border styles
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  signupInput: {
    height: 48,
    borderColor: Colors.paleGrey,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontFamily: 'Roboto_400Regular',
  },
  signupButton: {
    backgroundColor: Colors.dustyPurple,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto_700Bold',
  },
  signupLink: {
    color: Colors.skyBlue,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Roboto_500Medium',
  },
});

export default styles;
