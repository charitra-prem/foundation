import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function SignInScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Link href="/(auth)/sign-up" style={styles.link}>
        Don&apos;t have an account? Sign up
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  link: {
    color: '#007AFF',
    fontSize: 16,
  },
});
