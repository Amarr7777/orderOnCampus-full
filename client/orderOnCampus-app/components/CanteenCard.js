import { Text, View, StyleSheet, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

export default function CanteenCard({canteen}) {
  // const [allCanteens,setAllCanteens] = useState([])
  const navigation = useNavigation();
//   const getCanteens = async()=>{
//     await axios.get('http://0.0.0.0:5001/canteens/get-canteens')
//     .then((res) => {
//       setAllCanteens(res.data.data);
//     })
//     .catch(err => console.log(err))
//   }
//   useEffect(() => {
//     getCanteens()
//     console.log(allCanteens)
    
// }, [])

  return (
    <>
    {
      canteen.map((canteen,index)=>{
        return(
          <TouchableWithoutFeedback
          key={index}
            onPress={()=>{ navigation.navigate('Canteen',{...allCanteens})}}>
            <View className="items-center w-fit h-fit justify-center p-10 rounded-xl mx-5" style={styles.container}>
              <Image
                source={canteen.image}
                style={{ width: hp('30%'), height: hp('30%') }}
                className="rounded-3xl p-5 mb-2" />
              <Text className="text-white">{canteen.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        )
      })
    }
    </>        
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2A4834",
    shadowColor: 'rgba(42, 52, 72, 0.9)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 5,
    shadowRadius: 10,
    elevation: 5,
  }

})