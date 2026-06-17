# foundation

Production-ready RN/Expo base. The pipeline ships features here as Linear issues land.

## Tech Stack
- **Expo Router**: Provides file-based routing for the Expo app across native and web targets.
- **Clerk**: Handles authentication flows, including OAuth and email sign-in, through `@clerk/clerk-expo`.
- **EAS Update (OTA)**: Ships over-the-air app updates through `expo-updates` and EAS channels.
- **PostHog**: Captures product analytics in the React Native app through `posthog-react-native`.
- **Sentry**: Reports runtime errors and crashes through `@sentry/react-native`.
- **TipTap**: Powers rich-text editing inside a WebView via `react-native-webview`.

## Run
```
npm install
npx expo start
```
