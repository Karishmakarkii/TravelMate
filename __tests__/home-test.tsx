import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import HomeScreen from '@/app/home';
import { useRouter } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// Mock the router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/'),
}));

// Mock Firebase auth and firestore
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

jest.mock('react-native-safe-area-context', () => {
  return {
    SafeAreaView: ({ children }) => children,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

// jest.mock('react-native/Libraries/Components/StaticRenderer/StaticRenderer');
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('<HomeScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, cb) => {
      cb(null); // No user
      return jest.fn();
    });
    render(<HomeScreen />);
    expect(screen.getByText('Set search radius')).toBeTruthy();
    expect(screen.getByText('Select transport mode')).toBeTruthy();
    expect(screen.getByText('Find Places')).toBeTruthy();
  });

  // test for selecting radius and transport mode and then pressing find places, and then checking if the attraction list screen is rendered
  test('renders attraction list screen', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<HomeScreen />);
    //select one of the radius from dropdown 
    const radiusButton = screen.getByText('Set search radius');
    fireEvent.press(radiusButton);
    //select transport mode from dropdown
    const transportModeButton = screen.getByText('Select transport mode');
    fireEvent.press(transportModeButton);
    //press find places
    const findPlacesButton = screen.getByText('Find Places');
    fireEvent.press(findPlacesButton);
    expect(pushMock).toHaveBeenCalledWith({
      pathname: '/attractionList',
      params: expect.any(Object),
    });
  });
}); 