import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ItineraryScreen from '../app/itinerary';
import * as Location from 'expo-location';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ReactNative from 'react-native';

jest.mock('expo-location');
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(),
  usePathname: jest.fn(() => '/'),
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

jest.mock('../styles/authStyles', () => ({}));
jest.mock('@/components/mainLayout', () => ({ children }: any) => <>{children}</>);
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: any) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock Firebase
jest.mock('firebase/app', () => ({ initializeApp: jest.fn() }));
jest.mock('firebase/auth', () => ({ getAuth: jest.fn() }));
jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  addDoc: jest.fn(),
  doc: jest.fn(),
  collection: jest.fn(),
  getDoc: jest.fn(() => ({ exists: () => true, data: () => ({ account_type: 'premium' }) })),
  getDocs: jest.fn(() => ({ size: 0 })),
}));

// Mock image assets
jest.mock('../assets/images/PagesImage.jpeg', () => 'mock-image');
jest.mock('../assets/images/touristimage2.png', () => 'mock-image');
jest.mock('../assets/images/mapBackground.webp', () => 'mock-image');
jest.mock('../assets/images/mapicon2.png', () => 'mock-image');

// Mock Linking.openURL and Image
beforeAll(() => {
  jest.spyOn(ReactNative.Linking, 'openURL').mockImplementation(jest.fn());
  jest.spyOn(ReactNative, 'Image', 'get').mockReturnValue((props: any) => <img {...props} />);
});

global.fetch = jest.fn();

const mockRouter = { back: jest.fn(), push: jest.fn() };

const mockAttractions = [
  {
    id: '1',
    name: 'Museum',
    distance: '1.0 km',
    time: '10 mins',
    rating: 4.7,
    vicinity: '123 Main St',
    geometry: { location: { lat: 1, lng: 2 } },
  },
  {
    id: '2',
    name: 'Park',
    distance: '2.0 km',
    time: '20 mins',
    rating: 4.2,
    vicinity: '456 Park Ave',
    geometry: { location: { lat: 1.1, lng: 2.1 } },
  },
];

describe('ItineraryScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useLocalSearchParams as jest.Mock).mockReturnValue({
      attractions: JSON.stringify(mockAttractions),
      transportMode: 'walk',
    });
    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      { city: 'Test City' },
    ]);
  });

  it('renders trip summary and stops', async () => {
    const { getByText, findByText } = render(<ItineraryScreen />);
    // Wait for the trip summary to appear
    expect(await findByText('Trip Summary')).toBeTruthy();
    expect(getByText('Stops:')).toBeTruthy();
    expect(getByText('Distance:')).toBeTruthy();
    expect(getByText('Time:')).toBeTruthy();
    expect(getByText('Mode:')).toBeTruthy();
    // Check that stops are rendered
    expect(await findByText('Stop 1: Museum')).toBeTruthy();
    expect(getByText('Stop 2: Park')).toBeTruthy();
  });
}); 