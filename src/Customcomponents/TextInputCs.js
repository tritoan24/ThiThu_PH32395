import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const TextInputCs = (props) => {
  return (
    <View style = {styles.container}>
      <TextInput {...props}
        style = {styles.input}
      />
    </View>
  )
}

export default TextInputCs

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 17,
        elevation: 5,
        width:'100%'
      },
})