import React from 'react';
import ChatWindow from './components/screens/ChatWindow';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Categories from './components/screens/client/Categories';
import Dashboard from './components/screens/worker/WorkersDashBoard/DashBoard';
import WorkerProfil from './components/screens/WorkerProfil/WorkerProfil';
import Edit from './components/screens/WorkerProfil/Edit';
// import Edit from './components/screens/WorkerProfil/Edit';
// import Navigation from './Navigation';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from 'react';
// import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// import { io } from "socket.io-client";
// import ChatWindow from './components/screens/ChatWindow';
// import { NativeBaseProvider } from "native-base"
import Authentication from './components/screens/Authentication';
import HomePage from './components/screens/client/HomePage';
import Inbox from './components/screens/Inbox';
import OffersScreen from './components/screens/worker/OffersScreen';
import ReportScreen from './components/screens/worker/ReportScreen';
import HistoryScreen from './components/screens/worker/HistoryScreen';
import SignUpClient from './components/screens/client/RegisterAsAClient';
import SignUpWorker from './components/screens/worker/RegisterWorker';
import CreateATask from './components/screens/client/CreateATask';
import Workers from './components/screens/client/Workers';
import ClientProfil from './components/screens/client/Profil/Profil';
import EditProfilclient from './components/screens/client/Profil/EditProfil';

const Stack = createStackNavigator();

export default function App() {
  
  return (
     <NavigationContainer>
     <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name= "SignIn" component={Authentication} />
        <Stack.Screen name= "SignUpWorker" component={SignUpWorker} />
        <Stack.Screen name= "SignUpClient" component={SignUpClient}/>
        <Stack.Screen name= "HomePage" component={HomePage}/>
        <Stack.Screen name= "Categories" component = {Categories}/> 
        <Stack.Screen name= "CreateTask" component={CreateATask}/>
        <Stack.Screen name= "Workers" component ={Workers}/>
        <Stack.Screen name= "Dashboard" component = {Dashboard}/>
        <Stack.Screen name= "OfferScreen" component={OffersScreen} />
        <Stack.Screen name= "Inbox" component={Inbox} />
        <Stack.Screen name= "WorkerProfil" component={WorkerProfil}/> 
        <Stack.Screen name= "Edit" component={Edit}/> 
        <Stack.Screen name= "ClientProfil" component = {ClientProfil}/>
        <Stack.Screen name= "EditProfileClient" component={EditProfilclient} />
        <Stack.Screen name= "ChatWindow" component={ChatWindow} />
        <Stack.Screen name= "HistoryScreen" component={HistoryScreen}/> 
        <Stack.Screen name= "ReportScreen" component={ReportScreen}/> 
    </Stack.Navigator>
    </NavigationContainer>
  );
}


