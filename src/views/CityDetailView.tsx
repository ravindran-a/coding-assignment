import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const CityDetailView: React.FC = ({route}:any) => {
  console.log('city' ,route.params)
  const receivedData = route.params?.data;

    const { cityName, weatherIcon, temperatureUnit, hourlyWeatherData } = receivedData;
    const getWeatherIcon = (rain: number): any => {
      if (rain >= 1.0) {
        return require("../../assets/heavy-rain.png");
      } else if (rain > 0.0 && rain < 1.0) {
        return require("../../assets/light-rain.png");
      } else {
        return require("../../assets/sunny.png");
      }
    };

  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold',color:'black' }}>{cityName}</Text>
        <Image source={getWeatherIcon(weatherIcon)} style={{ width: 40, height: 40, marginLeft: 10 }} />
      </View>
      <FlatList
        data={hourlyWeatherData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.time12hours}</Text>
            <Text style={styles.text}>{item.temp} {temperatureUnit ==="metric" ?"C" :"F"}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default CityDetailView;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom:10
  },
  text:{
    color:'black',
    fontSize:16
  },
  weatherIcon: {
    width: 40,
    height: 40,
  },
});
