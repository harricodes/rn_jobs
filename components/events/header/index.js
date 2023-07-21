import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { icons } from "../../../constants";


import styles from "./header.style";

const Header = ({ user, searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {user?.name},</Text>
        <Text style={styles.welcomeMessage}>What is happening around you.</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="Search For Events..."
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View> */}
    </View>
  );
};

export default Header;
