import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import Toast from "react-native-toast-message";
import axios from "axios";

const index = () => {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        // Handle the case where no user data is found
        console.error("User data not found");
        // You might want to navigate to a login screen or take some other action here
        return;
      }
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Error retrieving user data:", error);
      // Handle the error as needed, e.g., show an error message
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setName(user.name);
      setNumber(user.phone_number || ""); // Set a default value if phone is null
    }
  }, [user]);

  const requestPermissions = async () => {
    const { status: imageStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (imageStatus !== "granted") {
      console.error("Media library permissions not granted");
    }
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied to access the camera roll");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setProfileImage(result.uri);
    }
  };

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("AccessToken");
      if (!name || !email || !number) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: "Fields Required",
          text2: "Fields cannot be empty",
        });
        return;
      }

      const response = await axios.put(
        `${API_URL}/update-profile`,
        {
          name,
          email,
          phone_number: number,
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
        text1: "Profile Updated",
        text2: response.data.message,
      });

      // Update the user data in AsyncStorage
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify(response.data.user)
      );

      // Delay the navigation to give time for the Toast message to display
      setTimeout(() => {
        // Navigate to the profile screen or any other screen as needed
        router.replace("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error updating profile",
        text2: error.response?.data?.message || "An error occurred",
      });
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite, padding: 16 }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
              color: COLORS.primary,
            }}
          >
            Edit Profile
          </Text>
          <TouchableOpacity
            onPress={handleImagePicker}
            style={{ marginVertical: 12 }}
          >
            <View
              style={{
                width: 120,
                height: 120,
                backgroundColor: COLORS.lightGray,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={{ width: "100%", height: "100%", borderRadius: 8 }}
                />
              ) : (
                <Ionicons
                  name="add-circle-outline"
                  size={40}
                  color={COLORS.gray}
                />
              )}
            </View>
          </TouchableOpacity>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}
            >
              Name
            </Text>
            <TextInput
              placeholder="Enter Name"
              onChangeText={(text) => setName(text)}
              style={styles.input}
              value={name || ""}
            />
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}
            >
              Email
            </Text>
            <TextInput
              placeholder="Enter Email"
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              value={email || ""}
            />
          </View>
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}
            >
              Phone Number
            </Text>
            <TextInput
              placeholder="Enter Phone Number"
              onChangeText={(text) => setNumber(text)}
              style={styles.input}
              value={number || ""}
            />
          </View>

          <Button
            title="Save Changes"
            filled
            onPress={handleEditProfile}
            disabled={loading} // Disable the button when loading
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />
        </View>
        <Toast />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... your existing styles ...
  input: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default index;
