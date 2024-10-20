import AppThemeProvider from '@/components/common/AppThemeProvider';
import { store } from '@/store';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
    'Lato-Black': require('../assets/fonts/Lato-Black.ttf'),
    'Lato-Bold': require('../assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('../assets/fonts/Lato-Light.ttf'),
    'Lato-Thin': require('../assets/fonts/Lato-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      // Do something
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppThemeProvider>
        <Stack>
          <Stack.Screen name="(tab)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />

          <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="product/category/[title]" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="auto" />
      </AppThemeProvider>
    </Provider>
  );
}
