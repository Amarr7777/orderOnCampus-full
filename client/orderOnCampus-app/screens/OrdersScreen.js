import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import { widthPercentageToDP } from 'react-native-responsive-screen'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../slices/AuthSlice'

export default function OrdersScreen() {
  const [orders, setOrders] = useState([])
  const user = useSelector(selectToken)
  // const userId = user.data._id
  // // const getData = async () => {
  // //   await axios.get(`http://0.0.0.0:5001/users/${userId}/orders`).then((res) => {
  // //     console.log(res.data);
  // //   }).catch((err) => { console.log('Error', err) })
  // // }
  // // useEffect(() => {
  // //   getData();
  // // }, [])

  return (
    <SafeAreaView className="flex-1 flex-col items-center justify-center">
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: widthPercentageToDP('20%') }}
      >
        <Text className="font-bold text-xl text-center items-center justify-center">My Orders</Text>
        {
          user.data.orders.map((canteen, index) => {
            return (
              <OrderCard />
            )
          })
        }
      </ScrollView>

    </SafeAreaView>
  )
}