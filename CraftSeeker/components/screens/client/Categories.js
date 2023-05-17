import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Categories({navigation}) {
  const categories = [
    {
      name: 'cleaning',
      icon: require('../client/cleaning.png'),
    },
    {
      name: 'lown and garden',
      icon: require('../client/garden.png'),
    },
    {
      name: 'handyman',
      icon: require('../client/handyman.png'),
    },
    {
      name: 'home automation',
      icon: require('../client/homeAut.png'),
    },
    {
      name: 'moving and storage',
      icon: require('../client/movingg.png'),
    },
    {
      name: 'renovation',
      icon: require('../client/renovation.png'),
    },
  ];
  const handleCategoryPress = (categoryName) => {
    navigation.navigate('Workers', { category: categoryName });
  }


  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
           <Image source={require('../client/back.png')} style={styles.backIcon} />
         </TouchableOpacity>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <View style={styles.iconsContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.iconContainer} 
              onPress={() => handleCategoryPress(category.name)}
            >
              <Image source={category.icon} style={styles.icon} />
              <Text style={styles.iconLabel}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },

  backIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
    resizeMode: 'contain',
  },

  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    top:'50%'
  },
  iconContainer: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  iconLabel: {
    textAlign: 'center',
    fontSize: 16,
  },
  container: {
    borderWidth: 16,
    height: '94.8%',
    top: '5%',
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#036BB9',
    borderRadius: 10,
  },
  logo: {
    position: 'absolute',
    top: 0,
    right:0,
    width: 80,
    height: 60,
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
});