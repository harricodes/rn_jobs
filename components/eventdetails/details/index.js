import React from "react";
import { View, Text } from "react-native";

import styles from "./eventdetails.style";

const EventDetailz = ({ info }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About The Event</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  );
};

export default EventDetailz;
