import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { WeatherCustomData } from '../viewmodels/WeatherData';
import { fetchHourlyWeatherData } from '../services/WeatherService';

interface Props {
  data: WeatherCustomData;
  unit:any;
}

const WeatherItem: React.FC<Props> = ({ data  ,unit}) => {
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const navigation = useNavigation();

  const getWeatherIcon = (rain: number): any => {
    if (rain >= 1.0) {
      return require("../../assets/heavy-rain.png");
    } else if (rain > 0.0 && rain < 1.0) {
      return require("../../assets/light-rain.png");
    } else {
      return require("../../assets/sunny.png");
    }
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const city:any = await fetchHourlyWeatherData(data.latitude  ,data.longitude, unit);
        setHourlyWeatherData(city);
      } catch (error:any) {
        console.error(error.message);
      }
    };

    fetchWeatherData();
  }, []);

  const handleItemClick = () => {
    console.log('view city')
    navigation.navigate('Hourlydata',{ data : { 
      cityName: data.name,
      weatherIcon: data.rain,
      temperatureUnit: unit,
      hourlyWeatherData: hourlyWeatherData
    } });
  };
console.log("data" ,data)
  return (
    <TouchableOpacity onPress={handleItemClick}  >
        <View style={styles.row}>
        <View style={styles.item}>
        <Text style={[styles.text,{  fontWeight:'bold'}]}>{data.name}</Text>
        <Text style={styles.text}>{data.temperature} {unit ==="metric" ?"C" :"F"}</Text>
        </View>
      
        <Image source={getWeatherIcon(data.rain)} style={styles.weatherIcon} />
      
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row:{
    padding:4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', height:80
  },

  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom:5,
    alignItems: 'flex-start',
  
  },
  
  weatherIcon: {
    width: 50,
    height: 50,
  },
  text:{
    color:'black',
    fontSize:16,
    marginTop:4,
  
  }
});

export default WeatherItem;
