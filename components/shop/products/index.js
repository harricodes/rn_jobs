import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

import styles from "./recentStyles.style";
import useFetch from "../../../hook/useFetch";
import RecentEvent from "../../common/cards/events/recents";
import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState,useEffect } from "react";
import AllProducts from "../allProducts";

const Products = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [data, setData] = useState();
  const {  isLoading, error } = useFetch("/products", {
    query: "React Developer",
    num_pages: 1,
  });

  useEffect(() =>{
    getProducts()
  }, [])

  const getProducts = () =>{
    axios.get(API_URL+"/products")
      .then((resp) =>{
        setData(resp.data.products)
        console.log(resp.data)
      })
      .catch((error) =>{
        console.log(error)
      })
  }

  useEffect(() =>{
    getUser()
  }, [])

  const getUser = async () =>{
    const dataUser = await AsyncStorage.getItem("userData");
    setUser(JSON.parse(dataUser))
  }
  const handleAdd =  () =>{
   // router.push("/subscribe")
   axios.post(API_URL+"/checkSubscription", {
    user_id : user.id
   }).then((resp) =>{
    if(resp.data.status === true){
      router.push("/products")
    }else{
      router.push("/subscribe")
    }
    console.log(resp.data)
   }).catch((error) =>{
    console.log(error)
   })
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Products</Text>
        <TouchableOpacity onPress={handleAdd} >
          <Text style={styles.headerBtn}>+ Add Product</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          data?.map((job) => (
            <AllProducts
              job={job}
              key={`nearby-job ${job?.id}`}
              // handleNavigate={() => router.replace(`/product-details/${job?.id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Products;
