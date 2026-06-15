import { render } from '@testing-library/react-native';
import HomeScreen from '../(tabs)/index';
import SettingsScreen from '../(tabs)/settings';
import SignInScreen from '../(auth)/sign-in';
import SignUpScreen from '../(auth)/sign-up';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
  useRouter: () => ({ navigate: jest.fn(), back: jest.fn(), replace: jest.fn() }),
  useSegments: () => [],
}));

describe('base screens render without errors', () => {
  it('renders HomeScreen', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Home')).toBeTruthy();
  });

  it('renders SettingsScreen', () => {
    const { getByText } = render(<SettingsScreen />);
    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders SignInScreen', () => {
    const { getByText } = render(<SignInScreen />);
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('renders SignUpScreen', () => {
    const { getByText } = render(<SignUpScreen />);
    expect(getByText('Create Account')).toBeTruthy();
  });
});
