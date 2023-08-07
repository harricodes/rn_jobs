import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

import styles from "./services.style";
import useFetch from "../../../hook/useFetch";
import RecentEvent from "../../common/cards/events/recents";
import HomeService from "../../common/cards/services/all";

const AllServices = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("/services", {
    query: "React Developer",
    num_pages: 1,
  });
  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Services</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          data?.map((job) => (
            <HomeService
              job={job}
              key={`nearby-job ${job?.id}`}
              handleNavigate={() => router.push(`/service-details/${job?.id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default AllServices;
