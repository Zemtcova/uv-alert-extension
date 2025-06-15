'use strict';

import {checkCurrentUVIndex} from './modules/uviApi.js';
import {createHourlyUVAlarm, onHourlyUVAlarm} from './modules/hourlyUVAlarm.js';
import {createDailyUVAlarm, onDailyUVAlarm} from './modules/dailyUVAlarm.js';

// Logs the current UV index to the console
async function showCurrentUV() {
  const current = await checkCurrentUVIndex();
  console.log('Current UV index:', current);
}

// Create an hourly alarm that updates the icon color based on the current UV index
createHourlyUVAlarm();
createDailyUVAlarm();

// Alarm listener: when any alarm activated, check if it's the UV alarm
// and call the UV forecast checker
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyUVCheck") {
    onDailyUVAlarm();
  } else if(alarm.name === "hourlyUVCheck") {
    onHourlyUVAlarm();
  }
});

// Optional: clicking the extension icon will create a test alarm 
// and logs current UV index to the console 
chrome.action.onClicked.addListener(() => {
  onDailyUVAlarm();
  showCurrentUV();
});