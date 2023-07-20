import { View, ScrollView, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SIZES, images } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../../components";
import Bottomsheet from "../../components/common/Bottomsheet";

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null); // Initialize user as null
  const [searchTerm, setSearchTerm] = useState("");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const dataToken = await AsyncStorage.getItem("AccessToken");
      const userData = await AsyncStorage.getItem("userData");
      if (!userData || !dataToken) {
        // If no user data or token is found, navigate to login screen
        router.replace("/login");
      } else {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      // Handle the error as needed, e.g., show an error message
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimensions="60%"
              onPress={() => toggleBottomSheet}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
            user={user}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
      <Bottomsheet
        isVisible={isBottomSheetVisible}
        toggleBottomSheet={toggleBottomSheet}
      />
    </SafeAreaView>
  );
};

export default Home;
