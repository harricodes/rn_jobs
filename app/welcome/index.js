import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { COLORS, images } from "../../constants";
import Button from "../../components/button";
import { Stack, useRouter } from "expo-router";

const StepOne = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "",
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginBottom: 20 }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ position: "relative" }}>
            <Image
              source={images.hero1}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: "absolute",
                top: 10,
                left: 20,
                transform: [{ rotate: "-15deg" }],
              }}
            />

            <Image
              source={images.hero2}
              style={{
                height: 100,
                width: 100,
                borderRadius: 20,
                position: "absolute",
                top: -30,
                left: 100,
                transform: [{ rotate: "-5deg" }],
              }}
            />

            <Image
              source={images.hero3}
              style={{
                width: 100,
                height: 100,
                borderRadius: 20,
                position: "absolute",
                top: 130,
                left: -50,
                transform: [{ rotate: "15deg" }],
              }}
            />

            <Image
              source={images.hero2}
              style={{
                height: 200,
                width: 200,
                borderRadius: 20,
                position: "absolute",
                top: 110,
                left: 100,
                transform: [{ rotate: "-15deg" }],
              }}
            />
          </View>

          {/* content  */}

          <View
            style={{
              paddingHorizontal: 22,
              paddingTop: 370, // Adjust this value to control the content position
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 50,
                fontWeight: "800",
                color: COLORS.primary,
              }}
            >
              Welcome To
            </Text>
            <Text
              style={{
                fontSize: 46,
                fontWeight: "800",
                color: COLORS.primary,
              }}
            >
              Patanisha
            </Text>

            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.secondary,
                  marginVertical: 4,
                }}
              >
                Your one stop digital marketplace
              </Text>
            </View>

            <Button
              title="Next"
              onPress={() => router.replace("/welcome/jobs")}
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

export default StepOne;
