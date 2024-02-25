import { View, Text, ImageBackground, TouchableOpacity, TextInput, SafeAreaView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import * as Icon from "react-native-feather";


export default function RegisterScreen() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [nameVerify, setNameVerify] = useState(false);
    const [emailVerify, setEmailVerify] = useState(false);
    const [phoneVerify, setPhoneVerify] = useState(false);
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [cpasswordVerify, setCpasswordVerify] = useState(false);
    const [user,setUser] =useState(false)



    const handleName = (e) => {
        const value = e;
        setName(value);
        setNameVerify(false);
        const regex = /^[a-zA-Z\s]{3,}$/;
        if (regex.test(value)) {
            setNameVerify(true);
        }
    }
    const handleEmail = (e) => {
        const value = e;
        setEmail(value);
        setEmailVerify(false);
        const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
        if (regex.test(value)) {
            setEmailVerify(true);
        }
    }
    const handlePhone = (e) => {

    }
    const handlePassword = (e) => {
        const value = e;
        setPassword(value);
        setPasswordVerify(false);
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (regex.test(value)) {
            setPasswordVerify(true);
        }
    }
    const handleCpassword = (e) => {
        const value = e;
        setCpassword(value);
        setCpasswordVerify(false);
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (password === value && regex.test(value)) {
            setCpasswordVerify(true);
        }
    }

    const handleRegister = () => {
        if (!nameVerify || !emailVerify || !passwordVerify || !cpasswordVerify) {
            alert("fill all the mandatory Fields");
        } else {
            setUser(false)
            const userData = {
                name: name,
                email,
                phone,
                password,
            }
            axios.post("http://0.0.0.0:5001/users/register", userData).then((res) => {

                if (res.data === "exists") {
                    console.log("inside if ")
                    setUser(true)
                    // alert("Email Already in use")
                } else {
                    setName('')
                    setEmail('')
                    setPassword('')
                    setCpassword('')
                    console.log("outside if ")
                    navigation.navigate('Login');
                }
            }).catch((e) => console.log(`error is ${e}`));
        }
    }

    return (
        <View className='flex-1 items-center justify-start'>
            <View>
                <Image
                    style={{ width: wp('100%'), height: wp('80%') }}
                    source={require('../assets/logIn.png')} />
            </View>
            <View className='flex gap-2'>
                <View className={`flex flex-row justify-between items-center px-2 rounded-md border ${name.length < 1 ? 'border-green-900' : nameVerify ? 'border-green-900' : 'border-red-600'}`}
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} >
                    <TextInput placeholder='Name'
                        onChangeText={(text) => handleName(text)}
                        className=" py-5 pr-20  rounded-md text-left"
                    />
                    {name.length < 1 ? null : nameVerify ? (
                        // <FaCheckCircle className="m-2 text-green-900" />
                        <Icon.CheckCircle stroke="#2A4834" />
                    ) : (
                        // <FaTimesCircle className="m-2 text-red-700 " />
                        <Icon.AlertCircle stroke="#b91c1c" />
                    )}
                </View>

                <View className={`flex flex-row justify-between items-center px-2 rounded-md border ${email.length < 1 ? 'border-green-900' : emailVerify ? 'border-green-900' : 'border-red-600'}`}
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} >

                    <TextInput placeholder='Email'
                        keyboardType="email-address"
                        onChangeText={(text) => handleEmail(text)}
                        className=" py-5 pr-20  rounded-md text-left" />
                    {email.length < 1 ? null : emailVerify ? (
                        // <FaCheckCircle className="m-2 text-green-900" />
                        <Icon.CheckCircle stroke="#2A4834" />
                    ) : (
                        // <FaTimesCircle className="m-2 text-red-700 " />
                        <Icon.AlertCircle stroke="#b91c1c" />
                    )}
                </View>
                {!user ? null :(
                    <View style={{ minWidth: wp('80%'), maxWidth: wp('80%') }}>
                        <Text className="font-light text-sm text-red-700">
                            User already exists, please log in instead.
                        </Text>
                    </View>

                )}
                <View className={`flex flex-row justify-between items-center px-2 rounded-md border ${phone.length < 1 ? 'border-green-900' : phoneVerify ? 'border-green-900' : 'border-red-600'}`}
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} >
                    <TextInput placeholder='Phone'
                        keyboardType="number-pad"
                        onChangeText={(text) => handlePhone(text)}
                        className=" py-5 pr-20  rounded-md text-left"
                    />
                    {phone.length < 1 ? null : phoneVerify ? (
                        // <FaCheckCircle className="m-2 text-green-900" />
                        <Icon.CheckCircle stroke="#2A4834" />
                    ) : (
                        // <FaTimesCircle className="m-2 text-red-700 " />
                        <Icon.AlertCircle stroke="#b91c1c" />
                    )}
                </View>
                <View className={`flex flex-row justify-between items-center px-2 rounded-md border ${password.length < 1 ? 'border-green-900' : passwordVerify ? 'border-green-900' : 'border-red-600'}`}
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} >
                    <TextInput placeholder='password'
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => handlePassword(text)}
                        className=" py-5 pr-20 rounded-md text-left"
                    />
                    {password.length < 1 ? null : passwordVerify ? (
                        // <FaCheckCircle className="m-2 text-green-900" />
                        <Icon.CheckCircle stroke="#2A4834" />
                    ) : (
                        // <FaTimesCircle className="m-2 text-red-700 " />
                        <Icon.AlertCircle stroke="#b91c1c" />
                    )}
                </View>
                {password.length < 1 ? null : passwordVerify ? null : (
                    <View style={{ minWidth: wp('80%'), maxWidth: wp('80%') }}>
                        <Text className="font-light text-sm text-red-700">
                            Ensure password contains minimum 8 characters with at least one
                            number
                        </Text>
                    </View>

                )}
                <View className={`flex flex-row justify-between items-center px-2 rounded-md border ${cpassword.length < 1 ? 'border-green-900' : cpasswordVerify ? 'border-green-900' : 'border-red-600'}`}
                    style={{ minWidth: wp('80%'), maxWidth: wp('80%') }} >
                    <TextInput placeholder='Confirm  Password'
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => handleCpassword(text)}
                        className=" py-5 pr-2  rounded-md text-left"
                    />
                    {cpassword.length < 1 ? null : cpasswordVerify ? (
                        // <FaCheckCircle className="m-2 text-green-900" />
                        <Icon.CheckCircle stroke="#2A4834" />
                    ) : (
                        // <FaTimesCircle className="m-2 text-red-700 " />
                        <Icon.AlertCircle stroke="#b91c1c" />
                    )}
                </View>


            </View>

            <View className='flex-1 absolute'
                style={{ bottom: wp('20%'), width: wp("80%") }}
            >
                <View className='flex-row px-2 py-2'>
                    <Text>Already a member?</Text>
                    <Pressable
                        onPress={() => navigation.navigate('Login')}
                    ><Text className='text-green-900 cursor-pointer'> Login</Text></Pressable>
                </View>
                <TouchableOpacity className="rounded-full py-5 px-20 bg-green-900"
                    style={{ width: wp("80%") }}
                    onPress={() =>
                        handleRegister()
                    }
                >
                    <Text className="text-white text-center font-extrabold text-lg">Register</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}