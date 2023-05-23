import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, ScrollView, Image, Alert, TouchableHighlight } from 'react-native';
import calendarImage from '../../../assets/calender.png';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Link from '../Link';





const SignUpClient = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [Url,setUrl] = useState('')

  const verifyUpperCase = function (str){
    var count = 0
     for (let i = 0; i < str.length; i++) {
       const alphabet ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for(let j = 0 ; j<alphabet.length;j++){
           if(str[i]===alphabet[j]){
               count++
           }
       }
     }
       if (count>0){
           return true
       }
       else return false
   }

  const generateId = function () {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const idLength = 32;
    let id = '';
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters[randomIndex];
    }
    return id;
  }

  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    imageUrl: ''
  });
 
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  
const handleSelectPicture = async () => {
  const cloudName = "dilwfvmbr"
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    const imageUri = result.uri;
    setProfilePicture(imageUri);

    const formData = new FormData();
    formData.append('profile-image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profilePicture.jpg',
    });

    try {
      const response = await axios.post(
        `http://${Link}:4000/api/clients/uploadFile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          } ,
          
        }  
      );
      console.log(response.data,"data")
      setUrl(response.data)
      const imageUrl = response.data;
      setProfilePictureUrl(imageUrl);

      console.log('Image uploaded successfully:', imageUrl);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  }
};
const handleSignup = async () => {
   const cloudName = "dilwfvmbr"
  const { firstName, lastName, email, password, phoneNumber, address, dateOfBirth } = userInfo;

  if (userInfo.confirmPassword !== userInfo.password) {
    Alert.alert("Passwords Don't Match!");
 
  }

  if(!verifyUpperCase(userInfo.password)){
    Alert.alert("You must at least have one uppercase character in your password")
  }

   else if(!userInfo.email.includes("@")){
       Alert.alert("Give a proper Email")
  }
  else {
    try {
    
     
const obj= {
  clientFirstName: firstName,
  clientLastName: lastName,
  clientAdress: address,
  clientEmail: email,
  clientDateOfBirth: dateOfBirth,
  clientPhone: phoneNumber,
  clientPassword: password,
  imageUrl: JSON.stringify(Url),
  clientId: generateId()
}

      // Save the client details in the database
      const clientResponse = await axios.post(`http://${Link}:4000/api/clients/addclient`,obj );
      console.log(obj,"dataaaa");

        navigation.navigate('HomePage', { id: obj.clientId });
    
        console.log('Error creating client:', clientResponse.data);
      
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  }
};


  const handleInputChange = (name, value) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const showDatepicker = () => {
    setOpen(true);
  }

  const onDateChange = (event, selectedDate) => {
    setDate(selectedDate);
    setOpen(false);
    const isoString = selectedDate.toISOString();
    const year = isoString.substring(0, 4);
    const month = isoString.substring(5, 7);
    const day = isoString.substring(8, 10);
    const formattedDate = `${year}-${month}-${day}`;
    setUserInfo({ ...userInfo, dateOfBirth: formattedDate });
  };

  return (
    <View style={styles.container} >
      <View style={styles.subcontainer}>
  
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          /><TouchableOpacity onPress={() => navigation.goBack()}>
             <Image
            source={require('../client/back.png')}
            style={styles.back} 
          />
          </TouchableOpacity>
      <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
      <TouchableOpacity onPress={handleSelectPicture}>
  {profilePicture ? (
    <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
  ) : (<TouchableOpacity
    style={styles.profilePicturePlaceholder}
    onPress={handleSelectPicture}
  >
    <Text style={styles.profilePicturePlaceholderText}>Choose a Profile Picture</Text>
  </TouchableOpacity>
  
  )}
</TouchableOpacity>



      <ScrollView onPress={()=> console.log('wfffw')} style={styles.scrollView}>
        <TextInput style={styles.input} placeholder="First Name" onChangeText={text => handleInputChange('firstName', text)} />
        <TextInput style={styles.input} placeholder="Last Name" onChangeText={text => handleInputChange('lastName', text)} />
        <TextInput style={styles.input} placeholder="Email Adress" keyboardType="email-address" onChangeText={text => handleInputChange('email', text)} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={text => handleInputChange('password', text)} />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry={true} onChangeText={text => handleInputChange('confirmPassword', text)} />
        <TextInput style={styles.input} placeholder="Phone Number" keyboardType="numeric" onChangeText={text => handleInputChange('phoneNumber', text)} />
        <TextInput style={[styles.input, { marginBottom: 5 }]} placeholder="Address" onChangeText={text => handleInputChange('address', text)} />
        {/* DATE */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Select Date Of Birth</Text>
          <TouchableOpacity style={styles.button} onPress={showDatepicker} >
            <Image source={calendarImage} style={styles.calendarIcon} />
          </TouchableOpacity>
          {open && (
            <DateTimePicker
              display="calendar"
              mode="date"
              value={date}
              onChange={onDateChange}
            />
          )}
        </View>
        <View style={{top:0}}> 
        <TouchableHighlight
         style={{ flex: 1, alignSelf: "center", backgroundColor: '#83b5ed', width: "40%", borderRadius: 10, height: 30, justifyContent: "center",top:0 }}
          activeOpacity={0.6}
          underlayColor="#24b9e6"
          onPress={handleSignup} >
          <Text  style={{ textAlign: "center" }}>Submit</Text>
  
        </TouchableHighlight>
 </View>
      </ScrollView>


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scrollView: {
    // marginVertical: 15,
    position:'absolute',
   top:'37%',
   width:'80%',
   left:'7%'
  },
  logo:{
 width:'40%',
 height:'10%',
 left:'70%'
  },
  back:{
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
    top:'-170%',
  },

    profilePicturePlaceholder: {
      top:'-10%',
      backgroundColor: '#F0F4E3',
      borderRadius: 100,
      padding: 16,
      height:'50%',
      alignItems: 'center',
      width:'50%',
      left:'10%'
    },
    profilePicturePlaceholderText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#000000',
      top:'40%',
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
  title: {
    color: '#0386D0',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: '15%',
    marginRight: '15%',
    textAlign: 'center',
  },
  input: {
    marginVertical: 7,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    height: 40,
    borderColor: '#dedede',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  calendarIcon: {
    width: 24,
    height: 24,
  },
  datePickerContainer: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  picker: {
    width: '30%',
  }
})

export default SignUpClient;