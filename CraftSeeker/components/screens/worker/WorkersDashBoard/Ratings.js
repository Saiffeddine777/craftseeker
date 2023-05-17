import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Rating(props) {
  const { rating, onRate } = props;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const iconName = i <= rating ? 'ios-star' : 'ios-star-outline';
    stars.push(
      <TouchableOpacity key={i} onPress={() => onRate(i)}>
        <Ionicons name={iconName} size={32} color="orange" />
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {stars}
    </View>
  );
}

export default Rating;
