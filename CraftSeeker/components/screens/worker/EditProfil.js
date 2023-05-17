import React, { useState, useEffect } from 'react';
import Link from '../Link';
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
import axios from 'axios';

const EditProfil = (props) => {
  const [workerFirstName, setFirstName] = useState('');
  const [workerLastName, setLastName] = useState('');
  const [workerEmail, setEmail] = useState('');
  const [workerAddress, setAddress] = useState('');
  const [workerPhoneNumber, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  useEffect(() => {
    console.log(props.route.params, 'the id');
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
          `http://${Link}:4000/api/workers/uploadFile`,
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

  const handleSave = async () => {
    console.log(props.route.params.id, 'id', '========', {
      workerFirstName: workerFirstName,
      workerLastName: workerLastName,
      workerEmail: workerEmail,
      workerAdress: workerAddress,
      workerPhoneNumber: workerPhoneNumber,
      imageUrl: profilePictureUrl,
    });

    try {
      const response = await axios.put(
        `http://${Link}:4000/api/workers/update/${props.route.params.id}`,
        {
          workerFirstName: workerFirstName,
          workerLastName: workerLastName,
          workerEmail: workerEmail,
          workerAdress: workerAddress,
          workerPhoneNumber: workerPhoneNumber,
          imageUrl: profilePictureUrl,
        }
      );
      console.log(response.data, '==>');
      // props.route.params.setup(!props.route.params.up);
      // setFirstName(response.data.workerFirstName);
      // setLastName(response.data.workerLastName);
      // setEmail(response.data.workerEmail);
      // setAddress(response.data.workerAddress);
      // setPhone(response.data.workerPhoneNumber);
      // setProfilePictureUrl(response.data.imageUrl)

      alert('Profile updated successfully!');
    } catch (error) {
      console.log(JSON.stringify(error), 'err');
      alert('Failed to update profile.',error);
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity style={styles.profilePictureContainer} onPress={handleSelectPicture}>
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

            const  styles = StyleSheet.create({})
            
            export default EditProfil;
            
