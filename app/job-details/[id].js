import React, { useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, Text, View } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { data, isLoading, error, refetch } = useFetch({
    id: params.id,
  });

  useEffect(() => {
    // Call the refetch function when the component loads
    if (data.length > 0) refetch();
  }, [data]);

  //console.log(data);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0]?.job_highlights?.qualifications ?? ["N/A"]}
          />
        );

      case "About":
        return <JobAbout info={data?.description ?? "No Data"} />;
      case "Responsibilities":
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimensions={"60%"} />
          ),
          headerTitle: "",
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text>No data</Text>
        ) : data.length > 0 ? (
          <Text></Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data?.company?.company_logo}
              jobTitle={data?.title}
              companyName={data?.company?.company_name}
              location={data?.company?.city}
            />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            {displayTabContent()}
          </View>
        )}
      </ScrollView>
      <JobFooter />
    </SafeAreaView>
  );
};

export default JobDetails;
