import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, images } from "../../constants";
import Button from "../../components/button";
import { Stack, useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

import styles from "./registe.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {API_URL} from "@env"

const Register = () => {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        API_URL+"/api/register",
        {
          name,
          email,
          phone_number,
          password,
        }
      );

      const { user, access_token } = response.data;

      // Store the user data and access token in AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(user));
      await AsyncStorage.setItem("AccessToken", access_token);
      router.replace("/home");

      // Redirect the user to the Home screen or any other screen
      // Add your navigation logic here
    } catch (error) {
      console.error("Registration error:", error);
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
              Create an Account
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Create an account to proceed!
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
              Full Name
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
                placeholder="Enter your name"
                placeholderTextColor={COLORS.black}
                keyboardType="text"
                onChangeText={(text) => setName(text)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
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
              Email address
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
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
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
              Mobile Number
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 5,
              }}
            >
              {/* <TextInput
                            placeholder='+254'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: COLORS.grey,
                                height: "100%"
                            }}
                        /> */}

              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                onChangeText={(text) => setPhoneNumber(text)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
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
              Password
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

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />

            <Text>I agree to the terms and conditions</Text>
          </View>

          <Button
            title="Sign Up"
            filled
            onPress={handleRegister}
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Already have an account
            </Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
