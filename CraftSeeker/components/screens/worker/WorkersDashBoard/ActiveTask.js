import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Link from '../../Link';

function ActiveTask(props) {
  const { taskTitle, taskText, taskDate } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://${Link}:4000/api/tasks/getalltask`);
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Task not found');
        } else {
          console.error('Error fetching data:', error);
        }
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

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <>
          <Text style={styles.taskTitle}>{data[0].taskTitle}</Text>
          <Text>{data[0].taskText}</Text>
          <Text style={styles.deadline}>Deadline: {formatDate(data[0].taskDate)}</Text>
          <Text style={styles.error}>{data[0].taskText}</Text>
        </>
      ) : (
        <>
          <Text style={styles.taskTitle}>{taskTitle}</Text>
          <Text>{taskText}</Text>
          <Text style={styles.deadline}>Deadline: {taskDate}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  taskTitle: {
    fontWeight: 'bold',
  },
  deadline: {
    fontStyle: 'italic',
  },
  error: {
    color: 'bluea',
  },
});

export default ActiveTask;