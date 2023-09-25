import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS, images } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../../../components/button";

import { Stack, useRouter } from "expo-router";

import { ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { API_URL } from "@env";

const index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState();
  const handleLogin = async () => {
    setLoading(true);
    const email = await AsyncStorage.getItem("reset");
    console.log(email);
    if (!code) {
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Invalid Code",
        text2: "Provided code is invalid",
      });
      return;
    }

    try {
      const response = await axios.post(API_URL + "/password/reset/verify", {
        email,
        code,
      });

      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Code Verified",
        text2: response.data.message,
      });
      await AsyncStorage.setItem("code", code);
      setTimeout(() => {
        router.push("/forgot-password/password");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Invalid Code",
        text2: error.response.data.message,
      });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
          headerLeft: null, // Hide the back button
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.logoImage}
          />
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.primary,
              }}
            >
              Verify Code!
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Input your code to proceed!
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginVertical: 8,
              }}
            >
              Code
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 5,
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your Code"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                onChangeText={(text) => setCode(text)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
          </View>

          <Button
            title="Verify Code"
            filled
            onPress={handleLogin}
            disabled={loading} // Disable the button when loading
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />
        </View>
      </ScrollView>

      {/* Show loading animation when the button is disabled */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoImage: {
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});

export default index;
