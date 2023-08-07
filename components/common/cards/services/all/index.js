import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { images } from "../../../../../constants";
import { checkImageURL } from "../../../../../utils";

import styles from "./all.style";

const HomeService = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={images.services}
          resizeMode="contain"
          style={styles.logImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.category_name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeService;
