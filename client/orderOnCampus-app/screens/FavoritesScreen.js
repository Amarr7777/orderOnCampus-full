import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import CanteenRow from '../components/CanteenRow';
import { allCanteens } from '../constants';
import { useSelector } from 'react-redux';
import { selectToken } from '../slices/AuthSlice';

export default function FavoritesScreen() {
  const [favoriteCanteens, setFavoriteCanteens] = useState([])
  const navigation = useNavigation()
  // Get the favorite canteens from
  const token = useSelector(selectToken);

  useEffect(() => {
    setFavoriteCanteens(token.data.favoriteCanteens)
    console.log('====================================');
    console.log(token.data.favoriteCanteens);
    console.log('====================================');
  }, [])

  // console.log("fav screen",token.data.favoriteCanteens)
  return (
    <SafeAreaView>
      <StatusBar style='Dark' />
      <ScrollView>
        <View className="relative ">
          <View className="py-10 px-5 bg-white">
            <Text className="font-bold text-3xl">Favorites</Text>
            {
              token.data.favoriteCanteens.map((canteen, index) => {
                return (
                  <CanteenRow key={index} canteen={canteen} />
                )
              })
            }
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}