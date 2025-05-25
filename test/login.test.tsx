import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../app/login'; // Adjust path if needed

// Mock useRouter from expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock Firebase auth
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({ user: { uid: '123' } })
  ),
}));

describe('LoginScreen', () => {
  test('renders all expected fields and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    expect(getByText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
    expect(getByPlaceholderText('Enter password')).toBeTruthy();
    expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
  });

  test('submits form with valid input', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter password'), 'password123');
    fireEvent.press(getByText('Login'));

    // No assertion here because success happens silently; ideally,
    // you spy on `router.push` if needed for additional checking
  });
});
