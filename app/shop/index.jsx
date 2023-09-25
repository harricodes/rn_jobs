import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React , { useState, useEffect } from "react";
import { Stack , useRouter } from "expo-router";
import { COLORS, SIZES, images } from '../../constants'
import { ScreenHeaderBtn } from '../../components'
import ShopHeader from '../../components/shop/header'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Products from '../../components/shop/products';

const Shop = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null); // Initialize user as null

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
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}
        style={{ paddingBottom: 60 }}>
          <View style={{
            flex: 1,
            padding: SIZES.medium,
          }}>
            <ShopHeader searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/shop/search/${searchTerm}`);
              }
            }}
            user={user} />
            <Products />
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Shop