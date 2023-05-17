
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image ,ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
import Link from '../../Link';

const ClientProfil = (props) => {
  const [client, setclient] = useState([]);
  const [up, setup] = useState(false);
  // const navigation = useNavigation();
  const [offersAccepted, setOffersAccepted] = useState([]);
  const [offersCompleted, setOffersCompleted] = useState([]);
  const [toggle, setToggle] = useState(false);

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

  const handleCompletion = function (id) {
    axios.put(`http://${Link}:4000/api/tasks/changetaskstatus/${id}`)
      .then((res) => {
        console.log(res, "statusupdated");
        handleToggle()
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
          <Text style={styles.phone}>{clientData.clientFirstName}</Text>
          <Text style={styles.address}>{clientData.clientLastName}</Text>
        </View>
      </View>
      
      
      <View style={styles.card}>
        <Text style={styles.requests}>tasks In Progress</Text>
        <ScrollView>
        {offersAccepted.map((e,i)=>{
          return <View key={i}> 
          <Text>{e.taskTitle}</Text>
          <Text>{e.taskTitle}</Text>
          <Text>Performed By {e.workerFirstName} {e.workerLastName}</Text>
          <Button title="task performed" onPress={()=>handleCompletion(e.taskId)}> Task Performed </Button>
               </View>
        })}
        </ScrollView>
      </View>
      
       
      
      <View style={styles.card}>
        <Text style={styles.history}>Completed tasks</Text>
        <ScrollView>
        {offersCompleted.map((e,i)=>{
          return <View key ={i}>
                <Text>{e.taskTitle}</Text>
               <Text>{e.taskTitle}</Text>
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