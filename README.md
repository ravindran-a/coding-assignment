# React Native Coding Assignment

This is a coding challenge for react native developers.  

# Prerequisites
Candidate should have vscode and Git installed on their machine.

# Step 1
Fork this repository and clone it.

Create a new react native Application "Weather App"
 * For the UI, you can use these mechanisms: Tailwind css package and Atomic approach.

# Step 2

Use the [Open Weather API](https://openweathermap.org/api) to fetch weather details. Here is an example call requesting the hourly temperature and rainfall for the lat/long of New York City, NY.

`https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&hourly=temperature_2m,rain`

Please use the latitude and longitude of the following cities to fetch temperature and rainfall conditions every hour of the day. A day is considered to run from 00:00:00 through 23:59:59. Hours should be displayed in the app according to the device's time display option (_Settings->General->Date&Time->24-Hour Time_).

| City | Lat  | Long |
| ------- | --- | --- |
| New York | 40.71 | -74.01 |
| Dallas | 32.78 | -96.81 |
| Miami | 25.77 | -80.19 |

Use the images included in the `assets` folder for a visual indicator of the weather conditions. Any precipitation `>0.0` and `<1.0` should be considered *light rain*. Precipitation `>=1.0` should be considered *heavy rain*. No precipitation is *sunny*.

Here is a rough design for the sample app.

![weather app drawio](https://user-images.githubusercontent.com/1957407/206615131-5afcbb18-1d7e-4b38-b9f1-7f4b1333defd.png)


# Expected funtionality
1. Fetch the current temperature for the three cities and list their current temperature, along with a rain or sun symbol as appropriate. 
1. Using the a control at the top of the main screen, switch between Celcius and Farenheit. This control can be any type you choose.
1. Clicking on a row will display the full weather report of the selected city for each hour of the day
1. The temperature system selected in view 1 should be carried to view 2.


# Evaluation
- Clean, readable code
- Knowledge of MVVM, delegation, UI and navigation, fetching and parsing JSON data, git.

# Acknowledgements
Weather image assets <a href="http://www.freepik.com">designed by Anindyanfitri / Freepik</a>.
