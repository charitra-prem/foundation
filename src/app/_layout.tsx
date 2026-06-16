import { Stack, useGlobalSearchParams, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { PostHogProvider, usePostHog } from 'posthog-react-native';

SplashScreen.preventAutoHideAsync();

function ScreenTracker() {
  const posthog = usePostHog();
  const pathname = usePathname();
  const params = useGlobalSearchParams();

  useEffect(() => {
    posthog?.screen(pathname, params as Record<string, string>);
  }, [pathname, params]);

  return null;
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY ?? ''}
      options={{
        host: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
        disabled: !process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
      }}
    >
      <ScreenTracker />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </PostHogProvider>
  );
}
