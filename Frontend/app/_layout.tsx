import { Stack } from "expo-router";

export default function Layout() {
  return (
      <Stack>
        {/* Screens */}
        <Stack.Screen name="(screens)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/profile" options={{ headerShown: false }} />
      </Stack>
  );
}