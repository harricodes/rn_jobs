import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { checkImageURL } from "../../../../../utils";

import styles from "./featuedcard.style";

const FeaturedEvent = ({ selectedJob, item, handleNavigate }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={handleNavigate}
    >
      <TouchableOpacity
        style={styles.logoContainer(selectedJob, item)}
        onPress={() => {}}
      >
        <Image
          source={{
            uri: checkImageURL(item.event_banner)
              ? item.event_banner
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="cover"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
      By: {item.company.company_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.event_name}
        </Text>
        <Text style={styles.location}>{item.event_price === "0.00" ? "Free": item.event_price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedEvent;
