import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";
import { images } from "../../constants";

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Image source={images.phot} style={styles.backgroundImage} />
      <View style={styles.profileContainer}>
        <Avatar.Image
          size={120}
          source={images.profile}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.bio}>Nature Lover and Avid Traveler</Text>
        <View style={styles.socialLinksContainer}>
          <TouchableOpacity onPress={() => console.log("Twitter clicked")}>
            <Text style={styles.socialLink}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("Instagram clicked")}>
            <Text style={styles.socialLink}>Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log("LinkedIn clicked")}>
            <Text style={styles.socialLink}>LinkedIn</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          onPress={() => console.log("Edit Profile clicked")}
          style={styles.editButton}
        >
          Edit Profile
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },
  profileContainer: {
    position: "absolute",
    top: "40%",
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
});

export default ProfilePage;
