import { render } from '@testing-library/react-native';
import * as Updates from 'expo-updates';

const mockReloadAsync = jest.fn();

jest.mock('expo-router', () => {
  const { View } = require('react-native');
  const Stack = ({ children }: { children?: React.ReactNode }) => <View>{children}</View>;
  Stack.Screen = () => null;
  return { Stack };
});

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

jest.mock('expo-updates', () => ({
  useUpdates: jest.fn(() => ({ isUpdatePending: false })),
  reloadAsync: () => mockReloadAsync(),
  isEnabled: false,
}));

const mockUseUpdates = Updates.useUpdates as jest.Mock;

// Import after mocks are set up
import RootLayout from '../_layout';

describe('RootLayout OTA update behaviour', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not call reloadAsync when no update is pending', () => {
    mockUseUpdates.mockReturnValue({ isUpdatePending: false });
    render(<RootLayout />);
    expect(mockReloadAsync).not.toHaveBeenCalled();
  });

  it('calls reloadAsync when an update is pending', () => {
    mockUseUpdates.mockReturnValue({ isUpdatePending: true });
    render(<RootLayout />);
    expect(mockReloadAsync).toHaveBeenCalledTimes(1);
  });
});
