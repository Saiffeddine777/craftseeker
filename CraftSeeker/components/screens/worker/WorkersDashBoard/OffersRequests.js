import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

function OffersRequest(props) {
  const { taskTitle, taskText, taskDate } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('http://192.168.103.10:4000/api/tasks/getalltask');
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  const counter=0
  

  return (
    <View>
      <Text style={{ fontWeight: 'bold' }}>Offers:</Text>
      {data.map((task) => (
        <View key={task.taskId}>
          <Text>{task.taskTitle}</Text>
          <Text style={{ fontStyle: 'italic' }}>Offer Date: {formatDate(task.taskDate)}</Text>
        </View>
      ))}
    </View>
  );
}

export default OffersRequest;