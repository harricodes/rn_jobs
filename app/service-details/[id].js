import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  View,
  TextInput,
} from "react-native";
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
import EventDetailz from "../../components/eventdetails/details";
import Organizer from "../../components/eventdetails/organizer";
import ServiceDetails from "../../components/servicedetails/serviceDetails";
import ServiceFooter from "../../components/servicedetails/footerservice";

const tabs = ["Reach Us"];

const EventDetails = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [detail, setDetail] = useState("");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (params.id !== undefined) {
      fetchData();
    }
  }, [params.id]);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("AccessToken");
    fetchData(dataToken);
  };

  const options = {
    method: "GET",
    url: API_URL + `/service/${params.id}`,

    // params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    //console.log(token);
    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
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

      case "Reach Us":
        return;
      // <EventDetailz info={data?.description ?? "No Data"} />;
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
          <Text>Something went wrong {params.id}</Text>
        ) : data.length === 0 ? (
          <Text>No data</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <ServiceDetails companyName={data?.category_name} />
            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <View
              style={{
                width: "100%",
                height: 128,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 5,
                paddingBottom: 5,
                paddingRight: 5,
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Tell us what you want..."
                placeholderTextColor={COLORS.black}
                keyboardType="text"
                onChangeText={(text) => setDetail(text)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <ServiceFooter detail={detail} serviceId={data.id} />
    </SafeAreaView>
  );
};

export default EventDetails;
