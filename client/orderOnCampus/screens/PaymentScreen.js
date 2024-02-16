import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { emptyCart } from '../slices/CartSlice';
import { useDispatch } from 'react-redux';


export default function PaymentScreen({ route }) {
    const { orderTotal } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <SafeAreaView className='flex-1 items-center'>
            < StatusBar style='dark' />
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="absolute left-4 bg-gray-50 rounded-full shadow p-2 z-50"
                style={{ top: hp("5%") }}
            >
                <Icon.ArrowLeft height="20" width="20" stroke="#2A4834" strokeWidth={3} />
            </TouchableOpacity>
            <View style={{ marginTop: hp('5%') }}>
                <View className='flex-row mt-5 bg-white py-5 px-2 rounded-lg items-center justify-between'
                    style={{ width: wp('90%') }}>
                    <View className="flex-row items-center">
                        <Image
                            className="rounded-lg mr-2 "
                            source={require('../assets/restaurant.jpg')}
                            style={{ width: hp('5%'), height: hp('5%') }}
                        />
                        <Text className='text-black'>UPI app</Text>
                    </View>
                    <TouchableOpacity>
                        <Icon.ChevronRight stroke='black' />
                    </TouchableOpacity>
                </View>
                <View className='flex-row mt-5 bg-white py-5 px-2 rounded-lg items-center justify-between'
                    style={{ width: wp('90%') }}>
                    <View className="flex-row items-center">
                        <Image
                            className="rounded-lg mr-2"
                            source={require('../assets/restaurant.jpg')}
                            style={{ width: hp('5%'), height: hp('5%') }}
                        />
                        <Text className='text-black'>Credit/Debit Card</Text>
                    </View>
                    <TouchableOpacity>
                        <Icon.ChevronRight stroke='black' />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='absolute flex-col items-center justify-between rounded-lg'
                style={{ bottom: wp('10%'), width: wp('100%') }}>
                <View className="flex-row items-center justify-between px-3 py-2 w-full"
                //   style={{width: wp('90%') }}
                >
                    <Text className="text--black font-extrabold">Order Total</Text>
                    <Text className="text-black font-extrabold">₹{orderTotal}</Text>
                </View>
                <TouchableOpacity
                    className="w-full  rounded-full p-5 bg-green-950"
                    style={{ width: wp('90%') }}
                    onPress={() => {
                        navigation.navigate('FoodPrep');
                        dispatch(emptyCart())
                    }}
                >
                    <Text className="text-white text-center font-extrabold text-lg">Place Order</Text>

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}