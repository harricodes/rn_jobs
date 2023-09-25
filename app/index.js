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
    setTimeout(() => {
      handleGetToken();
    }, 3000);
  }, []);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("AccessToken");
    const userData = await AsyncStorage.getItem("userData");
    const welcomeDone = await AsyncStorage.getItem("welcomeDone");
    if (!dataToken) {
      if (welcomeDone !== "true") {
        router.replace("/welcome");
      } else {
        router.replace("/login");
      } // Uncomment this if using a valid router instance
    } else {
      console.log(userData);
      router.replace("/decide"); // Uncomment this if using a valid router instance
      console.log("Redirecting to home"); // Placeholder for router.replace("/home");
    }
  };

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
