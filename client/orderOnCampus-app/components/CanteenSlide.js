import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react';
import CanteenCard from './CanteenCard';
import { allCanteens } from '../constants';
import * as Icon from "react-native-feather";
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen';


export default function CanteenSlide({ activeCategory, filteredData }) {
  const windowHeight = Dimensions.get('window').height;
  const allCategory = allCanteens.restaurants.filter(canteen => canteen.categories && canteen.categories.includes('all'));
  const breakfast = allCanteens.restaurants.filter(canteen => canteen.categories && canteen.categories.includes('breakfast'));
  const lunch = allCanteens.restaurants.filter(canteen => canteen.categories && canteen.categories.includes('lunch'));
  const snacks = allCanteens.restaurants.filter(canteen => canteen.categories && canteen.categories.includes('snacks'));




  let renderedCategory;
  let Category;
  if (activeCategory === 1) {
    Category = "Campus Canteens"
    renderedCategory = [allCategory].map((canteen, index) => {
      return (
        <CanteenCard key={index} canteen={canteen} />
      )
    })
  } else if (activeCategory === 2) {
    Category = "Breakfast"
    renderedCategory = [breakfast].map((canteen, index) => {
      return (
        <CanteenCard key={index} canteen={canteen} />
      )
    })
  } else if (activeCategory === 3) {
    Category = "Lunch"
    renderedCategory = [lunch].map((canteen, index) => {
      return (
        <CanteenCard key={index} canteen={canteen} />
      )
    })
  } else if (activeCategory === 4) {
    Category = "Snacks"
    renderedCategory = [snacks].map((canteen, index) => {
      return (
        <CanteenCard key={index} canteen={canteen} />
      )
    })
  } else {
    if (filteredData.length > 0) {
      Category = "Campus Canteens"
      renderedCategory = [filteredData].map((canteen, index) => {
        return (
          <CanteenCard key={index} canteen={canteen} />
        )
      })
    } else {
      Category = "Campus Canteens"
      renderedCategory = (
        <View className="flex-1 items-center justify-center content-center">
          <Icon.EyeOff stroke='gray' width={wp('100%')} height={wp('80%')} />
          <Text className="text-lg text-gray-400">No results </Text>
        </View>
      );
    }
  }

  return (
    <>
      <View>
        <View>
          <Text className="text-xl text-left font-bold text-black-700 pb-5 pt-10 ">
            {Category}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="overflow-visible "
          >
            <View className="flex-row items-center justify-center"
            style={{marginBottom: hp('2%')}}>
              {renderedCategory}
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  )
}

