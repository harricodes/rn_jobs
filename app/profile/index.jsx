import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { images, COLORS } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const dataToken = await AsyncStorage.getItem("AccessToken");
      const userData = await AsyncStorage.getItem("userData");
      if (!userData || !dataToken) {
        router.replace("/login"); // Navigate to login screen if no user data or token found
      } else {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      // Handle the error as needed, e.g., show an error message
    }
  };

  const handlePress = async () => {
    await AsyncStorage.removeItem("AccessToken");
    await AsyncStorage.removeItem("userData");

    router.replace("/login");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
        }}
      />
      <View style={styles.profileContainer}>
        <Avatar.Image
          size={120}
          source={images.profile}
          style={styles.avatar}
        />
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{user?.phone_number}</Text>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={handlePress}
          style={styles.editButton}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  backgroundImage: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },
  profileContainer: {
    position: "absolute",
    top: "10%",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    marginTop: -80,
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  bio: {
    fontSize: 16,
    color: "#666",
  },
  socialLinksContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  socialLink: {
    marginHorizontal: 10,
    color: "#2e78b7",
    fontSize: 16,
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 20,
    backgroundColor: "#2e78b7",
  },
  table: {
    marginTop: "20px",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    margin: 10,
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
    textAlign: "left", // Align the text to the left within each cell
  },
  value: {
    flex: 1,
    textAlign: "left", // Align the text to the left within each cell
  },
});

export default ProfilePage;
