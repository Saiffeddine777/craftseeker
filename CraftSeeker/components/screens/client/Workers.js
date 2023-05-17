import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import axios from 'axios';
import { FlatList } from 'react-native';
import Link from '../Link';
export default function Workers({ route, navigation }) {
  const [workers, setWorkers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://${Link}:4000/api/workers/getWorkers/${route.params.category}`);
        setWorkers(result.data);
      } catch (error) {
        setErrorMessage('Failed to fetch workers');
      }
    };
    fetchData();
  }, [route.params.category]);
  const renderWorker = ({ item }) => (
    <View style={[styles.card, { zIndex: 1 }]}>
      <Image source={require('../client/hello.jpg')} style={styles.cardImage} />
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.cardTitle}>{item.workerFirstName}</Text>
        <Text style={styles.cardText}>{item.workerJob}</Text>
        <Text style={styles.cardText}>{item.workerHourlyPrice}$/hour</Text>
        <Text style={styles.ratingg}>({item.workerRating})</Text>
        <StarRating style={styles.rating}
  rating={item.workerRating}
  starSize={20}
  starStyle={{ marginRight: -5 }}
  starSpacing={5}
/>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
           <Image source={require('../client/back.png')} style={styles.backIcon} />
         </TouchableOpacity>
         <Image source={require('../../../assets/logo.png')} style={styles.logo} />
          <View style={{ height: '88%',top:'10%' }}>
  <FlatList
    style={{ flex: 1 }}
    data={workers}
    renderItem={renderWorker}
    keyExtractor={(item) => item._id}
  />
</View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 16,
    height: '94.8%',
    top: '5%',
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#036BB9',
    borderRadius: 10,
  },
  menuIcon: {
    top: 0,
    right: 0,
    width: 70,
    height: 70,
    position: 'relative',
    resizeMode: 'contain',
  },
  rating:{
    top:-90,
    left:70,
   },
   backIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },
   ratingg:{
     top:-74,
     left:180,
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    height:110,
    borderWidth:2,
    borderRadius:10,
    borderColor:'grey',
    marginBottom:10,
  },
  cardImage: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  logo: {
    position: 'absolute',
    top: 0,
    right:0,
    width: 80,
    height: 60,
  },
});