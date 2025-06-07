'use strict';

// Fetches and returns the current UV index for the specified coordinates
export async function checkCurrentUVIndex() {
    const response = await fetch('https://currentuvindex.com/api/v1/uvi?latitude=48.16&longitude=17.12');
    const data = await response.json();
    const currentUV = data.now.uvi;
    return currentUV;
}

// Asynchronous function that fetches today's UV forecast and shows a notification if the UV index is high
export async function checkUVForecast() {
  try {
     // Fetch UV forecast data from external API for a specific location (Bratislava)
    const response = await fetch('https://currentuvindex.com/api/v1/uvi?latitude=48.16&longitude=17.12');
    const data = await response.json();

    // Get today's date in the format "YYYY-MM-DD"
    const todayStr = new Date().toISOString().split('T')[0];

     // Filter forecast entries to include only those for today
    const todayForecast = data.forecast.filter(item => item.time.startsWith(todayStr));

    // Extract all UV index values for today
    const todayUVs = todayForecast.map(item => item.uvi);

    // Find the maximum UV index for today
    const maxUV = Math.max(...todayUVs);
    return maxUV;
  } catch (error) {
    console.error("Error in obtaining the UV forecast:", error);
    return null;
  }
}