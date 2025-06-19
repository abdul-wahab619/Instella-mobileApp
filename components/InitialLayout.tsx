import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    const isAuthSegment = segments[0] === "(auth)";
    if (!isSignedIn && !isAuthSegment) {
      router.replace("/(auth)/login");
    } else if (isSignedIn && isAuthSegment) {
      router.replace("/(tabs)");
    }

    // No need to return null here; useEffect should return void or a cleanup function.
  }, [isLoaded, isSignedIn, segments, router]);

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default InitialLayout;
