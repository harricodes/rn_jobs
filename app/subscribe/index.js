import { View, Text, SafeAreaView, StyleSheet, Picker, TextInput, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import { COLORS, images } from '../../constants';
import { ScreenHeaderBtn } from '../../components';
import Button from "../../components/button";

const Subscribe = () => {
    const router = useRouter()
const [packages, usePackages] = useState([]);
const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState();

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

    useEffect(() =>{
        getPackages()
    }, [])

    const getPackages = async () => {
        const dataToken = await AsyncStorage.getItem("AccessToken");
        const dataUser = await AsyncStorage.getItem("userData");
        ///console.log(dataUser)
        setUser(JSON.parse(dataUser))
        console.log(dataToken)
        axios.post(API_URL+"/packages", {
            headers:{
                Authorization: `Bearer ${dataToken}`,
            }
        }).then((response) =>{
            usePackages(response.data.packages)
            console.log(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }
    const handleSubmit = () => {
        // Perform your submission logic here
        axios.post(API_URL+"/subscribe", {
            user_id: user.id,
            package_id: selectedOption
        }).then((resp) =>{
            if (resp.data.message === "Subscription successful"){
                router.replace('/shop')
                console.log(resp.data)
            }else{
                console.log(resp.data)
            }
            
        }).catch((error) =>{
            console.log(error)
        })
      };

      return (
        <SafeAreaView style={styles.container}>
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,
              headerBackVisible: false,
              headerTitle: "",
              headerLeft: null, // Hide the back button
            }}
          />
          <View>
            <Image
              source={images.logo}
              resizeMode="contain"
              style={styles.logoImage}
            />
            <View style={{ marginVertical: 22 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginVertical: 12,
    
                  color: COLORS.primary,
                }}
              >
                Package Subscription! 💰
              </Text>
    
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                }}
              >
                Hello, in order to be able to post your products,
                Kindly select your subscription plan!
              </Text>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Select Plan</Text>
              <Picker
          selectedValue={selectedOption}
          onValueChange={handleDropdownChange}
          style={styles.input}
        >
            <Picker.Item label="Select Plan" value="" />
            {packages && (
                packages.map((res, index) =>(
                    <Picker.Item key={index} label={res.name} value={res.id} />
                ))
            )}
          
        </Picker>
        <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 600,
                marginVertical: 8,
              }}
            >
              Phone Number
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
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
                placeholder="Enter your phonenumber"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange(text)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
          </View>
        
        <Button
            title="Subscribe"
            filled
            onPress={handleSubmit}
            // disabled={loading} // Disable the button when loading
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          />
            </View>
            
          </View>
          {/* <Toast /> */}
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: "center",
        backgroundColor: COLORS.lightWhite,
        paddingBottom: 20,
      },
      formGroup: {
        marginBottom: 20,
      },
      label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
      },
      input: {
        height: 48,
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        justifyContent: "center", // Center the text vertically
        backgroundColor: "#fff", // Set the background color to white
      },
      selectedPlan: {
        fontSize: 16,
      },
      button: {
        marginTop: 20,
      },
      logoImage: {
        width: 120,
        height: 130,
        marginBottom: 0,
      },
    });
    

export default Subscribe