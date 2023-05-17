import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';


const History = () => {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    const allReports = history.map(worker => worker.reports);
    const flattenedReports = [].concat.apply([], allReports);
    setHistory(flattenedReports);
  }, []);

  const historyList = history.map((item, index) => (
    <View key={index} style={{ alignItems: 'center', marginBottom: 10 }}>
      <Text style={{ fontSize: 16 }}>{item}</Text>
    </View>
  ));

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 16 }}>History:</Text>
      {historyList}
    </View>
  )
}

export default History;
