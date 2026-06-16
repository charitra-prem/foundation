import { render } from '@testing-library/react-native';
import RootLayout from '../_layout';

const mockScreen = jest.fn();

jest.mock('posthog-react-native', () => ({
  PostHogProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  usePostHog: () => ({ screen: mockScreen }),
}));

jest.mock('expo-router', () => ({
  Stack: Object.assign(
    ({ children }: { children: React.ReactNode }) => <>{children}</>,
    { Screen: () => null }
  ),
  usePathname: () => '/home',
  useGlobalSearchParams: () => ({}),
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

describe('PostHog analytics', () => {
  beforeEach(() => {
    mockScreen.mockClear();
  });

  it('renders RootLayout without errors', () => {
    expect(() => render(<RootLayout />)).not.toThrow();
  });

  it('tracks the initial screen on mount', () => {
    render(<RootLayout />);
    expect(mockScreen).toHaveBeenCalledWith('/home', {});
  });
});
