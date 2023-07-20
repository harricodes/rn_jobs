import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { images, COLORS, SIZES } from "../constants";

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
    if (!dataToken) {
      router.replace("/login");
    } else {
      console.log(userData);
      router.replace("/home");
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
    width: "180px",
    height: "120px",
  },
});

export default Index;
