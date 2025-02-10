import { Stack } from "expo-router";
import React from "react";

export default function LoginStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="EmailScreen"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="PasswordScreen"
        options={{
          headerShown: true,
        }}
      />
    </Stack>
  );
}