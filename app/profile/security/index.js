import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { COLORS, images } from "../../../constants";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from "react-native-toast-message";
import { API_URL } from "@env";

const index = () => {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isConfPasswordShown, setIsConfPasswordShown] = useState(true);
  const [isOldPasswordShown, setOldPasswordShown] = useState(true);
  const [oldPassword, setOldPassword] = useState(null);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const changePassword = async () => {
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem("userData");
      const token = await AsyncStorage.getItem("AccessToken");
      setUser(JSON.parse(userData));

      if (!oldPassword || !password || !confPassword) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Fields Required",
          text2: "All fields are required",
        });
        return;
      }

      if (oldPassword === password) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Invalid Password",
          text2: "Your old password cannot be the same as new",
        });
        return;
      }

      if (password !== confPassword) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Invalid Password",
          text2: "Passwords do not match",
        });
        return;
      }

      const response = await axios.put(
        `${API_URL}/update-password`,
        {
          old_password: oldPassword,
          new_password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Password Updated",
        text2: response.data.message,
      });
      await AsyncStorage.clear();

      setTimeout(() => {
        // Navigate to the profile screen or any other screen as needed
        router.replace("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Invalid Password",
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
          headerLeft: null,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={{ width: 120, height: 120, alignSelf: "center" }}
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
              Update your password ! 🔑
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Improve security!
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
              Old Password
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
                paddingLeft: 22,
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 5,
              }}
            >
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isOldPasswordShown}
                onChangeText={(text) => setOldPassword(text)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />

              <TouchableOpacity
                onPress={() => setOldPasswordShown(!isOldPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginVertical: 8,
              }}
            >
              New Password
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
                paddingLeft: 22,
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 5,
              }}
            >
              <TextInput
                placeholder="Enter New password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isPasswordShown}
                onChangeText={(text) => setPassword(text)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginVertical: 8,
              }}
            >
              Confirm New Password
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
                paddingLeft: 22,
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 5,
              }}
            >
              <TextInput
                placeholder="Confirm New password"
                placeholderTextColor={COLORS.black}
                secureTextEntry={isConfPasswordShown}
                onChangeText={(text) => setConfPassword(text)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />

              <TouchableOpacity
                onPress={() => setIsConfPasswordShown(!isConfPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Update Password"
            filled
            onPress={changePassword}
            disabled={loading} // Disable the button when loading
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default index;
