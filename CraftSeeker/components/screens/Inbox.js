import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Center } from 'native-base'
import { useEffect,useState } from 'react'
import axios from "axios"
import { TouchableOpacity } from 'react-native'
import Link from './Link'
import { useNavigation } from '@react-navigation/native'
export default function Inbox(props) {
   const navigation = useNavigation()
   const[chatrooms,setChatRooms] =useState([])
   const id = props.route.params.workersId || props.route.params.clientId

   useEffect(()=>{
    console.log(id,"Chat")
   },[])

   useEffect(()=>{
    axios.get(`http://${Link}:4000/chatboxes/getworkerinbox/${id}`)
    .then(res=>{
      if(!res.data[0]){
        console.log("messi")
        axios.get(`http://${Link}:4000/chatboxes/getclientinbox/${id}`)
        .then((result)=>{
          console.log(result.data)
          setChatRooms(result.data)
        })
        .catch(error=>{
          console.log(error)
        })
      } 
      console.log(res.data)
      setChatRooms(res.data)
    })
    .catch(err=>{
      console.log(err)})
   },[])
   console.log(chatrooms)

   const navigateToRoom=(receiverId,roomId,receiverName)=>{
      navigation.navigate("ChatWindow",{data:{roomId:roomId,receiverId:receiverId,id:id ,receiverName:receiverName}})
   }


  return (
    <View style={styles.container}>
    

      <View style ={styles.titleContainer}> 
      <Text style = {styles.title}>Chat Box</Text>
      </View>

      <View style= {styles.chatroomsContainer}>
        <ScrollView>
      {chatrooms.length===0?
      <View>
      <Text style = {styles.noMessages}>You have no messages</Text>
      </View>
      :
        chatrooms.map((e,i)=>{
          if(e.workersId){
            return(
            <TouchableOpacity key ={i} onPress={()=>navigateToRoom(e.workersId,e.roomId,e.workerFirstName)}>
            <View style ={styles.chatbox} >
             <Text style={styles.chatName}>{e.workerFirstName}</Text>
            </View>
            </TouchableOpacity>
            )
          }
          return(
            <TouchableOpacity key ={i} onPress={()=>navigateToRoom(e.clientId,e.roomId,e.clientFirstName)}>
            <View style ={styles.chatbox} >
             <Text style={styles.chatName}>{e.clientFirstName}</Text>
            </View>
            </TouchableOpacity>
        )})
      }
      </ScrollView>
      </View>
     
   
    </View>
  )
}


const styles = StyleSheet.create({
  titleContainer:{
    backgroundColor: '#CCE5FF',
    paddingleft : 20,
    paddingTop:10,
    paddingBottom:10,
    paddingRight :10,
    borderRadius :10,
    justifyContent :"flex-start",
    flexDirection:"row",
    alignItems : "center",
    width:325
  },
  noMessages:{
    fontSize:24,
    fontWeight :'bold',
    color :'#FF0000',
    textAlign : 'center',
    marginTop : 40,
  },
  container:{
     borderWidth: 17,
     height: 811,
     borderColor: "#036BB9",
     borderRadius: 10,
  },
  subContainer:{
     borderWidth: 17,
     height: 782,
     width: 382,
     borderColor: "white",
     borderRadius: 10,
     left: -2,
     top: -3,
     bottom: -3,
  },
  title:{
     textAlign: 'center',
     fontSize: 30,
     fontFamily: "Roboto",
     fontWeight:'bold',
     color: 'black',
     letterSpacing : 2,
     marginBottom :20,
     marginTop :20,
     marginLeft: 20,
  },
  chatroomsContainer:{
     flex: 1,
     marginTop: 20,
     borderRadius :10,
     borderColor : "#00A8B0",
     backgroundColor :  "#F5F5F5",
  },
  chatbox:{
     height: 100,
     marginBottom: 4,
     borderRadius: 10,
     backgroundColor: "#00A8B0",
     fontWeight: "bold",
     justifyContent:'center',

  },
  chatName:{
     fontSize: 20,
     marginLeft: 20,
     marginTop: 10,
     color: "white",
  },
})

