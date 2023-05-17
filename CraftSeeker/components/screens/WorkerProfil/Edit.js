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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import axios from 'axios';



const Edit = () => {
  const [workerFirstName, setFirstName] = useState('');
  const [workerLastName, setLastName] = useState('');
  const [workerEmail, setEmail] = useState('');
  const [workerAddress, setAddress] = useState('');
  const [workerCategory, setCategory] = useState('');
  const [workerPhoneNumber, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

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

  const handleSelectPicturee = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicture(result.uri);
    }
  };

  const handleSelectPicture = async () => {
    let result = null;
    
    if (Platform.OS === 'web') {
      // On web, use file input to select a picture
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        result = event.target.files[0];
      };
      input.click();
    } else {
      // On native platforms, launch the camera app
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
      
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
  
    if (result) {
      setProfilePicture(result.uri);
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    data.append('profilePicture', {
      uri: profilePicture,
      type: 'image/jpeg',
      name: 'profilePicture.jpg',
    });
    data.append('firstName', workerFirstName);
    data.append('lastName', workerLastName);
    data.append('email', workerEmail);
    data.append('address', workerAddress);
    data.append('category', workerCategory);
    data.append('phoneNumber', workerPhoneNumber);

    try {
      const response = await axios.put(`http://localhost:4000/api/Workers/update${id}`, data);
      // set the state values to the updated worker information
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setEmail(response.data.email);
      setAddress(response.data.address);
      setCategory(response.data.category);
      setPhone(response.data.phoneNumber);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile.');
    }
  };

  return (
    <ScrollView >
      <TouchableOpacity style={styles.profilePictureContainer} onPress={handleSelectPicturee}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        ) : (
          <View style={styles.profilePicturePlaceholder}>
            <Text style={styles.profilePicturePlaceholderText}>Choose a Profile Picture</Text>
            


          </View>
        )}
      </TouchableOpacity>
      <Button title="Select Picture" onPress={handleSelectPicture} />


      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={workerFirstName}
        onChangeText={setFirstName}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={workerLastName}
        onChangeText={setLastName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={workerEmail}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={workerAddress}
        onChangeText={setAddress}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={workerCategory}
        
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        value={workerPhoneNumber}
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

export default Edit;