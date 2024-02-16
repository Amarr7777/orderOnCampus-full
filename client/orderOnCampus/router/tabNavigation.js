import React from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import userScreen from '../screens/UserScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrdersScreen from '../screens/OrdersScreen';
import * as Icon from "react-native-feather";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



const TabNavigation = () => {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();
    const screenOptions = {
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: wp('20%'),
            elevation: 0,
            bckground: '#abdb44',
        }
    }
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity className="p-0 rounded-xl"
                                onPress={() => navigation.navigate('Home')}
                                style={focused ? { backgroundColor: 'rgba(42, 72, 52, 0.5)' } : { backgroundColor: 'white' }}>
                                <View className="p-2 rounded-xl">
                                    <Icon.Home stroke={focused ? "#2A4834" : "#000"} />
                                </View>
                            </TouchableOpacity>
                        )
                    }

                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity className="p-0 rounded-xl"
                                onPress={() => navigation.navigate('Favorites')}
                                style={focused ? { backgroundColor: 'rgba(42, 72, 52, 0.5)' } : { backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                                <View className="p-2 rounded-xl">
                                    <Icon.Heart stroke={focused ? "#2A4834" : "#000"} />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }} />
            <Tab.Screen name="Orders" component={OrdersScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity className="p-0 rounded-xl"
                                onPress={() => navigation.navigate('Orders')}
                                style={focused ? { backgroundColor: 'rgba(42, 72, 52, 0.5)' } : { backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                                <View className="p-2 rounded-xl">
                                    <Icon.RotateCcw stroke={focused ? "#2A4834" : "#000"} />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }} />
            <Tab.Screen name="User" component={userScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TouchableOpacity className="p-0 rounded-xl"
                                onPress={() => navigation.navigate('User')}
                                style={focused ? { backgroundColor: 'rgba(42, 72, 52, 0.5)' } : { backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                                <View className="p-2 rounded-xl">
                                    <Icon.User stroke={focused ? "#2A4834" : "#000"} />
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }} />
        </Tab.Navigator>
    );
}

export default TabNavigation;
