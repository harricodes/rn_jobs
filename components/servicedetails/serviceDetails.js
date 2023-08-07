import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./detals.style";
import { icons, images } from "../../constants";
import { checkImageURL } from "../../utils";

const ServiceDetails = ({ companyLogo, jobTitle, companyName, location }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={images.services}
          resizeMode={"contain"}
          style={styles.logoImage}
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{companyName}</Text>
      </View>
      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>LWG TECHNOLOGIES LTD </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
        </View>
        <Text style={styles.locationName}>Nairobi</Text>
      </View>
    </View>
  );
};

export default ServiceDetails;
