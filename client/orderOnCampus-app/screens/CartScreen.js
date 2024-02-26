import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { selectCanteen } from '../slices/canteenSlice';
import { removeFromCart, selectCartItems, selectCartTotal } from '../slices/CartSlice';


export default function CartScreen() {
    const navigation = useNavigation();
    const canteen = useSelector(selectCanteen);
    const [groupedItems, setGroupedItems] = useState({})
    const cartItems = useSelector(selectCartItems)
    const cartTotal = useSelector(selectCartTotal)
    const dispatch = useDispatch()
    const orderTotal = cartTotal + 2;

    useEffect(() => {
        const items = cartItems.reduce((group, item) => {
            if (group[item._id]) {
                group[item._id].push(item);
            } else {
                group[item._id] = [item];
            }
            return group;
        }, {})
        setGroupedItems(items);
    }, [cartItems])
    if (!cartItems.length)
        return (

            <View className="flex-1 items-center justify-center"
                style={{ backgroundColor: 'rgba(42, 72, 52, 1)', minHeight: hp('100%') }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}

                    className="absolute top-8 left-4 bg-gray-50 rounded-full shadow p-2 z-50"
                >
                    <Icon.ArrowLeft height="20" width="20" stroke="#2A4834" strokeWidth={3} />
                </TouchableOpacity>
                <Icon.ShoppingBag stroke='white' width={wp('80%')} height={wp('80%')} strokeWidth={1} />
                <Text className="text-white font-semibold">Oops :(</Text>
                <Text className="text-white font-semibold">your cart is empty</Text>
            </View>
        );
    else
        return (
            <View style={{ backgroundColor: 'rgba(42, 72, 52, 1)' }}>
                < StatusBar style='light' />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}

                    className="absolute top-8 left-4 bg-gray-50 rounded-full shadow p-2 z-50"
                >
                    <Icon.ArrowLeft height="20" width="20" stroke="#2A4834" strokeWidth={3} />
                </TouchableOpacity>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: 'rgba(42, 72, 52, 1)', height: hp('100%') }}
                >
                    <Text className="text-center text-white text-xl font-extrabold pt-8">Your Cart</Text>
                    <Text className="text-center text-white font-extrabold mb-3 ">{canteen.name}</Text>
                    {
                        Object.entries(groupedItems).map(([key, items]) => {
                            let dish = items[0];
                            return (
                                <View key={key} className="bg-white flex-row justify-between shadow-lg p-3 items-center rounded-lg mx-3 mt-2">
                                    <View key={key} className="flex-row items-center" >
                                        <Text className="text-lg font-extrabold px-2">{items.length} X</Text>
                                        <Image source={dish.image} className="h-10 w-10 rounded-full" />
                                        <Text className="text-lg px-2">{dish.name}</Text>
                                    </View>
                                    <View className="flex-row items-center">
                                        <Text className="text-lg  px-2">$ {dish.price}</Text>
                                        <TouchableOpacity
                                            className="bg-green-900 rounded-full p-1 z-10"
                                            onPress={() => dispatch(removeFromCart({ _id: dish._id }))}
                                        >
                                            <Icon.Minus height='20' width='20' stroke='white' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
                <View className="absolute w-full bottom-0 bg-white p-6 pb-12 px-8 rounded-t-3xl space-y-4 "
                    style={{ width: wp('100%'), height: wp('70%') }}
                >
                    <View className="flex-row items-center justify-between">
                        <Text className="text-green-950">Subtotal</Text>
                        <Text className="text-green-950 text-left">₹{cartTotal}</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-green-950 ">Processing Charge</Text>
                        <Text className="text-green-950  text-left">₹2</Text>
                    </View>
                    <View className="flex-row items-center justify-between ">
                        <Text className="text-green-950 font-extrabold">Order Total</Text>
                        <Text className="text-green-950 font-extrabold">₹{orderTotal}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Payment', { orderTotal })}
                        className="w-full  rounded-full p-5 bg-slate-300"
                    >
                        <Text className="text-green-950 text-center font-extrabold text-lg">Check Out</Text>

                    </TouchableOpacity>
                </View>
            </View>
        )
}