import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Edit from './components/screens/WorkerProfil/Edit';
import WorkerProfil from './components/screens/WorkerProfil/WorkerProfil';
import Dashboard from './components/screens/worker/WorkersDashBoard/DashBoard'
const Stack = createNativeStackNavigator();



export default function Navigation() {

    

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name = "WorkerProfil" component={WorkerProfil}/>
      <Stack.Screen name="Edit" component={Edit} />
      
       
    </Stack.Navigator>
  </NavigationContainer>
  )
}




