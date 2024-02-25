import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Categories from '../components/Categories';
import * as Icon from "react-native-feather";
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';



export default function HomeScreen() {
    const getData = async()=>{
        const token = await AsyncStorage.getItem("token")
        console.log("this",token);
        axios.post("http://0.0.0.0:5001/users/get-user",{token}).then((res) => {
            console.log(res.data)
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
                <Text className="text-lg"> Hi, Welcome</Text>
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