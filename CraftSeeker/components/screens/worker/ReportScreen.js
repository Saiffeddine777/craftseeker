import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import axios from "axios"
export default function ReportScreen() {
    const [reports ,setReports] = useState([]) 

useEffect(()=>{
    axios.get("http://192.168.103.7:4000/api/reportsofclients/getreportsofclientsbyworkerid/5")
    .then(res=>{
        setReports(res.data)
        console.log(reports)
    })
    .catch(err=>{
        console.log(err)
    })
},[])
   



  return (
    <View  style = {styles.container}>
        <View style ={styles.subContainer}>
      <View style = {styles.titleContainer}>
      <Text style = {styles.title}>Report Screen</Text>
      </View>
       <></>
      {reports.length===0?
                  <Text style = {styles.noReportsText}>Your cutomers are happy with you! you have no reports</Text>      
                  :
                  <ScrollView>{
                  reports.map((e,i)=>{
                                   return(<View style = {styles.reportContainer} key ={i} >
                                            <Text style = {styles.clientName}>Client: {e.clientFirstName} {e.clientLastName} </Text>
                                            <Text  style = {styles.reportTitle}>Report Title: {e.clientReportingWorkerTitle}</Text>
                                            <Text  style = {styles.reportDescription}>Report description{e.clientReportingWorkerBody}</Text>
                                         </View>)})}
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
    reportTitle:{
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 5
    },
    reportDescription:{
      fontSize:14,
      marginBottom:5,
      color : "gray",
    },
    reportContainer:{
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
    noReportsText: {
      fontWeight: "bold",
      color: "#16a085",
      fontSize: 16,
      textAlign: "center",
    },
  });