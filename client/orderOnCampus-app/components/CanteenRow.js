import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native';

export default function CanteenRow({ canteen }) {
  const navigation = useNavigation();
  return (
    <>
            <TouchableOpacity className="flex-col items-center p-5 shadow bg-white rounded-lg mb-5 mt-2 "
              onPress={() => navigation.navigate('Canteen', { ...canteen })}
            >
              <Image
                className="rounded-lg"
                source={require('../assets/restaurant.jpg')}
                style={{ width: hp('40%'), height: hp('20%') }}
              />
              <View className="flex flex-1">
                <Text className="font-bold text-xl ml-4">{canteen.name}</Text>
              </View>
            </TouchableOpacity>
    </>
  )
}