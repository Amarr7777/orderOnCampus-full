import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP } from 'react-native-responsive-screen';


export default function OfferScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView className = "flex-1 items-center content-center justify-center">
            <TouchableOpacity
                onPress={() => navigation.goBack()}

                className="absolute top-8 left-4 bg-gray-50 rounded-full shadow p-2 z-50"
            >
                <Icon.ArrowLeft height="20" width="20" stroke="#2A4834" strokeWidth={3} />
            </TouchableOpacity>
            <Icon.ShoppingBag stroke='gray' width={widthPercentageToDP('50%')} height={widthPercentageToDP('50%')}/>
            <Text className="text-gray-600 p-5">No Offers or Promos</Text>
        </SafeAreaView>
    )
}