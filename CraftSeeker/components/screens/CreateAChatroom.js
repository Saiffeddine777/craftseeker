import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { io } from 'socket.io-client'
import { Button } from 'react-native-elements'

const socket  = io("http://192.168.1.11:5000")


export default function CreateAChatroom() {
  const [workerId ,setWorkerId] = useState("")
  const [clientId ,setClientId] = useState("")
  const createChatRoom =()=>{
    socket.emit("createaroom",{
       workerId :"20cf2af875f621f93dd91e52ff97942bfbb03ccd8cea6d58258121c9774cad77",
       clientId :"edb2a3b8ae82686f7ad175db0d25bbbfdec77360b79cd02b3ad3e2c7a75f44f1"
    })
  }

  return (
    <View>
      <Button title ="Create a Room" onPress={createChatRoom}></Button>
    </View>
  )
}

const styles= StyleSheet.create({
   
})