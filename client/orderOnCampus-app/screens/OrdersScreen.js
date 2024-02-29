import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../slices/AuthSlice'

export default function OrdersScreen() {
  const user = useSelector(selectToken)
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