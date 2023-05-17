import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'

const Background = ({children}) => {
  return (
    <View style={styles.OuterContainer}>
        <View style={styles.InnerContainer} >
          <StatusBar/>
        {children}
      </View>
    </View>
  )
}

export default Background

const styles = StyleSheet.create({
    OuterContainer: {
        flex: 1,
        backgroundColor: "#4a90e2",
        alignItems: "center",
        justifyContent: "center"
      },
      InnerContainer: {
        display: "flex",
        flex: 0.99,
        flexDirection: 'column',
        width: "96%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: 13,
        alignItems: "center",
        overflow: 'hidden',
        justifyContent: "space-around"
      },
    
})