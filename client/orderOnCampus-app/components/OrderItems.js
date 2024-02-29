import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Icon from "react-native-feather";
import axios from 'axios';

export default function OrderItems({food}) {
    console.log("food items", food)
    const [name,setName] = useState("")
    const getData = async () => {
        await axios.get(`http://0.0.0.0:5001/canteens/${food.id}/get-item`).then((res) => {
            setName(res.data.data.name);
        }).catch((err) => { console.log('Error', err) })
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <View className="bg-slate-200">
            <View className="flex-row items-center p-2">
                <Icon.Coffee stroke='rgb(20 83 45)' />
                    <Text className="pl-2 font-bold text-lg text-green-950">{food.count}X</Text>
                    <Text className="font-semi text-lg  text-green-950">{name}</Text>
            </View>
        </View>
    )
}