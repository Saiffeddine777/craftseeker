import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useState } from 'react'
import axios from 'axios'
import { Button } from 'react-native-elements'
import { Alert } from 'react-native'
import { io } from 'socket.io-client'
import Link from '../Link'

export default function OffersScreen(props) {
  const [offers , setOffers] = useState([])
  const [workerId ,setWorkerId] = useState("")
  const [toggle ,setToggle] = useState(false)
  const socket = io(`http://${Link}:6000`)

  const id = props.route.params.id

  const handleToggle=()=>{
    setToggle(!toggle)
  } 

  useEffect(()=>{
    console.log(id)
  },[])
 
  useEffect(()=>{
   axios.get(`http://${Link}:4000/api/tasks/getworkeroffers/${id}`)
   .then((res)=>{
    setOffers(res.data)
    console.log(offers)
   })
   .catch(err=>{
    console.log(err)
   })
  },[toggle])
   

const handleAcceptance=(taskTitle,taskId,clientId,workersId)=>{
      axios.get(`http://${Link}:4000/chatboxes/getchatroombymembers/${workersId}/${clientId}`)
      .then((res)=>{
        if(res.data.length!==0){
          console.log("this is the result",res.data[0])
          socket.emit("receive",{
            uniqueId:res.data[0].roomId,
            senderId:workersId,
            receiverId:clientId,
            messageText: `task request ${taskTitle} with the id of ${taskId} has been accepted `,
            createdAt: Date.now()
          })
          console.log("message sent")}
        else if(res.data.length===0){
          socket.emit("createaroom",{
            workerId:workersId,
            clientId:clientId
          })
          let roomId= ""
          socket.on("getchatroom",({uniqueId})=>{
            console.log(uniqueId)
            roomId = uniqueId
            socket.emit("receive",{
              uniqueId:res.data[0].roomId,
              senderId:workersId,
              receiverId:clientId,
              messageText: `task request ${taskTitle} with the id of ${taskId} has been accepted `,
              createdAt: Date.now()
            })
            console.log("message sent")
          })
        }
      })
      .catch((err)=>{
           console.log(err)
      })
       axios.put(`http://${Link}:4000/api/tasks/changetaskstatus/${taskId}`,{taskStatus:"in Progress"})
       .then(results=>{
        console.log(results)
        Alert.alert("you have accepted this request")
       })
       .catch(err=>{
         console.log(err)
         Alert.alert("you have an error in the status change")
       })
       handleToggle()
  }


  const handleDenial =(taskTitle,taskId,clientId,workersId)=>{
    axios.get(`http://${Link}:4000/chatboxes/getchatroombymembers/${workersId}/${clientId}`)
      .then((res)=>{
        if(res.data.length!==0){
          console.log("this is the result",res.data[0])
          socket.emit("receive",{
            uniqueId:res.data[0].roomId,
            senderId:workersId,
            receiverId:clientId,
            messageText: `task request ${taskTitle} with the id of ${taskId} has been denied `,
            createdAt: Date.now()
          })
          console.log("message sent")}
        else if(res.data.length===0){
          socket.emit("createaroom",{
            workerId:workersId,
            clientId:clientId
          })
          let roomId= ""
          socket.on("getchatroom",({uniqueId})=>{
            console.log(uniqueId)
            roomId = uniqueId
            socket.emit("receive",{
              uniqueId:res.data[0].roomId,
              senderId:workersId,
              receiverId:clientId,
              messageText: `task request ${taskTitle} with the id of ${taskId} has been accepted `,
              createdAt: Date.now()
            })
            console.log("message sent")
          })
        }
      })
      .catch((err)=>{
           console.log(err)
      })
    axios.put(`http://${Link}:4000/api/tasks/changetaskstatus/${workersId }`,{taskStatus:"denied"})
    .then(results=>{
     console.log(results)
     Alert.alert("you have denied this request")
    })
    .catch(err=>{
      console.log(err)
      Alert.alert("you have an error in the status change")
    })
    handleToggle()
  }
  
  return (
    <View style ={styles.container}>
        <View style ={styles.subContainer}>
          <ScrollView>
        <View style ={styles.titleContainer}>
          <Text style ={styles.title}>Offers Requests</Text>
      </View>
      <View>
       {offers.length===0?(
        <Text style= {styles.noOffersText}>there are not offers Yet</Text>
       )   
       : offers.map((e,i)=>{
        return(
            <View id = "offers" key = {i} style = {styles.offerContainer}>
            <Text style = {styles.clientName}>Client: {e.clientFirstName} {e.clientLastName} </Text>
            <Text style={styles.taskTitle}>Request : {e.taskTitle}</Text>
            <Text style = {styles.taskDescription}>description:{e.taskText}</Text>
            <View style ={styles.buttonContainer}>
            <Button title= "accept" buttonStyle ={styles.accept} containerStyle={styles.buttonSpacing} onPress={()=>handleAcceptance(e.taskTitle,e.taskId,e.clientId,id)} ></Button>
            <Button  buttonStyle ={styles.deny} title="deny" containerStyle={styles.buttonSpacing} onPress={()=>handleDenial(e.taskTitle,e.taskId,e.clientId,id)}></Button>
            </View>
        </View>
        )})}
      </View>
      </ScrollView>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  clientName :{
    fontSize:18,
    fontWeight :"bold",
    marginBottom:5,
  },
  taskTitle:{
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  taskDescription:{
    fontSize:14,
    marginBottom:5,
    color : "gray",

  },
  offerContainer:{
    borderWidth :1,
    borderColor :"#ccc",
    borderRadius:10,
    padding: 10,
    marginVertical: 10,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    fontStyle: "normal",
    marginBottom: 10,
    textAlign: "center",
  },
  container: {
    borderWidth: 17,
    height: 811,
    borderColor: "#036BB9",
    borderRadius: 10,
  },
  subContainer: {
    borderWidth: 17,
    height: 782,
    width: 382,
    borderColor: "white",
    borderRadius: 10,
    left: -2,
    top: -3,
    bottom: -3,
  },
  deny: {
    width: 150,
    backgroundColor: "#FF0000",
    marginLeft: 5,
  },
  accept: {
    width: 150,
    backgroundColor: "green",
    marginRight : 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonSpacing: {
    marginBottom: 12,
    marginRight: 5,
    marginLeft: 5,
  },
  noOffersText: {
    fontWeight: "bold",
    color: "#ff3c3c",
    fontSize: 16,
    textAlign: "center",
  },
});


