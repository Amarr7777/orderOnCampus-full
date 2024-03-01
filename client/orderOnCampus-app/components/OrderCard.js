import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import * as Icon from "react-native-feather";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import OrderItems from './OrderItems';

export default function OrderCard({ data }) {
    console.log("order Card", data)
    const [canteenName, setCanteenName] = useState("")
    const [canteenLoc, setCanteenLoc] = useState("")
    const [commonItems, setCommonItems] = useState([])

    const getData = async () => {
        await axios.get(`http://0.0.0.0:5001/canteens/${data.canteen}/get-canteen`).then((res) => {
            console.log("NEW ", res.data.data.menu)
            setCanteenName(res.data.data.name);
            setCanteenLoc(res.data.data.location);

            const common = res.data.data.menu.filter(item => data.items.includes(item));
            const itemCounts = {};
            data.items.forEach(item => {
                itemCounts[item] = (itemCounts[item] || 0) + 1;
            });

            setCommonItems(common.map(item => ({ id: item, count: itemCounts[item] })));
        }).catch((err) => { console.log('Error', err) })
    }
    useEffect(() => {
        getData();
    }, [])

    const navigation = useNavigation();
    return (
        <View className="flex-col shadow bg-white rounded-lg "
            style={{ width: wp('90%'), marginVertical: wp("2%") }}
        >
            <View className="flex-col p-5 ">
                <View className="flex-row justify-between">
                    <View className="flex-row">
                        <Image
                            className="rounded-lg"
                            source={require('../assets/restaurant.jpg')}
                            style={{ width: hp('10%'), height: hp('10%') }}
                        />
                        <View className="flex-col">
                            <Text className="font-semi text-lg px-2 ">{canteenName}</Text>
                            <Text className="font-semi text-sm px-2 ">{canteenLoc}</Text>
                        </View>
                    </View>
                    <View>
                        <Text className="text-green-900 text-md font-bold">₹ {data.totalPrice}</Text>
                    </View>
                </View>
            </View>
            {
                commonItems.map((item, index) => (
                    <OrderItems key={index} food={item} />
                ))
            }
            <View className="p-5 flex-row space-x-2 items-end justify-end" >
                <View className="flex-row space-x-2 items-center p-2 rounded bg-green-900" >
                    {/* <Icon.Sliders stroke='white' width={wp('4%')} /> */}
                    <Text className="text-white" >{data.status}</Text>
                </View>
            </View>
        </View>
    )
}