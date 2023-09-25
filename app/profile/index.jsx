import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { COLORS, SIZES, images } from "../../constants";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/button";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [cvUri, setCvUri] = useState(null);
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleGetUser();
    requestPermissions();
  }, []);

  const handleGetUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        router.replace("/login"); // Navigate to the login screen if no user data found
      } else {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      // Handle the error as needed, e.g., show an error message
    }
  };

  const handlePressLogout = async () => {
    await AsyncStorage.removeItem("userData");
    router.replace("/login");
  };

  const requestPermissions = async () => {
    const { status } = await DocumentPicker.requestDocumentPermissionsAsync();
    if (status !== "granted") {
      console.error("Document permissions not granted");
    }

    const { status: imageStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (imageStatus !== "granted") {
      console.error("Media library permissions not granted");
    }
  };

  const handleUploadCV = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", // Restrict to PDF files
      });

      if (result.type === "success") {
        setCvUri(result.uri);
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      // Handle the error as needed, e.g., show an error message
    }
  };

  const handleUploadProfileImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        setProfileImageUri(result.uri);
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      // Handle the error as needed, e.g., show an error message
    }
  };

  const editProfile = () =>{
    router.push("/profile/edit")
  }

  const secureProfile = () =>{
    router.push("/profile/security")
  }

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
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          {profileImageUri ? (
            <Avatar.Image
              size={70}
              source={{ uri: profileImageUri }}
              style={styles.avatar}
            />
          ) : (
            <Avatar.Image
              size={70}
              source={images.profile}
              style={styles.avatar}
            />
          )}

          <View style={{ marginTop: 20, width: "100%" }}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: 700,
                  color: COLORS.primary,
                  fontSize: SIZES.large,
                }}
              >
                {user?.name}
              </Text>
              <Text
                style={{
                  color: COLORS.gray,
                }}
              >
                {user?.email}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#D1D0D2",
                borderRadius: 4,
                padding: 10,
                marginTop: 30,
              }}
            >
              <TouchableOpacity style={{ flexDirection: "row", marginBottom: 20 }} onPress={editProfile}>
                <View
                  style={{
                    backgroundColor: "#A5E4FF",
                    width: 40, // Adjust the width as needed
                    height: 40, // Adjust the height as needed
                    borderRadius: 50, // Half of the width or height to create a circle
                    alignItems: "center",
                    justifyContent: "center", // Center the content inside the circle
                    marginRight: 20,
                  }}
                >
                  <Ionicons name="pencil-outline" size={24} color={COLORS.black} />
                </View>
                <View>
                  <Text style={{ fontWeight: 700, color: COLORS.primary }}>
                    Edit Profile
                  </Text>
                  <Text style={{ fontSize: SIZES.small }}>
                    Make changes to your profile information.
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", marginBottom: 20 }} onPress={secureProfile}>
                <View
                  style={{
                    backgroundColor: "#C9F95D",
                    width: 40, // Adjust the width as needed
                    height: 40, // Adjust the height as needed
                    borderRadius: 50, // Half of the width or height to create a circle
                    alignItems: "center",
                    justifyContent: "center", // Center the content inside the circle
                    marginRight: 20,
                  }}
                >
                  <Ionicons name="lock-closed-outline" size={24} color={COLORS.black} />
                </View>
                <View>
                  <Text style={{ fontWeight: 700, color: COLORS.primary }}>
                    Security
                  </Text>
                  <Text style={{ fontSize: SIZES.small }}>
                    Change your password
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: "row", marginBottom: 20 }}>
                <View
                  style={{
                    backgroundColor: "#FF9BD6",
                    width: 40, // Adjust the width as needed
                    height: 40, // Adjust the height as needed
                    borderRadius: 50, // Half of the width or height to create a circle
                    alignItems: "center",
                    justifyContent: "center", // Center the content inside the circle
                    marginRight: 20,
                  }}
                >
                   <Ionicons name="notifications-outline" size={24} color={COLORS.black} />
                </View>
                <View>
                  <Text style={{ fontWeight: 700, color: COLORS.primary }}>
                    Notifications
                  </Text>
                  <Text style={{ fontSize: SIZES.small }}>
                    Setup notification preference
                  </Text>
                </View>
              </TouchableOpacity>
            </View>


            <View
              style={{
                backgroundColor: "#D1D0D2",
                borderRadius: 4,
                padding: 10,
                marginTop: 30,
              }}
            >
              <TouchableOpacity style={{ flexDirection: "row"}} onPress={handleUploadCV}>
                <View
                  style={{
                    backgroundColor: "#FF9BD6",
                    width: 40, // Adjust the width as needed
                    height: 40, // Adjust the height as needed
                    borderRadius: 50, // Half of the width or height to create a circle
                    alignItems: "center",
                    justifyContent: "center", // Center the content inside the circle
                    marginRight: 20,
                  }}
                >
                   <Ionicons name="cloud-upload-outline" size={24} color={COLORS.black} />
                </View>
                <View>
                  <Text style={{ fontWeight: 700, color: COLORS.primary }}>
                    Resume / CV
                  </Text>
                  <Text style={{ fontSize: SIZES.small }}>
                    Upload your CV
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Button title="Log Out"
          filled
          onPress={handlePressLogout}
          disabled={loading} // Disable the button when loading
          style={{
            marginTop: 18,
            marginBottom: 4,
          }} />
          </View>

          {/* <View >
            
            {cvUri && (
              <View style={styles.row}>
                <Text style={styles.label}>CV:</Text>
                <Text style={styles.value}>{cvUri}</Text>
              </View>
            )}
            <TouchableOpacity onPress={handleUploadCV}>
              <Text style={styles.uploadButton}>Upload CV</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUploadProfileImage}>
              <Text style={styles.uploadButton}>Upload Profile Picture</Text>
            </TouchableOpacity>
          </View> */}

          {/* <Button
            mode="contained"
            onPress={handlePressLogout}
            style={styles.logoutButton}
          >
            Logout
          </Button> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    padding: 10,
  },
  profileContainer: {
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    marginTop: 20,
    borderWidth: 4,
    borderColor: "#fff",
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginLeft: 16,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
    textAlign: "left",
  },
  value: {
    flex: 1,
    textAlign: "left",
  },
  uploadButton: {
    marginTop: 10,
    color: "#2e78b7",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#2e78b7",
  },
});

export default Profile;
