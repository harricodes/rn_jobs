import React, { useEffect } from "react";
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Make sure you have the appropriate constants defined in the "../constants" path
import { images, COLORS, SIZES } from "../constants";
import { Stack, useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();



  useEffect(() => {
    const handleGetToken = async () => {
      try {
        const dataToken = await AsyncStorage.getItem("AccessToken");
        const userData = await AsyncStorage.getItem("userData");
        const welcomeDone = await AsyncStorage.getItem("welcomeDone");

        if (!dataToken) {
          if (welcomeDone !== "true") {
            router.replace("/welcome");
          } else {
            router.replace("/login");
          }
        } else {
          if (userData) {
            router.replace("/decide");
          } else {
            router.replace("/login");
          }
          console.log("Redirecting to home");
        }
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
        // Handle the error as needed, e.g., show an error message
      }
    };

    // Call handleGetToken after a delay of 3 seconds
    const timeout = setTimeout(() => {
      handleGetToken();
    }, 3000);

    // Cleanup the timeout if the component unmounts before the delay
    return () => clearTimeout(timeout);
  }, [router]); // Include router in the dependency array to ensure it's up-to-date

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
        }}
      />
      <View style={styles.logoContainer}>
        <Image source={images.logo} resizeMode="contain" style={styles.logo} />
      </View>
      <View>
        <ActivityIndicator size={SIZES.large} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180,
    height: 120,
  },
});

export default Index;
