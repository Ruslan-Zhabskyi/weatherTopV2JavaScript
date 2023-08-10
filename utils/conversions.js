export const conversions = {
  convertToFahrenheit(temperature) {
    // Convert temperature from Celsius to Fahrenheit using the formula F = (C * 9) /5 + 32
    let fahrenheit = (temperature * 9) / 5 + 32;
     // Return the temperature in Fahrenheit
    return Math.round(fahrenheit * 100.0) / 100.0;
  },
  
  weatherCodes(option) {
    switch (option) {
      case 
        100:
        return "Clear";
      case 200:
        return "Partial clouds";
      case 300:
        return "Cloudy";
      case 400:
        return "Light Showers";
      case 500:
        return "Heavy Showers";
      case 600:
        return "Rain";
      case 700:
        return "Snow";
      case 800:
        return "Thunder";
      default:
        return "Unknown code";
    }
  },
  
windSpeedBeaufortConversionLabel(option) {
    if (option >= 0 && option < 1) {
      return "Calm";
    } else if (option >= 1 && option <= 5) {
      return "Light Air";
    } else if (option >= 6 && option <= 11) {
      return "Light Breeze";
    } else if (option >= 12 && option <= 19) {
      return "Gentle Breeze";
    } else if (option >= 20 && option <= 28) {
      return "Moderate Breeze";
    } else if (option >= 29 && option <= 38) {
      return "Fresh Breeze";
    } else if (option >= 39 && option <= 49) {
      return "Strong Breeze";
    } else if (option >= 50 && option <= 61) {
      return "Near Gale";
    } else if (option >= 62 && option <= 74) {
      return "Gale";
    } else if (option >= 75 && option <= 88) {
      return "Severe Gale";
    } else if (option >= 89 && option <= 102) {
      return "Strong Storm";
    } else if (option >= 103 && option <= 117) {
      return "Violent Storm";
    } else {
      return "Unknown code";
    }
  },

 windSpeedBeaufortConversion(option) {
    if (option >= 0 && option < 1) {
      return "0";
    } else if (option >= 1 && option <= 5) {
      return "1";
    } else if (option >= 6 && option <= 11) {
      return "2";
    } else if (option >= 12 && option <= 19) {
      return "3";
    } else if (option >= 20 && option <= 28) {
      return "4";
    } else if (option >= 29 && option <= 38) {
      return "5";
    } else if (option >= 39 && option <= 49) {
      return "6";
    } else if (option >= 50 && option <= 61) {
      return "7";
    } else if (option >= 62 && option <= 74) {
      return "8";
    } else if (option >= 75 && option <= 88) {
      return "9";
    } else if (option >= 89 && option <= 102) {
      return "10";
    } else if (option >= 103 && option <= 117) {
      return "11";
    } else {
      return "Unknown code";
    }
  },

windDirectionCompassConversion(option) {
    if (option >= 348.75 || option < 11.25) {
      return "North";
    } else if (option >= 11.25 && option < 33.75) {
      return "North North East";
    } else if (option >= 33.75 && option < 56.25) {
      return "North East";
    } else if (option >= 56.25 && option < 78.75) {
      return "East North East";
    } else if (option >= 78.75 && option < 101.25) {
      return "East";
    } else if (option >= 101.25 && option < 123.75) {
      return "East South East";
    } else if (option >= 123.75 && option < 146.25) {
      return "South East";
    } else if (option >= 146.25 && option < 168.75) {
      return "South South East";
    } else if (option >= 168.75 && option < 191.25) {
      return "South";
    } else if (option >= 191.25 && option < 213.75) {
      return "South South West";
    } else if (option >= 213.75 && option < 236.25) {
      return "South West";
    } else if (option >= 236.25 && option < 258.75) {
      return "West South West";
    } else if (option >= 258.75 && option < 281.25) {
      return "West";
    } else if (option >= 281.25 && option < 303.75) {
      return "West North West";
    } else if (option >= 303.75 && option < 326.25) {
      return "North West";
    } else if (option >= 326.25 && option < 348.75) {
      return "North North West";
    } else {
      return "Unknown code";
    }
  },
  
windChillCalculator(tempreratureC, windSpeed) {
    let result = (13.12 + 0.6215 * tempreratureC - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * tempreratureC * Math.pow(windSpeed, 0.16));
    return Math.round(result * 10.0) / 10.0;
  }

};