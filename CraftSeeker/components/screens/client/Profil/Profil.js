import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image ,ScrollView, Alert, Modal } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
// import { useNavigation } from '@react-navigation/native';
import Link from '../../Link';

const ClientProfil = (props) => {
  const [client, setclient] = useState([]);
  const [up, setup] = useState(false);
  // const navigation = useNavigation();
  const [offersAccepted, setOffersAccepted] = useState([]);
  const [offersCompleted, setOffersCompleted] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [ratingModal ,setRatingModal] = useState(false)
  const [listVisible,setLsitVisible] = useState(false) 
  const [selectedValue,setSelectedValue] = useState(0)
  const [ratedWorker, setRatedWorker] = useState("")

  const user = props.route.params.id;
  useEffect(()=>{
    console.log(user);
    console.log(Link)
  },[])

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const fetchclientData = async () => {
    try {
      const response = await axios.get(`http://${Link}:4000/api/clients/getone/${user}`);
      setclient(response.data);
    } catch (error) {
      console.log('Failed to fetch worker data:', error);
    }
  };

  useEffect(() => {
    fetchclientData();
  }, [up]);

 

  const clientData = client[0];

  useEffect(() => {
    axios.get(`http://${Link}:4000/api/tasks/getclientcompletedoffers/${user}`)
      .then((res) => {
        setOffersCompleted(res.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);

  useEffect(() => {
    axios.get(`http://${Link}:4000/api/tasks/getclientacceptedoffers/${user}`)
      .then((res) => {
        setOffersAccepted(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);

  const handleCompletion = function (id,workersId) {
    axios.put(`http://${Link}:4000/api/tasks/changetaskstatustocompleted/${id}`)
      .then((res) => {
        console.log(res, "statusupdated");
        Alert.alert("the task is performed by the worker Congrats!")
        handleToggle()
        setRatingModal(!ratingModal)
        setRatedWorker(workersId)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleRating=function(workerId,rating){
    axios.post(`http://${Link}:4000/api/workers/rateaworker`,
      {
        id: workerId,
        rating: rating
      }
    ).then(res=>{
      console.log(res)
      Alert.alert("thanks for your contribution to our plateform")
      setRatingModal(!ratingModal)
    }).catch(err=>{
      console.log(err)
    })
  }
   
  useEffect(()=>{
    console.log(offersCompleted,"completed");
    console.log(offersAccepted,"accepted");
  },[])


  if (client.length === 0) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.card}>
      {console.log(clientData.imageUrl.slice(1,clientData.imageUrl.length-1))}
        
        <Image source={{ uri: clientData.imageUrl.slice(1,clientData.imageUrl.length-1)}} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{clientData.clientFirstName}</Text>
          <Text style={styles.email}>{clientData.clientEmail}</Text>
          <Text style={styles.phone}>{clientData.clientPhone}</Text>
          <Text style={styles.address}>{clientData.clientLastName}</Text>
        </View>
      </View>
      
      {ratingModal &&
     <View>
      <Text>Rate This Worker</Text>
       <Picker 
       selectedValue={selectedValue}
       onValueChange={number =>setSelectedValue(number)}
       >
        <Picker.Item label='1' value={1}></Picker.Item>
        <Picker.Item label='2' value={2}></Picker.Item>
        <Picker.Item label='3' value={3}></Picker.Item>
        <Picker.Item label='4' value={4}></Picker.Item>
        <Picker.Item label='5' value={5}></Picker.Item>
       </Picker>
       <Button title = "Rate" onPress={()=>{handleRating(ratedWorker,selectedValue)}}></Button>
     </View>  
     }

      
      
      <View style={styles.container}>
  <Text style={styles.title}>Tasks In Progress</Text>
  <ScrollView>
    {offersAccepted.map((e, i) => (
      <>
      <View key={i} style={styles.card}>
        <Text>{e.taskTitle}</Text>
        <Text>{e.taskText}</Text>
        <Text>Performed By {e.workerFirstName} {e.workerLastName}</Text>
        <Button title="Task Performed" onPress={() => handleCompletion(e.taskId,e.workersId)} />
      </View>
      
      </>
    ))}
  </ScrollView>
</View>

  
      
       
      
      <View style={styles.card}>
        <Text style={styles.history}>Completed tasks</Text>
        <ScrollView>
        {offersCompleted.map((e,i)=>{
          return <View key ={i}>
                <Text>{e.taskTitle}</Text>
               <Text>{e.taskText}</Text>
               <Text>Performed By {e.workerFirstName} {e.workerLastName}</Text>
               </View>
        })}
     </ScrollView>
      </View>
      
      <View style={styles.container}>
      <Button
        icon={<Icon name="EditProfil" type="font-awesome" color="#ffffff" />}
        title="EditProfil"
        onPress={() => navigation.navigate('EditProfil', { id: props.route.params.id ,setup:setup,up:up})}
        buttonStyle={styles.editButton}
      />
      </View>

    </View>
    </ScrollView>
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
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
  requests: {
    fontSize: 16,
  },
  history: {
    fontSize: 16,
    marginTop: 5,
  },
  phone: {
    fontSize: 16,
    marginTop: 5,
  },
  editButton: {
    backgroundColor: '#007aff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  }
});

export default ClientProfil;