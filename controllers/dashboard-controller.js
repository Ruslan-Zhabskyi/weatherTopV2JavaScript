import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/readings-store.js";
import {stationAnalytics} from "../utils/analytics.js";
import {conversions} from "../utils/conversions.js";

export const dashboardController = {
  async index(request, response) {
    const stations = await stationStore.getAllStations();

    for(const station of stations){
      const latestReading = await stationAnalytics.getLatestReading(station._id);
        if(latestReading!=null)
          {
          station.temperature= latestReading.temperature;
          station.pressure= latestReading.pressure;
          station.temperatureInF = conversions.convertToFahrenheit(latestReading.temperature);
          station.weatherCodeDecrypted = conversions.weatherCodes(latestReading.code);
          station.windBft =  conversions.windSpeedBeaufortConversion(latestReading.windSpeed);
          station.windBftLabel =  conversions.windSpeedBeaufortConversionLabel(latestReading.windSpeed);
          station.windChill = conversions.windChillCalculator(latestReading.temperature, latestReading.windSpeed);
          station.windDirection = conversions.windDirectionCompassConversion(latestReading.windDirection);
        };   
      };
    
    const viewData = {
      title: "Station Dashboard",
      stations: stations
    };
    
    
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const newStation = {
      name: request.body.title,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
    };
    console.log(`adding station ${newStation.name}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
  
  async deleteStation(request, response){
  const stationId = request.params.id;
  console.log("deleting station: " + stationId);
  await stationStore.deleteStationById(stationId);
  response.redirect("/dashboard");
  
  }
  
};
