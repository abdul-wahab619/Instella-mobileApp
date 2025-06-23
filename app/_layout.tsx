import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen } from "expo-router";
import { useCallback, useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
  });

  const onLayoutReady = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#000000");
      NavigationBar.setButtonStyleAsync("light");
    }
  });
  return (
    <ClerkAndConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "black" }}
          onLayout={onLayoutReady}
        >
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
      <StatusBar barStyle="light-content" />
    </ClerkAndConvexProvider>
  );
}
