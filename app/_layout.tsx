import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitle: "",
          headerStyle: { backgroundColor: "#FFF7FC" },
          headerTintColor: "#FFA4DB",
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(stack)/login/EmailLoginScreen"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/login/PasswordLoginScreen"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/register/EmailRegisterScreen"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/register/RegisterFormScreen"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/register/RegisterPasswordScreen"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/profile/personalInfo/PersonalInformation"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/profile/orders/Orders"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/profile/securityLogin/SecurityLogin"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/profile/legal/TermsConditions"
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="(stack)/profile/legal/PrivacyPolicies"
          options={{ headerShown: true }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
