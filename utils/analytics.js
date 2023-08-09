import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { conversions } from "../utils/conversions.js";

const db = initStore("readings");

export const stationAnalytics = {
  
  async getLatestReading(stationId) {
    
    await db.read();

    const readingsForStation = db.data.readings.filter((reading) => reading.stationid === stationId);

    if (readingsForStation.length === 0) {
      return null; // No readings found for the station
    }
    
    return readingsForStation[readingsForStation.length-1]; // Return the latest reading

  },
  
};

