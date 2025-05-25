import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AttractionListScreen from '../app/attractionList';
import * as Location from 'expo-location';
import { useRouter, useLocalSearchParams } from 'expo-router';

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

// Mock expo-checkbox
jest.mock('expo-checkbox', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ value, onValueChange, color, ...props }: any) => {
      const { TouchableOpacity, View } = require('react-native');
      return (
        <TouchableOpacity
          onPress={() => onValueChange && onValueChange(!value)}
          testID="checkbox"
          {...props}
        >
          <View style={{ width: 20, height: 20, backgroundColor: value ? (color || '#000') : '#fff', borderWidth: 1 }} />
        </TouchableOpacity>
      );
    },
  };
});

global.fetch = jest.fn();

const mockRouter = { back: jest.fn(), push: jest.fn() };

const mockAttractionsApiResponse = {
  status: 'OK',
  results: [
    {
      place_id: '1',
      name: 'Museum',
      rating: 4.7,
      vicinity: '123 Main St',
      geometry: { location: { lat: 1, lng: 2 } },
    },
    {
      place_id: '2',
      name: 'Park',
      rating: 4.2,
      vicinity: '456 Park Ave',
      geometry: { location: { lat: 1.1, lng: 2.1 } },
    },
  ],
};

const mockDistanceMatrixResponse = {
  status: 'OK',
  rows: [
    {
      elements: [
        { status: 'OK', distance: { value: 1000 } },
        { status: 'OK', distance: { value: 2000 } },
      ],
    },
  ],
};

describe('AttractionListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useLocalSearchParams as jest.Mock).mockReturnValue({ radius: '5', transportMode: 'walk' });
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 1, longitude: 2 },
    });
    (Location.reverseGeocodeAsync as jest.Mock).mockResolvedValue([
      { city: 'Test City' },
    ]);
  });

  it('shows loading state initially', async () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {})); // never resolves
    const { getByText } = render(<AttractionListScreen />);
    expect(getByText('Loading nearby attractions...')).toBeTruthy();
  });

  it('shows error if location permission denied', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'denied' });
    const { getByText, findByText } = render(<AttractionListScreen />);
    expect(await findByText('Error')).toBeTruthy();
    expect(await findByText('Permission to access location was denied')).toBeTruthy();
  });

  it('renders attractions and allows selection', async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({ json: async () => mockAttractionsApiResponse })
      .mockResolvedValueOnce({ json: async () => mockDistanceMatrixResponse });

    const { getByText, findByText, getAllByTestId } = render(<AttractionListScreen />);

    // Wait for attractions to load
    expect(await findByText('Museum')).toBeTruthy();
    expect(getByText('Park')).toBeTruthy();

    // Select the first attraction by clicking the checkbox
    const checkboxes = getAllByTestId('checkbox');
    fireEvent.press(checkboxes[0]);
    
    // Wait for the text to update
    expect(await findByText('Added to Itinerary')).toBeTruthy();

    // Create Itinerary button should be enabled
    const createBtn = getByText(/Create Itinerary/);
    expect(createBtn.props.style).not.toContainEqual(expect.objectContaining({ opacity: 0.5 }));
  });
});
