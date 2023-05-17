import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, TextInput, StatusBar, Keyboard, TouchableOpacity, BackHandler, Alert, navig, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, CheckBox } from '@rneui/themed';
import googleSignInButton from '../../assets/google-signin-button.png';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Link from './Link';


export default function Authentication() {
  const navigation = useNavigation()

  {/*HANDLERS*/ }
  const handleKeyboardDidHide = () => {
    setFocused(false);
    console.log("keyboard hid", focused);
  }
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleKeyboardDidShow = (event) => {
    setFocused(true);
    console.log("keyboard shown", focused);
  }

  const handleSignIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token, "localstorage");
      if (token) {
        // if token exists, verify it and use it for authentication
        try {
          const response = await axios.post(`http://${Link}:4000/api/clients/verify-token`, null, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (response.status === 200) {
            // token is valid, navigate to authenticated screen
            console.log("login success with token", response.data);
            navigation.navigate("HomePage");
          } else {
            // token is invalid, attempt to sign in
            await attemptSignIn();
          }
        } catch (error) {
          // error occurred while verifying token, attempt to sign in
          await attemptSignIn();
        }
      } else {
        // no token exists, attempt to sign in
        await attemptSignIn();
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      Alert.alert('Error', 'Failed to sign in. Please try again.');
    }
  };
  
  const attemptSignIn = async () => {
    if (selected === 'client') {
      const response = await axios.post(`http://${Link}:4000/api/clients/login`, {
        clientEmail: emailInput,
        clientPassword: passwordInput,
      });
  
      if (response.status === 200) {
        // authentication successful, store token and navigate to authenticated screen
        await AsyncStorage.setItem('token', response.data.token);
        console.log("login success without token", response.data);
        navigation.navigate("HomePage",{id : response.data.data.clientId});
      } else {
        // authentication failed, display error message
        Alert.alert('Error', response.data.message);
      }
    } else if (selected === 'worker') {
      const response = await axios.post(`http://${Link}:4000/api/workers/login`, {
        workerEmail: emailInput,
        workerPassword: passwordInput,
      });
  
      if (response.status === 200) {
        // authentication successful, store token and navigate to authenticated screen
        await AsyncStorage.setItem('token', response.data.token);
        console.log("login success worker without token",response.data.data.workersId);
        console.log(response.data.workersId,"==========")
        navigation.navigate("Dashboard",{id : response.data.data.workersId});
      } else {
        // authentication failed, display error message
        Alert.alert('Error', response.data.message);
      }
    } else {
      Alert.alert('Select Client or Worker Please!');
    }
  };
  
  



  {/*STATES*/ }
  const [rememberPassword, setRememberPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState('');
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);


  {/*EFFECTS*/ }
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    console.log(selected);
  }, [selected])

  const navigateToSignUpWorker = ()=>{
    navigation.navigate("SignUpWorker")
    toggleModal()
  }
  const navigatetoSignUpClient = ()=>{
    navigation.navigate("SignUpClient")
    toggleModal()
  } 

  return (
    <>
      <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
      {/*LOGO*/}
      {!focused &&
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Welcome to Craft Seeker</Text>
        </View>
      }
      {/*INPUTS*/}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Icon name="envelope" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            onChangeText={text => setEmailInput(text)}
            placeholder="Email Address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Icon name="lock" style={styles.inputIcon} />
          <TextInput
            onChangeText={text => setPasswordInput(text)}
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCompleteType="password"
          />
        </View>

        <View>
          <Picker
            selectedValue={selected}
            onValueChange={value => setSelected(value)}
            style={[styles.picker, { width: 150 }]}>
            <Picker.Item label="Client Or Worker" />
            <Picker.Item label="Client" value="client" />
            <Picker.Item label="Worker" value="worker" />
          </Picker>
        </View>

        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Remember Password"
            checked={rememberPassword}
            onPress={() => setRememberPassword(!rememberPassword)}
            containerStyle={styles.checkbox}
          />
        </View>
      </View>

      {/*LOGIN && REGISTER */}
      <View style={[styles.buttonContainer, { marginBottom: focused ? -50 : -20 }]}>
        <View style={[styles.button, styles.loginButton]}>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleSignIn}>
            <Text style={styles.buttonText} >LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.button, styles.registerButton]}>
          <TouchableOpacity onPress={toggleModal}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 2, justifyContent: "space-between", alignItems: 'center', marginTop: 50 }}>
          <Text style={{ color: "#036BB9", fontSize: 35, justifyContent: 'flex-start', alignItems: 'center' }}>Register</Text>
          <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', marginTop: 150 }}>
            <Button containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
              borderRadius: 10
            }}
            onPress={navigatetoSignUpClient}>As Client</Button>
            <Button containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
              borderRadius: 10
            }}
            onPress={navigateToSignUpWorker}>As Worker</Button>
          </View>
          <View style={{ flex: 1 }}>
            <Image
              source={require('../../assets/logo.png')}
              style={{ flex: 1 }}
            />
          </View>

        
          <Button
            onPress={toggleModal}
            title="Cancel"
            containerStyle={{
              height: 50,
              width: 120,
              marginHorizontal: 50,
              marginVertical: 10,
              borderRadius:10,
              marginBottom:10
            }}
            buttonStyle={{ backgroundColor: 'rgba(255, 193, 7, 1)' }}
            titleStyle={{
              color: 'white',
              marginHorizontal: 20,
            }}
          />
        </View>
      </Modal>
    </>
  );
}

{/*STYLES*/ }
const styles = StyleSheet.create({
  logoContainer: {
    marginTop: -35,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  logo: {
    width: 160,
    height: 160,
  },
  welcomeText: {
    marginTop: -40,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#4a90e2',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    position: 'relative',
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 30,
    width: "42%",
    backgroundColor: "#036BB9",
    margin: "1.5%"
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    width: "100%",
    textAlign: "center"
  },
  alternativeLogins: {
    justifyContent: "flex-start",
    alignItems: "center"
  },
  loginWithTouchIDContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectWithTouch: {
    fontSize: 16,
    marginBottom: 35
  },
  fingerprintIcon: {
    marginTop: 8,
    width: 60,
    height: 60,
    alignSelf: 'center'
  },
  connectWithGmail: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '10%',      // Position it 10% above the bottom of the page
  },
  connectWithText: {
    fontSize: 16,
    marginRight: 10,
  },
  googleLoginButton: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  googleIcon: {
    marginTop: 8,
    width: 40,
    height: 40,
    alignSelf: 'center'
  },
});