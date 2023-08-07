import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons } from "../../../constants";
import { API_URL } from "@env";
import Toast from "react-native-toast-message";

import styles from "./footer.style";

const Footer = ({ jobId, is_applied }) => {
  const [loading, setLoading] = useState(false); // State variable to manage loading state
  const [disabled, setDisabled] = useState(false);

  const handleApply = async () => {
    setLoading(true); // Show loading animation
    const dataToken = await AsyncStorage.getItem("AccessToken");
    const userData = await AsyncStorage.getItem("userData");
    const user = JSON.parse(userData);
    axios
      .post(
        API_URL + "/job/apply",
        {
          user_id: user.id,
          job_id: jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${dataToken}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data);
        setLoading(false); // Hide loading animation on success
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "You have applied for the job",
        });
        setDisabled(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Hide loading animation on error
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.applyBtn}
        onPress={handleApply}
        disabled={loading || is_applied || disabled}
      >
        {loading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text style={styles.applyBtnText}>
            {is_applied ? "Already Applied" : "Apply For The Job"}
          </Text>
        )}
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

export default Footer;
