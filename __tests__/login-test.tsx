import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '@/app/login';
import { router } from 'expo-router';
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Mock the router
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

describe('<Login />', () => {
    test('renders correctly', () => {
        render(<Login />);
    });

    //test for correct credentials(email and password)
    test('login with correct credentials', async () => {
        const pushMock = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

        // Mock Firebase getAuth to return a dummy object
        (getAuth as jest.Mock).mockReturnValue({});

        // Mock Firebase signInWithEmailAndPassword to resolve
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: {} });

        render(<Login />);
        const emailInput = screen.getByPlaceholderText('Enter email');
        const passwordInput = screen.getByPlaceholderText('Enter password');
        fireEvent.changeText(emailInput, 'test@rest.com');
        fireEvent.changeText(passwordInput, '12345678');
        fireEvent.press(screen.getByTestId('login-button'));

        await waitFor(() => {
            expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), 'test@rest.com', '12345678');
            expect(pushMock).toHaveBeenCalledWith('/home');
        });
    });
});