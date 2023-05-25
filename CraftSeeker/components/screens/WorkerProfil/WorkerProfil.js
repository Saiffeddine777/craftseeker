import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

import Link from "../Link";
const WorkerProfil = (props) => {
  // const [worker, setWorker] = useState([]);
  const [worker, setWorker] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const [toggleTextArea, setToggleTextArea] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportBody, setReportBody] = useState("");
  const [available, setAvailable] = useState(false);
  const { profilePictureUrl } = route.params;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const fileAReport = function () {
    axios
      .post(`http://${Link}:4000/api/reportsofclients/addclientreport`, {
        workersId: props.route.params.clientProps.workersId,
        clientId: props.route.params.clientProps.clientId,
        clientReportingWorkerTitle: reportTitle,
        clientReportingWorkerBody: reportBody,
      })
      .then((res) => {
        console.log(res);
        setToggleTextArea(!toggleTextArea)
        Alert.alert("report filed");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Problem Filing a report");
      });
  };

  // const fetchWorkerData = async () => {
  //   try {
  //     const response = await axios.get(`http://${Link}:4000/api/workers/getWorker/${props.route.params.id||props.route.params.clientProps.workersId}`);
  //     setWorker(response.data);
  //     console.log(worker,"fetchhhhhh")
  //   } catch (error) {
  //     console.log('Failed to fetch worker data:', error);
  //   }
  // }

 
  var oneWorker = {};
  var availableling = true

useEffect(() => {
  axios
    .get(
      `http://${Link}:4000/api/workers/getWorker/${
        props.route.params.id || props.route.params.clientProps.workersId
      }`
    )
    .then((res) => {
      console.log(res.data, "this is the data");
      console.log(Array.isArray(res.data));
      
        // console.log(worker)
        oneWorker = { ...res.data[0] };
        setWorker(oneWorker)                  
        console.log(worker, "fetchchchchch");
        // console.log(worker.workerAvailabillity ,"availibility") 
        if (res.data[0].workerAvailabillity === 1) {
          console.log("tak");
          setAvailable(true);
          availableling = true;
        }
        
        if (res.data[0].workerAvailabillity === 0) {
          setAvailable(false);
          availableling = false;
        }
        
        
    })
    .catch((err) => console.log(err));
    console.log(available,1231321231)
}, [available]);



  // Get the first item in the worker array

  const handleAvailability = () => {
    var availability = 0;
    if (!available) {
      availability = 1;
    }
    // console.log("inserted value",availability)
    axios
      .put(
        `http://${Link}:4000/api/workers/changeavailability/${props.route.params.id}`,
        {
          workerAvailabillity: availability,
        }
      )
      .then((res) => {
        setAvailable(!available)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!worker) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
  >
   
      <View style={styles.card}>
        <View style={styles.info}>
          {worker.imageUrl &&
          <Image
            source={{
              uri: worker.imageUrl.slice(1, worker.imageUrl.length - 1),
            }}
            style={styles.image}
          />}
          <View style={{ height: 60, top: 20 }}>
            <Text style={styles.name}>Name: {worker.workerFirstName}</Text>
          </View>
          <View style={{ height: 80, top: 20 }}>
            <Text style={styles.name}>Email: {worker.workerEmail}</Text>
          </View>

          <View style={{ height: 80, top: 20 }}>
            <Text style={styles.name}>Address: {worker.workerAdress}</Text>
          </View>

          <View style={{ height: 80, top: 20 }}>
            <Text style={styles.name}>
              summary: {worker.workerProfessionalSummary}
            </Text>
          </View>

          <View style={{ height: 80, top: 20 }}>
            <Text style={styles.name}>
              Phone number: {worker.workerPhoneNumber}
            </Text>
          </View>
        </View>
      </View>
      {props.route.params.id && (
        <>
          <View style={styles.wrappper}>
            <Button
              icon={<Icon name="edit" type="font-awesome" color="#ffffff" />}
              title="Edit"
              onPress={() =>
                navigation.navigate("EditProfil", { id: props.route.params.id })
              }
              buttonStyle={styles.editButton}
            />
          </View>
          <View style={styles.availablContainer}>
            <Button
              icon={<Icon name="check-circle" />}
              title={available? "Available" : "Not Available"}
              onPress={handleAvailability}
              buttonStyle={
                available? styles.availableButton : styles.notAvailableButton
              }
            />
          </View>
        </>
      )}
      {props.route.params.clientProps && (
        <View style={styles.reportButtonContainer}>
        <Button
          title="Report this worker"
          onPress={() => {
            setToggleTextArea(!toggleTextArea);
          }}
        ></Button>
         </View>
      )}

        <Modal visible={toggleTextArea} animationType="slide">
        
        <View style={styles.container1}>
        <View style = {styles.titleView}>
        <Text style ={styles.title}>Report this worker</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            placeholder="Report Title"
            style={styles.input}
            onChangeText={(text) => {
              setReportTitle(text);
              console.log(reportTitle);
            }}
          />
          <TextInput
            placeholder="Report Body"
            style={styles.input1}
            onChangeText={(text) => {
              setReportBody(text);
              console.log(reportBody);
            }}
          />
          <View style={styles.modalButtons}>
  <View style={styles.buttonContainer}>
    <Button title="Send Report" onPress={fileAReport} />
  </View>
  <View style={styles.buttonContainer}>
    <Button onPress={setToggleTextArea} title="Cancel" />
  </View>
</View>
        </View>
        </View>
      </Modal>
      
   
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container1: {
    borderWidth: 16,
    height: '100%',
    top: '0%',
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#036BB9',
    borderRadius: 10,
  },
  inputs: {
    marginTop: '60%',
    },
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
    flex: 1,
    right: "5%",
    width: "110%",
    justifyContent: "center",
    alignItems: "center",
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
      modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 10,
      },
      buttonContainer: {
        flex: 1,
        marginHorizontal: 5, // Adjust this value to decrease the space between buttons
      },
  card: {
    top: "0%",
    width: "90%",
    height: "100%",
    borderColor: "#036BB9",
    borderWidth: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
      overflow: "hidden",
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
    width: "80%",
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
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
  phone: {
    fontSize: 16,
    marginTop: 5,
  },
  editContainer: {
    position: "absolute",
    top: 80,
    left: 10,
  },
  editButton: {
    backgroundColor: "#007aff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  availablContainer: {
    position: "absolute",
    bottom: 130,
    right: 33,
    marginVertical: 20,
  },
  availableButton: {
    backgroundColor: "green",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  notAvailableButton: {
    backgroundColor: "red",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  reportButtonContainer: {
    bottom: 200,
  },
  area: {
    bottom: 40,
    position: "absolute",
  },
});

export default WorkerProfil;