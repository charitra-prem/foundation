import * as Sentry from '@sentry/react-native';

jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  wrap: jest.fn((component) => component),
}));

jest.mock('expo-router', () => ({
  Stack: {
    Screen: () => null,
  },
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}));

describe('Sentry initialization', () => {
  it('calls Sentry.init on module load', async () => {
    jest.isolateModules(() => {
      require('../_layout');
    });
    expect(Sentry.init).toHaveBeenCalledWith(
      expect.objectContaining({ tracesSampleRate: 1.0 }),
    );
  });

  it('wraps RootLayout with Sentry.wrap', async () => {
    jest.isolateModules(() => {
      require('../_layout');
    });
    expect(Sentry.wrap).toHaveBeenCalled();
  });
});
