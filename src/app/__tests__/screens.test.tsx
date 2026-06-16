import { render } from '@testing-library/react-native';
import AboutScreen from '../about';
import HomeScreen from '../(tabs)/index';
import SettingsScreen from '../(tabs)/settings';
import SignInScreen from '../(auth)/sign-in';
import SignUpScreen from '../(auth)/sign-up';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
  useRouter: () => ({ navigate: jest.fn(), back: jest.fn(), replace: jest.fn() }),
  useSegments: () => [],
}));

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: {
      name: 'Foundation',
      version: '1.0.0',
    },
  },
}));

jest.mock('@clerk/expo', () => ({
  useSignIn: () => ({
    signIn: {
      create: jest.fn(),
    },
    setActive: jest.fn(),
    isLoaded: true,
  }),
  useSignUp: () => ({
    signUp: {
      create: jest.fn(),
      prepareEmailAddressVerification: jest.fn(),
      attemptEmailAddressVerification: jest.fn(),
    },
    setActive: jest.fn(),
    isLoaded: true,
  }),
  useSSO: () => ({
    startSSOFlow: jest.fn(),
  }),
  useAuth: () => ({
    isLoaded: true,
    isSignedIn: false,
  }),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => children,
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
    const { getAllByText } = render(<SignInScreen />);
    expect(getAllByText('Sign In').length).toBeGreaterThan(0);
  });

  it('renders SignInScreen with Google button', () => {
    const { getByText } = render(<SignInScreen />);
    expect(getByText('Continue with Google')).toBeTruthy();
  });

  it('renders SignUpScreen', () => {
    const { getAllByText } = render(<SignUpScreen />);
    expect(getAllByText('Create Account').length).toBeGreaterThan(0);
  });

  it('renders SignUpScreen with Google button', () => {
    const { getByText } = render(<SignUpScreen />);
    expect(getByText('Continue with Google')).toBeTruthy();
  });

  it('renders AboutScreen with app name and version', () => {
    const { getByText } = render(<AboutScreen />);
    expect(getByText('Foundation')).toBeTruthy();
    expect(getByText('Version 1.0.0')).toBeTruthy();
  });
});
