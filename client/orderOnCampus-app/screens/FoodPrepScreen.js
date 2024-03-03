import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { selectCanteen } from '../slices/canteenSlice';
import { selectToken } from '../slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, selectCartItems, selectCartTotal } from '../slices/CartSlice';
import axios from 'axios';

export default function FoodPrepScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const canteen = useSelector(selectCanteen);
    const token = useSelector(selectToken);
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const status = 'placed'

    const itemIds = items.map(item => item._id);

    console.log("userID",token.data._id)
    console.log("canteenID",canteen._id)
    console.log("items",itemIds)
    console.log("Total",total)
    // console.log()

    const postData = async()=>{
        const orderData = {
            user: token.data._id,
            canteen: canteen._id,
            items: itemIds, 
            totalPrice: total,
            status: 'Placed' 
          };
        axios.post("http://0.0.0.0:5001/users/place-order",orderData).then(()=>{
            // alert('Your Order has been placed!')
        }).catch(err => console.log(err))
    }
    
    useEffect(()=>{
        postData()
        setTimeout(()=>{
            navigation.navigate('Tab');
            dispatch(emptyCart())

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