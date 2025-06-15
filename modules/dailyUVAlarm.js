'use strict';

import { showUVAlert } from './notifications.js';

const ALARM_NAME = 'dailyUVCheck';

// Sets up a daily alarm if it doesn't already exist
export async function createDailyUVAlarm() {
const alarm = await chrome.alarms.get(ALARM_NAME);
  if (typeof alarm === 'undefined') {
    chrome.alarms.create(ALARM_NAME, {
        when: Date.now() + 10000,
        periodInMinutes: 60 * 24
    });
  }
}

// Called when the daily alarm triggers; shows a UV alert
export function onDailyUVAlarm() {
  showUVAlert();
}