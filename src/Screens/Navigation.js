import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductScreens from './ProductScreens';
import Add from './Add';

const Navigation = () => {
    const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ProductScreens} />
          <Stack.Screen name="Add" component={Add} />
        </Stack.Navigator>
        </NavigationContainer>
  )
}

export default Navigation

const styles = StyleSheet.create({})