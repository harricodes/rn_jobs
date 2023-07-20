import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const Bottomsheet = ({ isVisible, toggleBottomSheet }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={toggleBottomSheet}>
      <View style={styles.bottomSheetContainer}>
        <TouchableOpacity onPress={toggleBottomSheet}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
        <Text>Content of the Bottom Sheet</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  showButton: {
    fontSize: 18,
    color: "blue",
  },
  bottomSheetContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
  },
  closeButton: {
    fontSize: 16,
    color: "blue",
    textAlign: "right",
  },
});


export default Bottomsheet;
