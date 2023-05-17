import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function HistoryScreen() {
    const [tasks , setTasks] = useState([])

    useEffect(()=>{
        axios.get("http://192.168.103.7:4000/api/tasks/getworkscompeleted/9")
        .then((res)=>{
            setTasks(res.data)
            console.log(tasks)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(()=>{
        console.log(tasks)
    },[tasks])
    
  return (
    <View style = {styles.container}>
        <View style ={styles.subContainer}>
        <View style = {styles.titleContainer}>
         <Text style = {styles.title}>Completed Tasks</Text>
       </View>

      
    {tasks === 0 ? 
    <Text>You haven't completed any task yet</Text>
    :
    <ScrollView>
     {tasks.map((e,i)=>{
        return(
            <View style =  {styles.taskContainer}>
                <Text style =  {styles.clientName}>Client : {e.clientFirstName} {e.clientlastName}</Text>
                <Text style = {styles.taskTitle}>Task Title:{e.taskTitle}</Text>
                <Text style = {styles.taskDescription}>Task Text:{e.taskText} </Text>
            </View>
        )
     })}
     </ScrollView>}
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
      taskContainer:{
        borderWidth :1,
        borderColor :"#ccc",
        borderRadius:10,
        padding: 10,
        marginVertical: 10,
      },
}) 

