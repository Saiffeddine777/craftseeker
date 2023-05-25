import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
// import { Asset } from 'expo-media-library';
import axios from 'axios'
import Link from '../../Link';
import { useNavigation } from '@react-navigation/native';
// import uri from '../../../link'





const EditProfilclient = (props) => {
  const [clientFirstName, setFirstName] = useState('');
  const [clientLastName, setLastName] = useState('');
  const [clientEmail, setEmail] = useState('');
  const [clientAdress, setAddress] = useState('');
  const [clientPhoneNumber, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  const navigation = useNavigation()
  useEffect(() => {
    console.log(props.route.params,'the id ');
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleSelectPicturee = async () => {
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
            },
          }
        );
        const imageUrl = response.data;
        console.log(response.data);
        setProfilePictureUrl(imageUrl);
        console.log('Image uploaded successfully:', imageUrl);
      } catch (error) {
        console.log('Error uploading image:', error);
      }
    }
  };
  
  

  const handleTakePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
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
            },
          }
        );
        const imageUrl = response.data.url;
        setProfilePictureUrl(imageUrl);
        console.log('Image uploaded successfully:', imageUrl);
      } catch (error) {
        console.log('Error uploading image:', error);
      }
    }
  };
  


  const handleSave = async () => {
    const data = new FormData();
    data.append('profile-image', {
      uri: profilePicture,
      type: 'image/jpeg',
      name: 'profilePicture.jpg',
    });
    data.append('clientFirstName', clientFirstName);
    data.append('clientLastName', clientLastName);
    data.append('clientEmail', clientEmail);
    data.append('clientAdress', clientAdress);
    data.append('clientPhone', clientPhoneNumber);
  console.log(props.route.params.id,'id','========',{
    clientFirstName: clientFirstName,
    clientLastName: clientLastName,
    clientEmail: clientEmail,
    clientAdress: clientAdress,
    clientPhone: clientPhoneNumber,
    imageUrl: profilePictureUrl,
  });
    try {
      // Upload image to Cloudinary
      
      // Update client information with the Cloudinary image URL
      const response = await axios.put(
        `http://${Link}:4000/api/clients/updateUser/${props.route.params.id}`,
        {
          clientFirstName: clientFirstName,
          clientLastName: clientLastName,
          clientEmail: clientEmail,
          clientAdress: clientAdress,
          clientPhone: clientPhoneNumber,
          imageUrl: profilePictureUrl,
        }
      );
  console.log(response.data,'==>');
  props.route.params.setup(!props.route.params.up)
      // set the state values to the updated client information
      setFirstName(response.data.clientfirstName);
      setLastName(response.data.clientlastName);
      setEmail(response.data.clientEmail);
      setAddress(response.data.clientAdress);
      setPhone(response.data.clientphone);
      setProfilePictureUrl(response.data.imageUrl)
      navigation.navigate("ClientProfil", {id :props.route.params.id})
      alert('Profile updated successfully!');
    } catch (error) {
        console.log(JSON.stringify(error),'err');
      alert('Failed to update profile.');
    }
  };
  useEffect(()=>{
    console.log(profilePictureUrl,"state of the image url")
  },[])
  

  return (
    <ScrollView >
      <TouchableOpacity style={styles.profilePictureContainer} onPress={handleSelectPicturee}>
        {profilePicture ? (
          <Image source={{ uri: profilePictureUrl}} style={styles.profilePicture} />
        ) : (
          <View style={styles.profilePicturePlaceholder}>
            <Text style={styles.profilePicturePlaceholderText}>Choose a Profile Picture</Text>
          </View>
        )}
      </TouchableOpacity>
      <Button title="Select Picture" onPress={handleTakePicture} />


      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={clientFirstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={clientLastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={clientEmail}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={clientAdress}
        onChangeText={setAddress}
      />

      

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={clientPhoneNumber}
        onChangeText={setPhone}
      />

      <Button title="Save" onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 5,
    marginBottom: 15,
  },
  profilePicturePlaceholderText : {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    padding: 30,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
  },
  profilePictureContainer: {
    marginTop : 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#eee',
    marginBottom: 20,
    overflow: 'hidden',
  },

});

export default EditProfilclient;