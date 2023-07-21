import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_URL} from "@env"

const useFetch = (endpoint, query) => {
  console.log(endpoint);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState();

  useEffect(() => {
    handleGetToken();
  }, []);

  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("AccessToken");
    setToken(dataToken);
  };

  const options = {
    method: "GET",
    url: API_URL+`${endpoint}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // params: { ...query },
  };

  const option = {
    method: "GET",
    url: API_URL+`/${endpoint}/${endpoint.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // params: { ...query },
  };

  useEffect(() => {
    if (token !== undefined) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    setIsLoading(true);
    //console.log(token);
    try {
      const response = endpoint.id
        ? await axios.request(option)
        : await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);

      // Check if the error is 401 (Unauthorized) and delete the token
      if (error.response && error.response.status === 401) {
        await AsyncStorage.removeItem("AccessToken");
        await AsyncStorage.removeItem("userData");
        setToken(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
