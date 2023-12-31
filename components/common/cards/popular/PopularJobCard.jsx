import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { checkImageURL } from "../../../../utils";

import styles from "./popularjobcard.style";

const PopularJobCard = ({ selectedJob, item, handleNavigate }) => {
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
            uri: checkImageURL(item.employer_logo)
              ? item.employer_logo
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.company.company_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.title}
        </Text>
        <Text styles={styles.location}>{item.company.city}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
