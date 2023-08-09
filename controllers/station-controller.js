import { stationStore } from "../models/station-store.js";
import { readingStore } from "../models/readings-store.js";
import {stationAnalytics} from "../utils/analytics.js";
import {conversions} from "../utils/conversions.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const latestReading = await stationAnalytics.getLatestReading(station._id);
    const temperatureInF = await conversions.convertToFahrenheit(latestReading.temperature);
    const weatherCodeDecrypted = await conversions.weatherCodes(latestReading.code);
    const windBft = await conversions.windSpeedBeaufortConversion(latestReading.windSpeed);
    const windBftLabel = await conversions.windSpeedBeaufortConversionLabel(latestReading.windSpeed);
    const windChill = await conversions.windChillCalculator(latestReading.temperature, latestReading.windSpeed);
    const windDirection = await conversions.windDirectionCompassConversion(latestReading.windDirection)
    
    const viewData = {
      title: "Station",
      station: station,
      latestReading:latestReading,
      temperatureInF: temperatureInF,
      weatherCodeDecrypted:weatherCodeDecrypted,
      windBft:windBft,
      windBftLabel:windBftLabel,
      windDirection:windDirection,
      windChill: windChill
      
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
    };
    console.log(`adding track ${newReading.code}`);
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
};
