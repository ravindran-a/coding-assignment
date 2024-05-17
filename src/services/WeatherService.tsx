import axios, { AxiosResponse } from 'axios';

import { WeatherData } from '../viewmodels/WeatherData';
const API_KEY =  process.env['API_KEY'];
console.log(API_KEY)


// Getting the current date
const currentDate = new Date();

  



export const fetchHourlyWeatherData = async ( latitude: number , longitude: number , temperatureUnit: string) => {
  try {
    const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${temperatureUnit}&exclude=current,minutely,daily,alerts&limit=1&appid=${API_KEY}`;
    const response = await axios.get(apiUrl);
    let resps= response.data.hourly;
    console.log("datalen " ,resps.length)
    // Filtering the hourly data to include only today's data
   
    const todayHourlyData =  resps?.filter((resp:any) => 
      {
        const timestampInMillis = resp.dt * 1000;
    
        const date = new Date(timestampInMillis);
        // Checking if the date matches today's date
        return date.getDate() === currentDate.getDate() && date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
      });
      console.log(todayHourlyData)
    const formattedHourlyData = todayHourlyData.map((hourData:any) => {
      const date = new Date(hourData.dt * 1000);
    
      let hours = date.getHours();
    
      const ampm = hours >= 12 ? 'PM' : 'AM';
    
      hours = hours % 12 || 12;
    
      const time12hours = `${hours} ${ampm}`;
    
      // Adding the formatted time to the hourData object
      return {
        ...hourData,
        time12hours: time12hours
      };
    });
    console.log(formattedHourlyData);
    return formattedHourlyData;
  } catch (error:any) {
    throw new Error(`Error fetching hourly weather data: ${error.message}`);
  }
};

export const fetchWeatherData = async (cities: { name: string; latitude: number; longitude: number }[], temperatureUnit: string): Promise<WeatherData[]> => {
  try {
    
    
    const promises = cities.map(async city => {
      const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${city.latitude}&lon=${city.longitude}&units=${temperatureUnit}&appid=${API_KEY}`;
      const response: AxiosResponse<any> = await axios.get(apiUrl);
    

      const hourlyData = response.data.hourly[0]; 
  
      const temperature = hourlyData.temp; 
      const rain = hourlyData.rain ? hourlyData.rain['1h'] : 0; 
  
      return {
        name: city.name,
        temperature,
     latitude :city.latitude,
    longitude :city.longitude,
    
         rain,
       };
     });

     const data = await Promise.all(promises);
     console.log(data)
    // const data=[{"name": "New York", "rain": 0, "temperature": 15.19, "latitude": 40.71, "longitude": -74.01}, {"name": "India", "rain": 0, "temperature": 29.17,"latitude": 40.71, "longitude": -74.01}, {"name": "Miami", "rain": 0, "temperature": 25.47,"latitude": 40.71, "longitude": -74.01}]

    return data;
  } catch (error:any) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};
