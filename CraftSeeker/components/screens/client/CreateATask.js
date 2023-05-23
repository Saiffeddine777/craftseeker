import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from '../Link';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

const CreateATask = (props) => {
  const navigation = useNavigation();
  const { workersId, clientId } = props.route.params;
  useEffect(() => {
    console.log(workersId, 'workersId', clientId, 'clientId');
  }, []);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleTaskNameChange = (text) => {
    setTaskName(text);
  };

  const handleTaskDescriptionChange = (text) => {
    setTaskDescription(text);
  };

  const handleSubmit = async () => {
    console.log(`Task Name: ${taskName}, Task Description: ${taskDescription}`);
    axios
      .post(`http://${Link}:4000/api/tasks/addatask`, {
        clients_clientId: clientId,
        workers_workersId: workersId,
        taskTitle: taskName,
        taskText: taskDescription,
      })
      .then((res) => {
        console.log(res.data);
        Alert.alert('Task was sent');
        navigation.navigate('HomePage', { id: clientId });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={0}>
      <View style={styles.subcontainer}>
        <View style = {styles.titleView}>
        <Text style ={styles.title}>Demand a Task</Text>
        </View>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../client/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Task Name"
            value={taskName}
            onChangeText={handleTaskNameChange}
          />
          <View style={{ marginBottom: 10 }} />
          <TextInput
            style={styles.input1}
            placeholder="Task Description"
            value={taskDescription}
            onChangeText={handleTaskDescriptionChange}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  titleView:{
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    position : 'absolute',
    marginTop :"20%" ,
    left:"20%"
  
  },
   title:{
    fontSize: 24,
    fontWeight: 'bold',
   },
  container: {
    borderWidth: 16,
    height: '100%',
    top: '0%',
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#036BB9',
    borderRadius: 10,
  },
  
  subcontainer: {
    borderWidth: 8,
    height: '102%',
    width: '102%',
    borderRadius: 8,
    left: '-1.5%',
    borderColor: 'white',
    top: '-1%',
  },
  logo: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 80,
    height: 60,
    },
    input: {
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
    padding: 10,
    width: '100%',
    },
    input1: {
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 2,
    padding: 10,
    width: '100%',
    height: 100,
    },
    inputs: {
    marginTop: '60%',
    },
    button: {
    backgroundColor: '#036BB9',
    borderRadius: 10,
    padding: 15,
    width:90,
    left:100,
    alignItems: 'center',
    marginTop: 10,
    },
    buttonText: {
    color: 'white',
    fontSize: 16,
    },
    backIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
    },
    });
    
    export default CreateATask;