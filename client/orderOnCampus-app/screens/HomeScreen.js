import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Categories from '../components/Categories';
import * as Icon from "react-native-feather";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { setToken } from '../slices/AuthSlice';
import { useDispatch } from 'react-redux';



export default function HomeScreen() {
    const dispatch = useDispatch()
    const[name,setName] = useState("")
    const getData = async()=>{
        const token = await AsyncStorage.getItem("token")
        console.log("this",token);
        axios.post("http://0.0.0.0:5001/users/get-user",{token}).then((res) => {
            setName(res.data.data.name)
            // dispatch(setToken({ name: res.data.data.name, email: res.data.data.email, _id: res.data.data._id }));
            dispatch(setToken({ data: res.data.data }));
        }).catch((err) => console.error(err))
    }
    const navigation = useNavigation();
    useEffect(() => {
        getData();
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='dark' />
            <View className="flex-row justify-between pt-2">
                <Text className="text-lg"> Hi, {name}</Text>
                <Icon.ShoppingCart onPress={() => navigation.navigate('Cart')} height="20" width="20" stroke="black" className="px-5" />
            </View>
            <Text className="mt-5 font-bold text-left text-4xl"> Cut The Wait.</Text>
            <Text className="font-bold text-left text-4xl"> Enjoy your plate</Text>
            <Categories />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 5,
    },
});