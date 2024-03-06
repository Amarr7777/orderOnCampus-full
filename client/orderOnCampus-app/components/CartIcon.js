import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../slices/CartSlice';


export default function CartIcon() {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  if (!cartItems.length) return null;
  return (
    <View className="absolute z-50 w-full"
      style={{ bottom: hp('2%') }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        className=" flex-row flex-1 items-center justify-between bg-green-950 p-5 rounded-full mx-5 shadow-lg"
      >
        <View className='rounded-full p-1 py-2' style={{ backgroundColor: 'rgba(225,225,225,0.3)' }}>
          <Text className="font-extrabold text-white text-lg bg-gray rounded-full px-3">{cartItems.length}</Text>
        </View>
        <Text className="font-extrabold text-lg text-white">View Cart</Text>
        <Text className="font-extrabold text-white text-lg">₹{cartTotal}</Text>
      </TouchableOpacity>
    </View>

  )
}