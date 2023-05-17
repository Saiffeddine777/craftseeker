import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, TouchableHighlight, Text, FlatList } from 'react-native';
import axios from 'axios';
import { SearchBar } from 'react-native-elements';
const HomePage = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
const [isPriceAscending, setPriceAscending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://192.168.110.162:4000/api/workers/getWorkersInfo');
      setData(result.data);
      console.log(result)
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
    const sortedData = [...data].sort((a, b) => b.workerHourlyPrice - a.workerHourlyPrice);
    setData(sortedData);
    setPriceAscending(false);
    toggleFilter();
  };
  
  const renderItem = ({ item }) => {
    if (searchQuery && !item.workerFirstName.toLowerCase().includes(searchQuery.toLowerCase())) {
    
      return null;
    }

    return (
      <View style={styles.card}>
        <Image source={require('../CraftSeeker/hello.png')} style={styles.cardImage} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.cardTitle}>{item.workerFirstName}</Text>
          <Text style={styles.cardText}>{item.workerJob}</Text>
          <Text style={styles.cardText}>{item.workerHourlyPrice}$/hour</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={{ flex:0.9 }} onPress={toggleMenu}>
          <Image source={require('../CraftSeeker/menu-icon-5.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Image source={require('../CraftSeeker/Screenshot_1.png')} style={styles.logo} />
        
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
        Price (Descending)
      </Text>
    </TouchableOpacity>
  </View>
)}

      {isMenuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, { marginBottom: 200 }]}>
            <Text>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
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
    top:50,
  height:60,
  left:20,
  }}
  inputContainerStyle={{backgroundColor: 'white'}}
  placeholderTextColor={'#g5g5g5'}
  placeholder="type here..."
  value={searchQuery}
  onChangeText={(query) => setSearchQuery(query)}
/>
<TouchableOpacity style={styles.filtring} onPress={toggleFilter}>
  <Image source={require('../CraftSeeker/filter.png')} style={styles.filter} />
</TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container:{
    borderWidth : 17,
    top:50,
    height : 730,
    borderColor : "#036BB9",
    borderRadius: 10,

 },
 filter:{
left:250,
 },
 filterMenu: {
  position: 'absolute',
  top: 260,
  right: 10,
  backgroundColor: '#fff',
  borderWidth: 1,
  borderRadius: 5,
  padding: 10,
},
filterMenuItem: {
  fontSize: 16,
  fontWeight: 'bold',
  padding: 10,
},
filtring:{
top:70,
},
filterMenuItemActive: {
  backgroundColor: '#ccc',
},
 subContainer:{
   borderWidth : 17,
   height : 782,
   width:382,
   borderColor : "white",
   borderRadius: 10,
   left:-2,
   top:-3,
   bottom:-3
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
    top: 0,
    right: 10,
    width: 70,
    height: 70,
    position: 'relative',
    resizeMode: 'contain',
  },
  logo: {
    position: 'absolute',
    top: 0,
    right:0,
    width: 100,
    height: 100,
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
    marginTop: 100
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    flex: 1,
    marginTop: 80,
    top:65,
  },
});

export default HomePage; 