import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView, StyleSheet,TextInput } from 'react-native'
import { Stack } from 'expo-router'
import { COLORS } from '../../../constants'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import * as ImagePicker from "expo-image-picker"; 
import { Ionicons } from "@expo/vector-icons";
import Button from '../../../components/button'

const index = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [number, setNumber] = useState(null)
    const [loading, setLoading] = useState(false);

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

    const handleEditProfile = () =>{

    }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite, padding: 16}}>
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
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}>
            Name
          </Text>
          <TextInput
            placeholder="Enter Name"
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}>
            Email
          </Text>
          <TextInput
            placeholder="Enter Email"
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}>
            Phone Number
          </Text>
          <TextInput
            placeholder="Enter Phone Number"
            onChangeText={(text) => setNumber(text)}
            style={styles.input}
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
      </ScrollView>
    </SafeAreaView>
  )
}

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

export default index