import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import WeatherItem from './WeatherItem';
import { useWeatherViewModel } from '../viewmodels/WeatherViewModel';



const WeatherView: React.FC =()=> {
  const viewModel = useWeatherViewModel();
  const renderItem = ({ item }: { item: any }) => <WeatherItem data={item} unit={viewModel.temperatureUnit}/>;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={viewModel.toggleTemperatureUnit}>
        <Text style={styles.text}>{viewModel.temperatureUnit === 'metric' ? 'Celsius' : 'Fahrenheit'}</Text>
      </TouchableOpacity>
      <View style ={styles.row1}/>
      <FlatList
        data={viewModel.weatherData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 2,
    backgroundColor: '#fff',
  },
  toggleButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#000080',
    borderRadius: 5,
  },
  row1:{
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop:10
  },
  text:{
    color:"white",
    fontSize:20
  }
});

export default WeatherView;
