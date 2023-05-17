import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text,Image} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import { useNavigation,useRoute } from '@react-navigation/native';
import Link from '../Link';


const WorkerProfil = (props) => {
  const [worker, setWorker] = useState([]);
  const [available, setAvailable] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { profilePictureUrl } = route.params;
  console.log(props.route.params.id);

  const fetchWorkerData = async () => {
    try {
      const response = await axios.get(`http://${Link}:4000/api/Workers/getWorker/${props.route.params.id}`);
      setWorker(response.data);
    } catch (error) {
      console.log('Failed to fetch worker data:', error);
    }
  }

  useEffect(() => {
    fetchWorkerData();
  }, []);

  if (worker.length === 0) {
    return <Text>Loading...</Text>;
  }

  const workerData = worker[0]; // Get the first item in the worker array

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.info}>
           
      {console.log(workerData.imageUrl.slice(1,workerData.imageUrl.length-1))}
        
        <Image source={{ uri: workerData.imageUrl.slice(1,workerData.imageUrl.length-1)}} style={styles.image} />
          <Text style={styles.name}>Name: {workerData.workerFirstName}</Text>
          <Text style={styles.email}>{workerData.workerEmail}</Text>
          <Text style={styles.address}>{workerData.workerAdress}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.bio}>{workerData.workerProfessionalSummary}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.phone}>{workerData.workerPhoneNumber}</Text>
      </View>

      <Button
        icon={<Icon name="edit" type="font-awesome" color="#ffffff" />}
        title="Edit"
        onPress={() => navigation.navigate('EditProfil', { id: props.route.params.id })}
        buttonStyle={styles.editButton}
      />

      <View style={styles.availablContainer}>
        <Button
          icon={<Icon name="check-circle" />}
          title={available ? 'Available' : 'Not Available'}
          onPress={() => setAvailable((prev) => !prev)}
          buttonStyle={styles.editButton}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#E6F0FA',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
      overflow: 'hidden',
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
  address: {
    fontSize: 16,
    marginTop: 5,
  },
  bio: {
    fontSize: 16,
  },
  website: {
    fontSize: 16,
    marginTop: 5,
  },
  phone: {
    fontSize: 16,
    marginTop: 5,
  },
  socialIcon: {
    fontSize: 5,
    color: '#333',
    flexDirection: 'row'
  },
  editContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  editButton: {
    backgroundColor: '#007aff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    
  },
  availablContainer: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    marginVertical: 20,
  },
  availableButton: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  notAvailableButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default WorkerProfil;
