import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, FONT, SIZES, icons, images } from "../../constants";
import { ScreenHeaderBtn } from "../../components";

const index = () => {
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
        replace("/login"); // Navigate to login screen if no user data or token found
      } else {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      // Handle the error as needed, e.g., show an error message
    }
  };
  const handleJOb = () => {
    router.push("/home");
  };
  const handleEvents = () => {
    router.push("/events");
  };
  const handleServices = () => {
    router.push("/services");
  };
  const handleShop = () => {
    router.push("/shop");
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.lightWhite, padding: 16 }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: null, // Hide the back button
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.container}>
            <Text style={styles.userName}>Hello {user?.name},</Text>
            <Text style={styles.welcomeMessage}>
              Select the service that you would like...
            </Text>
          </View>
          <View style={{ marginTop: 40 }}>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={{ borderWidth: 1, borderRadius: 4, padding: 12 }}
                onPress={handleJOb}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={images.searchJob}
                    resizeMode="contain"
                    style={{ width: 50, height: 50, marginRight: 20 }}
                  />
                  <Text
                    style={{
                      fontSize: SIZES.large,
                      fontWeight: "800",
                      color: COLORS.primary,
                    }}
                  >
                    Jobs
                  </Text>
                  <Image
                    source={icons.next}
                    resizeMode="contain"
                    style={{ width: 30, height: 40, alignSelf: "flex-end" }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={{ borderWidth: 1, borderRadius: 4, padding: 12 }}
                onPress={handleEvents}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={images.events}
                    resizeMode="contain"
                    style={{ width: 50, height: 50, marginRight: 20 }}
                  />
                  <Text
                    style={{
                      fontSize: SIZES.large,
                      fontWeight: "800",
                      color: COLORS.primary,
                    }}
                  >
                    Events
                  </Text>
                  <Image
                    source={icons.next}
                    resizeMode="contain"
                    style={{ width: 30, height: 40, alignSelf: "flex-end" }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={{ borderWidth: 1, borderRadius: 4, padding: 12 }}
                onPress={handleServices}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={images.services}
                    resizeMode="contain"
                    style={{ width: 50, height: 50, marginRight: 20 }}
                  />
                  <Text
                    style={{
                      fontSize: SIZES.large,
                      fontWeight: "800",
                      color: COLORS.primary,
                    }}
                  >
                    Services
                  </Text>
                  <Image
                    source={icons.next}
                    resizeMode="contain"
                    style={{ width: 30, height: 40, alignSelf: "flex-end" }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={{ borderWidth: 1, borderRadius: 4, padding: 12 }}
                onPress={handleShop}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    source={images.uza}
                    resizeMode="contain"
                    style={{ width: 50, height: 50, marginRight: 20 }}
                  />
                  <Text
                    style={{
                      fontSize: SIZES.large,
                      fontWeight: "800",
                      color: COLORS.primary,
                    }}
                  >
                    Uza Chapchap
                  </Text>
                  <Image
                    source={icons.next}
                    resizeMode="contain"
                    style={{ width: 30, height: 40, alignSelf: "flex-end" }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: "100%",
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    fontWeight: 700,
    marginTop: 2,
  },
});

export default index;
