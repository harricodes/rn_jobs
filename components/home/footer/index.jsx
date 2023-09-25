import {
  View,
  Text,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";
import styles from "./footer.style";

const HomeFooter = () => {
  const router = useRouter();
  const handleTabPress = (tabName) => {
    // Handle the click event here based on the tabName
    console.log(`Tab ${tabName.toLowerCase()} clicked!`);
    if (tabName.toLowerCase() === "jobs") {
      router.replace("/home");
    } else {
      router.push(`/${tabName.toLowerCase()}`);
    }
  };

  const TabTouchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View style={styles.container}>
      <TabTouchable
        onPress={() => handleTabPress("Jobs")}
        background={
          Platform.OS === "android"
            ? TouchableNativeFeedback.Ripple("#216397")
            : null
        }
      >
        <View style={styles.tabItem}>
          <Icon name="briefcase" size={16} color="#216397" />
          <Text style={styles.tabText}>Jobs</Text>
        </View>
      </TabTouchable>
      <TabTouchable
        onPress={() => handleTabPress("Events")}
        background={
          Platform.OS === "android"
            ? TouchableNativeFeedback.Ripple("#216397")
            : null
        }
      >
        <View style={styles.tabItem}>
          <Icon name="calendar" size={16} color="#216397" />
          <Text style={styles.tabText}>Events</Text>
        </View>
      </TabTouchable>
      <TabTouchable
        onPress={() => handleTabPress("Services")}
        background={
          Platform.OS === "android"
            ? TouchableNativeFeedback.Ripple("#216397")
            : null
        }
      >
        <View style={styles.tabItem}>
          <Icon name="settings" size={16} color="#216397" />
          <Text style={styles.tabText}>Services</Text>
        </View>
      </TabTouchable>
      <TabTouchable
         onPress={() => handleTabPress('Shop')}
        background={
          Platform.OS === "android"
            ? TouchableNativeFeedback.Ripple("#216397")
            : null
        }
      >
        <View style={styles.tabItem}>
          <Icon name="cart" size={16} color="#216397" />
          <Text style={styles.tabText}>Uza Chapchap</Text>
        </View>
      </TabTouchable>
    </View>
  );
};

export default HomeFooter;
