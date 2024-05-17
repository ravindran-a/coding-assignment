

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CityDetailView from './views/CityDetailView';
import WeatherView from './views/WeatherView';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='WeatherView'>
        <Stack.Screen name="WeatherView" component={WeatherView} />
        <Stack.Screen name="Hourlydata"  component={CityDetailView} />
      </Stack.Navigator>
     </NavigationContainer>
  );
};

export default App;
