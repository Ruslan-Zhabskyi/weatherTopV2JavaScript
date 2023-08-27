import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { conversions } from "../utils/conversions.js";

const db = initStore("readings");

export const stationAnalytics = {
  async getLatestReading(stationId) {
    await db.read();

    const readingsForStation = db.data.readings.filter(
      (reading) => reading.stationid === stationId
    );

    if (readingsForStation.length === 0) {
      return null;
    }

    return readingsForStation[readingsForStation.length - 1];
  },

  async showWeatherTrends(station) {
    const weatherTrends = {
      pressureTrend: null,
      temperatureTrend: null,
      windSpeedTrend: null,
    };

    if (station.readings.length >= 3) {
      const latestReading = station.readings[station.readings.length - 1];
      const secondLatestReading = station.readings[station.readings.length - 2];
      const thirdLatestReading = station.readings[station.readings.length - 3];

      if (
        latestReading.pressure > secondLatestReading.pressure &&
        secondLatestReading.pressure > thirdLatestReading.pressure
      ) {
        weatherTrends.pressureTrend = "increasing";
      } else if (
        latestReading.pressure < secondLatestReading.pressure &&
        secondLatestReading.pressure < thirdLatestReading.pressure
      ) {
        weatherTrends.pressureTrend = "decreasing";
      }

      if (
        latestReading.temperature > secondLatestReading.temperature &&
        secondLatestReading.temperature > thirdLatestReading.temperature
      ) {
        weatherTrends.temperatureTrend = "increasing";
      } else if (
        latestReading.temperature < secondLatestReading.temperature &&
        secondLatestReading.temperature < thirdLatestReading.temperature
      ) {
        weatherTrends.temperatureTrend = "decreasing";
      }

      if (
        latestReading.windSpeed > secondLatestReading.windSpeed &&
        secondLatestReading.windSpeed > thirdLatestReading.windSpeed
      ) {
        weatherTrends.windSpeedTrend = "increasing";
      } else if (
        latestReading.windSpeed < secondLatestReading.windSpeed &&
        secondLatestReading.windSpeed < thirdLatestReading.windSpeed
      ) {
        weatherTrends.windSpeedTrend = "decreasing";
      }
    }

    return weatherTrends;
  },

  async calculateMinMaxStats(station) {
    const minMaxStats = {
      minPressure: null,
      maxPressure: null,
      minTemperature: null,
      maxTemperature: null,
      minWindSpeed: null,
      maxWindSpeed: null,
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
  },
};
