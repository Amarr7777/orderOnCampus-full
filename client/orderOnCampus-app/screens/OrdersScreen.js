import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectToken, setToken } from '../slices/AuthSlice'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function OrdersScreen() {
  const user = useSelector(selectToken)
  const dispatch = useDispatch();

  const triggerRender = 
  useCallback
  (
    async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post("http://0.0.0.0:5001/users/get-user", { token });
      // setName(res.data.data.name);
      dispatch(setToken({ data: res.data.data }));
      console.log("RE-RENDERED ORDER SCREEN");
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    triggerRender();
    const intervalId = setInterval(() => {
      triggerRender();
    }, 5000);
    return () => clearInterval(intervalId);
  },[]); 

  useFocusEffect(
    useCallback(() => {
        // Trigger re-render when the screen gains focus
        triggerRender();
        
    }, [])
);

  return (
    <SafeAreaView className="flex-1 flex-col items-center justify-center">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: widthPercentageToDP('20%') }}
      >
        <Text className="font-bold text-xl text-center items-center justify-center">My Orders</Text>
        {
          user.data.orders.slice().reverse().map((canteen, index) => {
            return (
              <OrderCard key={index} data={canteen} />
            )
          })
        }

      </ScrollView>

    </SafeAreaView>
  )
}