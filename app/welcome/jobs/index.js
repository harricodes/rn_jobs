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
import { Stack, useRouter } from "expo-router";
import Button from "../../../components/button";

const Jobs = () => {
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
          <Image
            source={images.searchJob}
            style={{
              height: 200,
              width: 200,
              borderRadius: 20,
              marginBottom: 50,
            }}
          />

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
                fontWeight: "800",
                color: COLORS.primary,
                marginBottom: 10,
              }}
            >
              Search For
            </Text>
            <Text
              style={{
                fontSize: 46,
                fontWeight: "800",
                color: COLORS.primary,
                marginBottom: 20,
              }}
            >
              Jobs & Internships
            </Text>

            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.secondary,
                  marginVertical: 4,
                }}
              >
                Find the latest jobs to help grow your career and skills.
              </Text>
            </View>

            <Button
              title="Next"
              onPress={() => router.push("/welcome/events")}
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

export default Jobs;
