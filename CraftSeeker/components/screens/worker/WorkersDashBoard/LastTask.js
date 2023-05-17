import React from 'react';
import { View, Text } from 'react-native';

function LastTask(props) {
  const { taskName, taskDescription, taskStatus } = props;

  return (
    <View>
      <Text style={{ fontWeight: 'bold' }}>{taskName}</Text>
      <Text>{taskDescription}</Text>
      <Text style={{ fontStyle: 'italic' }}>{taskStatus}</Text>
    </View>
  );
}

export default LastTask;