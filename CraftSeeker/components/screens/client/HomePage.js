import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TouchableHighlight, Text, FlatList, Pressable } from 'react-native';

 import axios from 'axios';
 import { useNavigation } from '@react-navigation/native';
import { Button, SearchBar } from 'react-native-elements';
import StarRating from 'react-native-star-rating-widget';
import Link from '../Link';
import { BackgroundImage } from 'react-native-elements/dist/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomePage = (props) => {

  const [isMenuVisible, setMenuVisible] = useState(false);
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isPriceAscending, setPriceAscending] = useState(true);
  // const [user,setUser] = useState({})

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('Failed to remove token from AsyncStorage:', error);
    }
    navigation.navigate('SignIn');
  };

   const user = props.route.params.id
   
   useEffect(()=>{
    console.log(user,"this is a user")
   },[])

   const navigateToInbox=()=>{
    navigation.navigate("Inbox",{clientId:user})
   }

 useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://${Link}:4000/api/workers/getWorkersInfo`);//192.168.110.162
      setData(result.data);
      // console.log(result.data);
    };
    fetchData();
    
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };
  const toggleFilter = () => {
    setFilterVisible(!isFilterVisible);
  };
  const filterAscending = () => {
    const sortedData = [...data].sort((a, b) => a.workerHourlyPrice - b.workerHourlyPrice);
    setData(sortedData);
    setPriceAscending(true);
    toggleFilter();
  };
  
  const filterDescending = () => {
    const sortedData = [...data].sort((a, b) => b.workerRating - a.workerRating);
    setData(sortedData);
    setPriceAscending(false);
    toggleFilter();
  };
  
  const renderItem = ({ item }) => {
  
    if (searchQuery && !item.workerFirstName.toLowerCase().includes(searchQuery.toLowerCase())) {
      console.log(item,"========>")
      return null;
    }
    console.log(item.imageUrl,"<========")
    return (
      <TouchableOpacity onPress={()=>{navigation.navigate("WorkerProfil",{clientProps:{workersId:item.workersId,clientId:user}})}}>
      <View key={item.workersId} style={[styles.card, { zIndex: 1 }]}>

<Image source={{ uri: item.imageUrl&&item.imageUrl }} style={styles.cardImage} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.cardTitle}>{item.workerFirstName}</Text>
          <Text style={styles.cardText}>{item.workerJob}</Text>
          <Text style={styles.cardText}>{item.workerHourlyPrice}$/hour</Text>
           
<Button
      title="Demand"
      style={{ borderRadius: 10,height:20,width:20, }}
      containerStyle={{padding:10, left:'90%',marginTop:'50%',height:85, overflow:'hidden', 
      borderRadius:4, backgroundColor: 'transparent',position:'absolute'}}
      onPress={() => {
        navigation.navigate('CreateTask',{workersId:item.workersId,clientId:user});
      }}
    />
          <Text style={styles.ratingg}>({item.workerRating})</Text>
          <StarRating 
  style={styles.rating}
  rating={item.workerRating}
  starSize={20}
  starStyle={{ marginRight: -5 }}
  onChange={() => {}}
  starSpacing={5}
/>
        </View>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.subcontainer}>
      
       <View style={styles.header}>
        <TouchableOpacity style={{ flex:0.9 }} onPress={toggleMenu}>
          <Image source={require('../client/menu-icon-5.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        
         </View>
        

         {isFilterVisible && (
  <View style={styles.filterMenu}>
    <TouchableOpacity onPress={filterAscending}>
      <Text style={[styles.filterMenuItem, isPriceAscending && styles.filterMenuItemActive]}>
        Price (Ascending)
      </Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={filterDescending}>
      <Text style={[styles.filterMenuItem, !isPriceAscending && styles.filterMenuItemActive]}>
      rating
      </Text>
    </TouchableOpacity>
  </View>
)}

      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ClientProfil',{id:user})}>
          <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate('Categories')}>
            <Text>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { marginBottom: 200 }]} onPress={navigateToInbox}>
            <Text>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
<SearchBar
  style={styles.search}
  inputStyle={{backgroundColor: 'white'}}
  containerStyle={{
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    width: '60%',
    top:20,
  height:60,
  left:20,
  }}
  inputContainerStyle={{backgroundColor: 'white'}}
  placeholderTextColor={'#g5g5g5'}
  placeholder="type here..."
  value={searchQuery}
  onChangeText={(query) => setSearchQuery(query)}
/>
<Pressable style={styles.filtring} onPress={toggleFilter}>
  <Image source={require('../client/filter.png')} style={styles.filter} />
</Pressable>
<View style={styles.list}>  
      <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
</View>
    </View>
  );
};


const styles = StyleSheet.create({ 
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

 filter:{
left:250,
height:40,
width:50,
top:-35,
 },
 filterMenu: {
  position: 'absolute',
  top: 190,
  right: 15,
  backgroundColor: '#fff',
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
  width:150
},
filterMenuItem: {
  fontSize: 12,
  fontWeight: 'bold',
  padding: 5,
},
filtring:{
top:10,
marginBottom:10,

},
filterMenuItemActive: {
  backgroundColor: '#ccc',
},

 title:{
   flex: "center",
 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'relative',
  },
  menuIcon: {
    top: -10,
    right: 16,
    width: 70,
    height: 70,
    position: 'relative',
    resizeMode: 'contain',
  },
  logo: {
    position: 'absolute',
    top: 0,
    right:0,
    width: 80,
    height: 60,
  },
 
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
    width: 180,
    height: 550,
    marginTop: 70
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
rating:{
 top:-90,
 left:70,
},
ratingg:{
  top:-74,
  left:180,
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
  list: {
    position:"relative",
    marginTop:70, 
    height:440,
  },
});

export default HomePage; 