import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component, useCallback, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import Categories from '../components/Categories';
import * as Icon from "react-native-feather";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { selectToken, setToken } from '../slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
const socket = io('http://localhost:5001');



export default function HomeScreen() {
    const dispatch = useDispatch();
  const [name, setName] = useState("");
  const userData = useSelector(selectToken);
  const navigation = useNavigation();

  // Function to trigger re-render
  const triggerRender = 
  useCallback
  (
    async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post("http://0.0.0.0:5001/users/get-user", { token });
      setName(res.data.data.name);
      dispatch(setToken({ data: res.data.data }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    // Trigger initial render
    triggerRender();
  }, []);

  
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark' />
            <View className="flex-row justify-between pt-2">
                <Text className="text-lg"> Hi, {name}</Text>
                <Icon.ShoppingCart onPress={() => navigation.navigate('Cart')} height="20" width="20" stroke="black" className="px-5" />
            </View>
            <Text className="mt-5 font-bold text-left text-4xl"> Cut The Wait.</Text>
            <Text className="font-bold text-left text-4xl"> Enjoy your plate</Text>
            <Categories />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
});