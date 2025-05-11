import { Stack, usePathname } from "expo-router";
import { useFonts } from 'expo-font';
import { robotoFonts } from '../styles/fonts';
import { View, ActivityIndicator } from 'react-native';
import MainLayout from '@/components/mainLayout';
import AuthLayout from '@/components/AuthLayout';

export default function RootLayout() {
  const [fontsLoaded] = useFonts(robotoFonts);
  const pathname = usePathname();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // List of auth routes
  const authRoutes = ['/login', '/signup', '/forgotPassword'];
  const isAuthRoute = authRoutes.includes(pathname);

  const Layout = isAuthRoute ? AuthLayout : MainLayout;

  return (
    <Layout>
      <Stack screenOptions={{ headerShown: false }} />
    </Layout>
  );
}
