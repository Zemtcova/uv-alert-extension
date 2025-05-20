// Asynchronous function that fetches today's UV forecast and shows a notification if the UV index is high
async function checkUVForecast() {
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

    // If the UV index is 3 or higher, show a Chrome notification
    if (maxUV >= 3) {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "High UV index today!",
        message: "Don't forget to apply sunscreen!",
        priority: 2
      });
    }
  } catch (error) {
    console.error("Error in obtaining the UV forecast:", error);
  }
}

// When the extension is installed, set an alarm to run every 24 hours (once a day)
// Starts 10 seconds after install
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dailyUVCheck", {
    when: Date.now() + 10000,
    periodInMinutes: 60 * 24
  });
});

// When the browser starts, re-create the daily alarm
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create("dailyUVCheck", {
    when: Date.now() + 10000,
    periodInMinutes: 60 * 24
  });
});

// Optional: clicking the extension icon will create a test alarm
chrome.action.onClicked.addListener(() => {
  chrome.alarms.create("dailyUVCheck", {
    when: Date.now(),
    periodInMinutes: 60 * 24
  });
});

// Alarm listener: when any alarm activated, check if it's the UV alarm
// and call the UV forecast checker
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyUVCheck") {
    checkUVForecast();
  }
});