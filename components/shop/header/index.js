import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { icons } from "../../../constants";

import styles from "./header.style";

const ShopHeader = ({ user, searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {user?.name},</Text>
        {/* <Text style={styles.welcomeMessage}>Search for products.</Text> */}
      </View>
      {/* <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="Search For Products..."
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ShopHeader;
