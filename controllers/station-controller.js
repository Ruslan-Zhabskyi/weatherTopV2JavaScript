import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/readings-store.js";
import {stationAnalytics} from "../utils/analytics.js";
import {conversions} from "../utils/conversions.js";
import axios from "axios";


export const stationController = {
  async index(request, response) {
    
    
  
    const station = await stationStore.getStationById(request.params.id);

    const minMaxStats = await stationAnalytics.calculateMinMaxStats(station);
    
    const stationTrends = await stationAnalytics.showWeatherTrends(station);

    const latestReading = await stationAnalytics.getLatestReading(station._id);
    
     if (latestReading!=null){
     latestReading.temperatureInF = await conversions.convertToFahrenheit(latestReading.temperature);
     latestReading.weatherCodeDecrypted = await conversions.weatherCodes(latestReading.code);
     latestReading.windBft = await conversions.windSpeedBeaufortConversion(latestReading.windSpeed);
     latestReading.windBftLabel = await conversions.windSpeedBeaufortConversionLabel(latestReading.windSpeed);
     latestReading.windChill = await conversions.windChillCalculator(latestReading.temperature, latestReading.windSpeed);
     latestReading.windDirection = await conversions.windDirectionCompassConversion(latestReading.windDirection);
     latestReading.trendLabels = latestReading.trendLabels;
     latestReading.tempTrend = latestReading.tempTrend;
     latestReading.windSpeedTrend = latestReading.windSpeedTrend;
     latestReading.pressureTrend = latestReading.pressureTrend;  
     } 
    
    
    const viewData = {
      title: "Station",
      station: station,
      latestReading:latestReading,
      minMaxStats: minMaxStats,
      stationTrends:stationTrends,
  
    };
    response.render("station-view", viewData);
  },
  
  
  async addReading(request, response) {
    const station = await stationStore.getStationById(request.params.id);
   
    const newReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      timestamp: new Date().toLocaleString() // Add a timestamp, from: https://codedamn.com/news/javascript/how-to-convert-timestamp-to-date-in-javascript
      
    };
    console.log(`adding track ${newReading.code}`);
    console.log(`time added ${newReading.timestamp}`);
    await readingStore.addReading(station._id, newReading);
    response.redirect("/station/" + station._id);
  },
  
  async deleteReading(request, response) {
    const stationId = request.params.stationid;
    const readingId = request.params.readingid;
    console.log(`Deleting Reading ${readingId} from Station ${stationId}`);
    await readingStore.deleteReading(readingId);
    response.redirect("/station/" + stationId);
  },
  
  async generateReading(request, response){
    console.log("rendering new report");
    const station = await stationStore.getStationLatLonById(request.params.id);
    
    let report = {};
    
    const lat = station.lat;
    const lng = station.lon;
    const apiKey = process.env.apiKey;

    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`
    
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      report.code = conversions.matchWeatherCode(reading.weather[0].id);
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      report.windDirection = reading.wind_deg;
      report.timestamp = new Date().toLocaleString();
      
      report.tempTrend = [];
      report.windSpeedTrend = [];
      report.trendLabels = [];
      report.pressureTrend = [];
      
      const trends = result.data.daily;
      for (let i = 0; i<trends.length;i++){
       report.tempTrend.push(trends[i].temp.day);
       report.windSpeedTrend.push(trends[i].wind_speed); 
       report.pressureTrend.push(trends[i].pressure);
        
       const date = new Date(trends[i].dt * 1000);
       // report.trendLabels.push(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` );
        
        
        report.trendLabels.push(date.toLocaleString().split(',')[0].replace(',', ''));

      }
      
    }
    await readingStore.addReading(request.params.id, report);
    response.redirect("/station/" + request.params.id);
  },
};
