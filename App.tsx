import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductScreens from './src/Screens/ProductScreens'
import store from './src/redux/store'
import { Provider } from 'react-redux'
import Navigation from './src/Screens/Navigation'
const App = () => {
  return (
   <Provider store={store}>
    <Navigation/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})