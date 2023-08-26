import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/readings-store.js";
import {stationAnalytics} from "../utils/analytics.js";
import {conversions} from "../utils/conversions.js";
import { accountsController } from "./accounts.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);
    
    
    for(const station of stations){
      const latestReading = await stationAnalytics.getLatestReading(station._id);
      const readings = await stationStore.getStationById(station._id);
        if(latestReading!=null)
          {
          station.temperature = latestReading.temperature;
          station.pressure = latestReading.pressure;
          station.temperatureInF = await conversions.convertToFahrenheit(latestReading.temperature);
          station.weatherCodeDecrypted = await conversions.weatherCodes(latestReading.code);
          station.windBft =  await conversions.windSpeedBeaufortConversion(latestReading.windSpeed);
          station.windBftLabel =  await conversions.windSpeedBeaufortConversionLabel(latestReading.windSpeed);
          station.windChill = await conversions.windChillCalculator(latestReading.temperature, latestReading.windSpeed);
          station.windDirection = await conversions.windDirectionCompassConversion(latestReading.windDirection);
       
        };
      const minMaxStats = await stationAnalytics.calculateMinMaxStats(readings);
      station.minMaxStats = minMaxStats;   
      const  stationTrends = await stationAnalytics.showWeatherTrends(readings);
      station.stationTrends = stationTrends;
      };
    

      
     // Sort stations alphabetically by name https://www.scaler.com/topics/javascript-alphabetical-sort/
    stations.sort((a, b) => a.name.localeCompare(b.name));
    
    const viewData = {
      title: "Station Dashboard",
      stations: stations
    };
    
    
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      name: request.body.title,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      userid: loggedInUser._id,
    };
    console.log(`adding station ${newStation.name}`);
    await stationStore.addStation(newStation);
    response.redirect("/station/" + newStation._id);
    
  },
  
  async deleteStation(request, response){
  const stationId = request.params.id;
  console.log("deleting station: " + stationId);
  await stationStore.deleteStationById(stationId);
  response.redirect("/dashboard");
  
  }
  
};
