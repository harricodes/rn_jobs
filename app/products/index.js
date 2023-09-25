import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Picker
} from "react-native";
import { COLORS, images } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { API_URL } from "@env";
import * as ImagePicker from "expo-image-picker"; // Import the image picker
import { Stack } from "expo-router";
import { ScreenHeaderBtn } from "../../components";
import Button from "../../components/button";

const AddProductComponent = () => {
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([])
  const [user, setUser] = useState([])


  useEffect(() =>{
    getCategory()
  }, [])

  const getCategory = async () =>{
    const dataUser = await AsyncStorage.getItem("userData");
    setUser(JSON.parse(dataUser))

    axios.get(API_URL+"/categories").then((resp)=>{
        setCategory(resp.data.categories)
    })
  }

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied to access the camera roll");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setProductImage(result.uri);
    }
  };

  const handleAddProduct = async () => {
    setLoading(true); // Show loading animation
    try {
      const formData = new FormData();
      formData.append('productImage', {
        uri: productImage,
        name: 'productImage.jpg',
        type: 'image/jpeg',
      });
      

      console.log({
        productImage,
        productCategory,
        productName,
        description,
        price,
        user_id: user.id
      })

      axios.post(API_URL+"/product-create",{
        productImage,
        productCategory,
        productName,
        description,
        price,
        user_id: user.id
      } ).then((resp) => {
        console.log(resp.data)
      })

      Toast.show({
        type: "success",
        text1: "Product added successfully",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Product addition failed",
        text2: error.response.data.error,
      });
    } finally {
      setLoading(false); // Hide loading animation
    }
  };

  const handleDropdownChange = (value) => {
    setProductCategory(value);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite, padding: 15 }}>
      {/* ... your header and ScrollView code ... */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimensions="100%" />
          ),
          headerTitle: "",
        }}
      />
        {/* ... your existing code ... */}
        <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.primary,
              }}
            >
              Add a new product ➕
            </Text>

          </View>
        {/* Product Image */}
        <TouchableOpacity
          onPress={handleImagePicker}
          style={{ marginVertical: 12 }}
        >
          <View
            style={{
              width: 120,
              height: 120,
              backgroundColor: COLORS.lightGray,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
            }}
          >
            {productImage ? (
              <Image
                source={{ uri: productImage }}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
              />
            ) : (
              <Ionicons name="add-circle-outline" size={40} color={COLORS.gray} />
            )}
          </View>
        </TouchableOpacity>

        {/* Product Category */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}>
            Product Category
          </Text>
          <Picker
          selectedValue={productCategory}
           onValueChange={handleDropdownChange}
          style={styles.input}
        >
            <Picker.Item label="Select Category" value="" />
            {category && (
                category.map((res, index) =>(
                    <Picker.Item key={index} label={res.name} value={res.id} />
                ))
            )}
          
        </Picker>
        </View>

        {/* Product Name */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}>
            Product Name
          </Text>
          <TextInput
            placeholder="Enter product name"
            onChangeText={(text) => setProductName(text)}
            style={styles.input}
          />
        </View>

        {/* Description */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}>
            Description
          </Text>
          <TextInput
            placeholder="Enter product description"
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
            multiline
          />
        </View>

        {/* Price */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginVertical: 8 }}>
            Price
          </Text>
          <TextInput
            placeholder="Enter product price"
            onChangeText={(text) => setPrice(text)}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <Button
        title="Add Product"
        filled
         onPress={handleAddProduct}
        disabled={loading} // Disable the button when loading
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
      />

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... your existing styles ...
  input: {
    width: "100%",
    height: 48,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});

export default AddProductComponent