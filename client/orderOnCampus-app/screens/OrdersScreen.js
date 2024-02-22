import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import OrderCard from '../components/OrderCard'
import { widthPercentageToDP } from 'react-native-responsive-screen'

export default function OrdersScreen() {
  return (
    <SafeAreaView className="flex-1 flex-col items-center justify-center">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom:widthPercentageToDP('20%')}}
      >
      <Text className="font-bold text-xl text-center items-center justify-center">My Orders</Text>
        <OrderCard />
        <OrderCard />
        <OrderCard />

      </ScrollView>

    </SafeAreaView>
  )
}