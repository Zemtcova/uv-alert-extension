'use strict';

import {checkUVForecast} from './modules/uviApi.js';

// If the UV index is 3 or higher, show a Chrome notification
async function showUVAlert() {
  const maxUV = await checkUVForecast();
  if(maxUV >= 3) {
      chrome.notifications.create({
      type: "basic",
      iconUrl: "images/icon-128.png",
      title: "High UV index today!",
      message: "Don't forget to apply sunscreen!",
      priority: 2
    });
  }
}

// When the extension is installed, set an alarm to run every 24 hours (once a day)
// Starts 10 seconds after install
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("dailyUVCheck", {
    when: Date.now() + 10000,
    periodInMinutes: 60 * 24
  });
  showUVAlert();
});

// When the browser starts, re-create the daily alarm
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create("dailyUVCheck", {
    when: Date.now() + 10000,
    periodInMinutes: 60 * 24
  });
  showUVAlert();
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
    showUVAlert();
  }
});