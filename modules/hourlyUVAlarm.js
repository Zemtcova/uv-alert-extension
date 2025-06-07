'use strict';

import { setIconColor } from './setIconColor.js';

const ALARM_NAME = 'hourlyUVCheck';

/**
 * Creates an hourly alarm that triggers every 60 minutes.
 * If the alarm already exists, it won't create a duplicate.
 * After ensuring the alarm exists, immediately update the icon color.
 */
export async function createHourlyUVAlarm() {
  const alarm = await chrome.alarms.get(ALARM_NAME);
  if (typeof alarm === 'undefined') {
    chrome.alarms.create(ALARM_NAME, {
      delayInMinutes: 1,
      periodInMinutes: 60
    });
  }
  // Immediately update icon color on alarm creation (or if alarm already exists)
  await setIconColor();
}

//Alarm event handler for the hourly UV check.
//Alarm name check is done externally before calling this function.
export function onHourlyUVAlarm() {
    setIconColor();
}