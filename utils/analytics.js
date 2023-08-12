import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { conversions } from "../utils/conversions.js";

const db = initStore("readings");

export const stationAnalytics = {
  
  async getLatestReading(stationId) {
    
    await db.read();

    const readingsForStation = db.data.readings.filter((reading) => reading.stationid === stationId);

    if (readingsForStation.length === 0) {
      return null;
    }
    
    return readingsForStation[readingsForStation.length-1];

  },
  
 async calculateMinMaxStats(station) {
  const minMaxStats = {
    minPressure: null,
    maxPressure: null,
    minTemperature: null,
    maxTemperature: null,
    minWindSpeed: null,
    maxWindSpeed: null
  };

  if (station.readings.length > 0) {
    minMaxStats.minPressure = station.readings[0].pressure;
    minMaxStats.maxPressure = station.readings[0].pressure;
    minMaxStats.minTemperature = station.readings[0].temperature;
    minMaxStats.maxTemperature = station.readings[0].temperature;
    minMaxStats.minWindSpeed = station.readings[0].windSpeed;
    minMaxStats.maxWindSpeed = station.readings[0].windSpeed;

    for (let i = 1; i < station.readings.length; i++) {
      if (station.readings[i].pressure < minMaxStats.minPressure) {
        minMaxStats.minPressure = station.readings[i].pressure;
      }
      if (station.readings[i].pressure > minMaxStats.maxPressure) {
        minMaxStats.maxPressure = station.readings[i].pressure;
      }
      if (station.readings[i].temperature < minMaxStats.minTemperature) {
        minMaxStats.minTemperature = station.readings[i].temperature;
      }
      if (station.readings[i].temperature > minMaxStats.maxTemperature) {
        minMaxStats.maxTemperature = station.readings[i].temperature;
      }
      if (station.readings[i].windSpeed < minMaxStats.minWindSpeed) {
        minMaxStats.minWindSpeed = station.readings[i].windSpeed;
      }
      if (station.readings[i].windSpeed > minMaxStats.maxWindSpeed) {
        minMaxStats.maxWindSpeed = station.readings[i].windSpeed;
      }
    }
  }
  return minMaxStats;
}

};

