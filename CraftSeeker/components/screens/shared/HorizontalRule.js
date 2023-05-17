import { StyleSheet, View } from 'react-native'
import React from 'react'

const HorizontalRule = (props) => {
  return (
    <View style={[styles.line, { marginVertical: props.marginVertical }]} />
  )
}

const styles = StyleSheet.create({
  line: {
    borderBottomColor: '#4a90e2',
    borderBottomWidth: 1,
  },
})

export default HorizontalRule
