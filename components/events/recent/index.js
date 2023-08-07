import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

import styles from "./recentStyles.style";
import useFetch from "../../../hook/useFetch";
import RecentEvent from "../../common/cards/events/recents";

const RecentEvents = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("/events", {
    query: "React Developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Events</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          data?.map((job) => (
            <RecentEvent
              job={job}
              key={`nearby-job ${job?.id}`}
              handleNavigate={() => router.replace(`/event-details/${job?.id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default RecentEvents;
