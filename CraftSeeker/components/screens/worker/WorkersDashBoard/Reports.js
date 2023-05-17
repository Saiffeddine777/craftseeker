import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';


const Reports = () => {
  const [selectedWorker, setSelectedWorker] = useState([]);
  useEffect(() => {
    setSelectedWorker(props);
  }, []);

  const reportsList = selectedWorker.map((report, index) => (
    <View key={index} style={{ alignItems: 'center', marginBottom: 20 }}>
      <Text style={{ fontSize: 16, color: 'white' }}>{report.reports}</Text>
    </View>
  ));

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red' }}>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>{`Reports: ${selectedWorker.name}`}</Text>
      {reportsList}
    </View>
  );
};

export default Reports;