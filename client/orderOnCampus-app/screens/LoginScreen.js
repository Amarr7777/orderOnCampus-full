import { View, Text, ImageBackground, TouchableOpacity, TextInput, SafeAreaView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [emailVerify, setEmailVerify] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);

    const handleEmail = (e) => {
        const value = e;
        setEmail(value);
        setEmailVerify(false);
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(value)) {
            setEmailVerify(true);
        }
    };

    const handlePassword = (e) => {
        const value = e;
        setPassword(value);
        setPasswordVerify(false);
        if (value.length > 0) {
            setPasswordVerify(true);
        }
    };

    const handleLogin = () => {
        if (!emailVerify || !passwordVerify) {
            alert("Enter credentials")
        } else {
            const userData = {
                email,
                password,
            }
            axios.post("http://0.0.0.0:5001/login", userData).then((res) => {
                setInvalidUser(false);
                setIncorrectPassword(false);
                if (res.data === "Success") {
                    navigation.navigate("Tab");
                } else if (res.data === "Incorrect password") {
                    setIncorrectPassword(true)
                    setPassword("");
                    // alert("Wrong Password!");
                } else if (res.data === "No user found") {
                    setEmail("");
                    setInvalidUser(true);
                    // alert("No user found with this email id");
                } else {
                    alert("An error occurred. Please try again later.");
                    setEmail("")
                    setPassword("")
                }
            }).catch((err) => {
                console.log(err);
                alert("An error occurred. Please try again later.");
            })
        }

    }

    return (
        <View className='flex-1 items-center'>
            <View>
                <Image
                    style={{ width: wp('100%'), height: wp('100%') }}
                    className=""
                    source={require('../assets/logIn.png')} />
            </View>
            <View className='flex gap-2'>
                <View 
                style={{ minWidth: wp('80%'), maxWidth: wp('80%') }}
                className={`flex flex-row justify-between items-center px-2 rounded-md border ${!invalidUser ? 'border-green-900' : 'border-red-600'}`}>    
                <TextInput placeholder='Email or phone'
                    keyboardType="email-address"
                    onChangeText={(e) => handleEmail(e)}
                    className=" py-5 pr-20 rounded-md text-left"
                     />
                </View>
                {!invalidUser ? null :(
                    <View style={{ minWidth: wp('80%'), maxWidth: wp('80%') }}>
                        <Text className="font-light text-sm text-red-700">
                            User not found, please register instead.
                        </Text>
                    </View>

                )}
                 <View 
                style={{ minWidth: wp('80%'), maxWidth: wp('80%') }}
                className={`flex flex-row justify-between items-center px-2 rounded-md border ${!incorrectPassword ? 'border-green-900' : 'border-red-600'}`}>
                <TextInput placeholder='password'
                    secureTextEntry={!showPassword}
                    onChangeText={(e) => handlePassword(e)}
                    className="py-5 pr-20 rounded-md text-left"/>
                </View>
                {!incorrectPassword ? null :(
                    <View style={{ minWidth: wp('80%'), maxWidth: wp('80%') }}>
                        <Text className="font-light text-sm text-red-700">
                            incorrect password
                        </Text>
                    </View>

                )}

            </View>
            <View className='flex-1 absolute'
                style={{ bottom: wp('20%'), width: wp("80%") }}
            >
                <View className='flex-row px-2 py-2'>
                    <Text>Not a member yet?</Text>
                    <Pressable
                        onPress={() => navigation.navigate('Register')}
                    ><Text className='text-green-900 cursor-pointer'> Register</Text></Pressable>
                </View>
                <TouchableOpacity className="rounded-full py-5 px-20 bg-green-900"
                    style={{ width: wp("80%") }}
                    onPress={handleLogin}
                >
                    <Text className="text-white text-center font-extrabold text-lg">Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}