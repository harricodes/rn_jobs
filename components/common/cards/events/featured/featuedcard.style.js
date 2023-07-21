import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../../constants";

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    width: 250,
    backgroundColor: selectedJob === item.id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    borderColor: "#b9514a", // Add the border color property
    borderWidth: 1, // Optional, adjust the border width as needed
  }),
  logoContainer: (selectedJob, item) => ({
    width: "100%",
    height: 70,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    backgroundColor: selectedJob === item.id ? "#FFF" : COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "100%",
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    height: "100%",
  },
  companyName: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
    paddingLeft:10
  },
  infoContainer: {
  },
  jobName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === item.id ? COLORS.white : COLORS.primary,
    paddingLeft:10
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft:10
  },
  publisher: (selectedJob) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedJob === item.id ? COLORS.white : COLORS.primary,
    paddingLeft:10
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    paddingLeft:10,
    marginBottom: 5
  },
});

export default styles;
