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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import axios from "axios";
import { API_URL } from "@env";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  

  useEffect(() => {});

  useEffect(() => {
    if (params.id !== undefined) {
      handleGetToken();
    }
  }, [params.id]);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("AccessToken");
    const userData = await AsyncStorage.getItem("userData");
    const user = JSON.parse(userData);
    fetchData(dataToken, user);
  };

  // const options = {
  //   method: "GET",
  //   url: API_URL + `/job/${params.id}/user/${user.id}`,

  //   // params: { ...query },
  // };

  const fetchData = async (dataToken, user) => {
    setIsLoading(true);
    //console.log(token);
    try {
      //const response = await axios.request(options);
      axios
        .get(API_URL + `/job/${params.id}/user/${user.id}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data.data);
          setIsLoading(false);
        });
    } catch (error) {
      setError(error);
      console.log(error);

      // Check if the error is 401 (Unauthorized) and delete the token
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem("AccessToken");
        await AsyncStorage.removeItem("userData");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleGetToken();
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
      
      <JobFooter jobId={data?.id} is_applied={data?.is_applied} />
    </SafeAreaView>
  );
};

export default JobDetails;
