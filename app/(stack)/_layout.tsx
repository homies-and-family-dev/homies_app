import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
        //   headerTitle: "",
        //   headerStyle: { backgroundColor: "#FFF7FC" },
        //   headerTintColor: "#FFA4DB",
        //   headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
