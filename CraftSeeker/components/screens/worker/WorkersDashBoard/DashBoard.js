import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Reports from './Reports';
import TaskHistory from './TaskHistory';
import ActiveTask from './ActiveTask';
import OffersRequests from './OffersRequests';
import Rating from './Ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = (props) => {
  const navigation = useNavigation();
  const [offerCount, setOfferCount] = useState(0);
  const id = props.route.params.id
  useEffect(()=>{
    console.log(id,"fucn")
  },[])
   
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('Failed to remove token from AsyncStorage:', error);
    }
    navigation.navigate('SignIn');
  };

  const handleOfferCountChange = (count) => {
    setOfferCount(count);
  };
 // dashboard presk qryb tekml , mazel kn design 
 // mahabich ypushi 
 const navigateToProfile=()=>{
   navigation.navigate("WorkerProfil",{id:id})
 }
 const navigateToInbox=()=>{
   navigation.navigate("Inbox",{workersId:id})
 }
 
  return (
    <>
    <View style={styles.logoContainer}>
      <Text>DashBoard</Text>
      <Button title ="logout" onPress ={handleLogout}></Button>
      <Button title ="Profile" onPress ={navigateToProfile}></Button>
      <Button title ="Inbox" onPress={navigateToInbox}></Button>
    </View>
    <View style={styles.container}>
      <View style={styles.topThreeContainer}>
        <TouchableOpacity
          style={styles.activeTask}
          onPress={() => navigation.navigate('ActiveTask')}>
          <Text>Active Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lastTask}
          onPress={() => navigation.navigate('TaskHistory')}>
          <Text>Last Task Review</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.offerRequests}
          onPress={() => navigation.navigate('OfferScreen',{id:id})}>
          <Text>Offers Requests</Text>
          <Text>you have {offerCount} offers</Text>
        </TouchableOpacity>
        <OffersRequests onCountChange={handleOfferCountChange} />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.reports}
          onPress={() => navigation.navigate('Reports')}>
          <Text>Reports</Text>
        </TouchableOpacity>
        <View style={styles.bottomRightContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Ratings')}>
            <View style={styles.availability}>
              <Text>Available in: 5 days</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.ratings}></View>
          <TouchableOpacity
            style={styles.history}
            onPress={() => navigation.navigate('TaskHistory')}>
            <Text>Show History</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
     
    </>
  );
};

export default Dashboard;
const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0,
        backgroundColor: "#d8d1d1"
    },
    logo: {
        width: 140,
        height: 140,
    },
    container: {
        paddingTop: 0,
        flex: 1,
        justifyContent: "space-between",
        width: "100%",
        padding: 16
    },

    topThreeContainer: {
        marginVertical: 16,
        flex: 1,
        justifyContent: "flex-start",
    },

    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: "stretch"

    },
    bottomRightContainer: {
        flex: 1,
        flexDirection: 'column',
        borderRadius: 8,

    },
    activeTask: {
        flex: 2,
        backgroundColor: "#D3EFD2",
        alignSelf: "stretch",
        marginBottom: 16,
        borderRadius: 8,
    },
    lastTask: {
        flex: 1,
        backgroundColor: "#F0F4E3",
        alignSelf: "stretch",
        marginBottom: 16,
        borderRadius: 8,

    },
    offerRequests: {
        flex: 2,
        backgroundColor: '#E3EEF4',
        alignSelf: "stretch",
        borderRadius: 8,


    },
    reports: {
        borderRadius: 8,
        marginRight: 16,
        flex: 1,
        backgroundColor: '#EFBCBC',
    },
    availability: {
        borderRadius: 8,
        backgroundColor: '#E3D2A6',
        width: "100%",
        height: 100,
        flex: 1,
        marginBottom: 16,

    },
    ratings: {
        flex: 2,
        backgroundColor: '#E3EEF4',
        alignSelf: "stretch",
        marginBottom: 16,
        borderRadius: 8,
    },
    history: {
        flex: 1,
        backgroundColor: '#E3D2A6',
        alignSelf: "stretch",
        borderRadius: 8,
    },



})