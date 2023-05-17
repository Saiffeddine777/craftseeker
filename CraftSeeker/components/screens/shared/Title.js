import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = ({children,style}) => {
  return (
      <Text style={[styles.title,style]}>{children}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
    title: {
        color: '#0386D0',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: '15%',
        marginRight: '15%',
        textAlign: 'center',
      },
})