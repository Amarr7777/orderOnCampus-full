import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import CanteenScreen from '../screens/CanteenScreen';
import TabNavigation from './tabNavigation';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import OfferScreen from '../screens/OfferScreen';
import CartIcon from '../components/CartIcon';
import PaymentScreen from '../screens/PaymentScreen';
import FoodPrepScreen from '../screens/FoodPrepScreen';
import RegisterScreen from '../screens/RegisterScreen';

export default function navigation() {
  return (

    <NavigationContainer>
      <Stack.Navigator screenOptions={
        {
          headerShown: false
        }
      }>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Tab" component={TabNavigation} />
        <Stack.Screen name="Offers" component={OfferScreen} />
        <Stack.Screen name="Canteen" component={CanteenScreen} />
        <Stack.Screen name="Cart" options={{ presentation: 'modal' }} component={CartScreen} />
        <Stack.Screen name="Payment" options={{ presentation: 'fullScreenModal' }} component={PaymentScreen} />
        <Stack.Screen name="FoodPrep" options={{ presentation: 'fullScreenModal' }} component={FoodPrepScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}