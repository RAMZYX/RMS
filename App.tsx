import React, { useCallback } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, type LinkingOptions } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Marcellus_400Regular } from '@expo-google-fonts/marcellus';
import {
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold,
  Mulish_800ExtraBold,
  Mulish_400Regular_Italic,
} from '@expo-google-fonts/mulish';
import { Amiri_400Regular } from '@expo-google-fonts/amiri';
import { RootNavigator } from './src/navigation/RootNavigator';
import type { RootStackParamList } from './src/navigation/types';

SplashScreen.preventAutoHideAsync().catch(() => {});

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [],
  config: {
    screens: {
      Login: 'login',
      MiqaatList: 'miqaats',
      RegistrationDetail: 'detail',
      AddPeople: 'add-people',
      Review: 'review',
    },
  },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Marcellus_400Regular,
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold,
    Mulish_800ExtraBold,
    Mulish_400Regular_Italic,
    Amiri_400Regular,
  });

  const onReady = useCallback(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} onLayout={onReady}>
        <NavigationContainer linking={linking}>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}
