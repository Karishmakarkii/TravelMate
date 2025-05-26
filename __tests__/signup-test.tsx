import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignUpScreen from '@/app/signup';
import { useRouter } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Mock the router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

global.alert = jest.fn();
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

describe('<SignUpScreen />', () => {
  test('renders correctly', () => {
    render(<SignUpScreen />);
  });

  test('signup with correct credentials', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock, back: jest.fn() });
    (getAuth as jest.Mock).mockReturnValue({});
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: {} });

    render(<SignUpScreen />);
    const nameInput = screen.getByPlaceholderText('Enter name');
    const emailInput = screen.getByPlaceholderText('Enter email');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const confirmPasswordInput = screen.getByPlaceholderText('Re enter password');

    fireEvent.changeText(nameInput, 'Test User');
    fireEvent.changeText(emailInput, 'test@rest.com');
    fireEvent.changeText(passwordInput, '12345678');
    fireEvent.changeText(confirmPasswordInput, '12345678');

    // Find the Sign Up button by its testID
    const signUpButton = screen.getByTestId('signup-button');
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@rest.com', '12345678');
      expect(pushMock).toHaveBeenCalledWith('/home');
    });
  });
});
