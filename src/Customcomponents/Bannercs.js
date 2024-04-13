import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Bannercs = ({uri}) => {
  return (
    <View style = {styles.khung}>
      <Image source={{uri:uri}} style={{width:'100%',height:150}}/>
    </View>
  )
}

export default Bannercs

const styles = StyleSheet.create({
    khung:{
        margin:10,
        borderRadius: 10,
        padding:10,
        borderColor: 'red',
        borderWidth: 2,
        width: '100%',
    }
 
})