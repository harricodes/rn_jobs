import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../../../constants";

import styles from "./footer.style";

const Footer = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.applyBtn}>
        <Text style={styles.applyBtnText}>Apply For The Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
