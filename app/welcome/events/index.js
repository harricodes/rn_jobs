import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONT, SIZES, SHADOWS, images } from "../../../constants";
import Button from "../../../components/button";
import { Stack, useRouter } from "expo-router";

const Events = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerTitle: "",
            headerLeft: null, // Hide the back button
          }}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <View>
            <Image
              source={images.events}
              style={{
                height: 200,
                width: 200,
                borderRadius: 20,
                marginBottom: 50,
              }}
            />
          </View>

          {/* content  */}

          <View
            style={{
              paddingHorizontal: 22,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 50,
                fontWeight: 800,
                color: COLORS.primary,
              }}
            >
              Post And
            </Text>
            <Text
              style={{
                fontSize: 46,
                fontWeight: 800,
                color: COLORS.primary,
              }}
            >
              Organize Events
            </Text>

            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.secondary,
                  marginVertical: 4,
                }}
              >
                Find out what's happening around you and join in on the fun.
              </Text>
            </View>

            <Button
              title="Next"
              onPress={() => router.replace("/welcome/services")}
              style={{
                marginTop: 42,
                width: "100%",
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Events;
