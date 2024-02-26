import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, selectCartItems } from '../slices/CartSlice';

export default function DishRow({ item }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems);
  const totalItems = cartItems.filter(cartItem => cartItem._id === item._id);
  const handleIncrease = () => {
    dispatch(addToCart({ ...item }))
  }
  const handleDecrease = () => {
    dispatch(removeFromCart({ _id: item._id }))
  }
  return (
    <View className="flex-row items-center p-5 shadow bg-white rounded-lg mb-5 mt-2 ">
      <Image
        className="rounded-lg"
        source={require('../assets/restaurant.jpg')}
        style={{ width: hp('10%'), height: hp('10%') }}
      />
      <View className="flex flex-1">
        <Text className="font-bold text-xl ml-4">{item.name}</Text>
        <Text className="text-gray-700 ml-4">{item.description}</Text>
        <Text className="text-green-900 font-semibold ml-4 pt-3">
          ₹ {item.price}
        </Text>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity className="bg-green-900 rounded-full p-1 mx-1 "
          onPress={handleDecrease}
          disabled={!totalItems.length}
        >
          <Icon.Minus height="20" width="20" stroke="white" strokeWidth={3} />
        </TouchableOpacity>
        <View className="rounded-full p-1 mx-1 ">
          <Text className="font-bold ">{totalItems.length}</Text>
        </View>
        <TouchableOpacity className="bg-green-900 rounded-full p-1 mx-1"
          onPress={handleIncrease}
        >
          <Icon.Plus height="20" width="20" stroke="white" strokeWidth={3} />
        </TouchableOpacity>
      </View>
    </View>
  )
}