import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'

export default function FoodPrepScreen() {
    const navigation = useNavigation();
    
    useEffect(()=>{

        setTimeout(()=>{
            navigation.navigate('Tab');
        },1500)
    },[])
    return (
       
            <ImageBackground 
            className = 'flex-1 items-center justify-center'
            width={wp('100%')}
            height={hp('100%')}
            source={require('../assets/foodPrep.gif')}
            >
            <Text className="text-green-950 font-bold text-3xl">Wohooo...</Text>
            <Text>Order Placed you'll be notified once your food's ready</Text>
            <View className='absolute flex-col items-center justify-between rounded-lg'
                style={{ bottom: wp('10%'), width: wp('100%') }}>
                {/* <TouchableOpacity
                    className="w-full  rounded-full p-5 bg-green-950"
                    style={{ width: wp('90%') }}
                    onPress={()=> navigation.navigate('Tab')}
                >
                    <Text className="text-white text-center font-extrabold text-lg">Back To Home</Text>

                </TouchableOpacity> */}
            </View>
            </ImageBackground>
    )
}