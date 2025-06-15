'use strict';

import {checkUVForecast} from './uviApi.js';

// If the max UV index for today is 3 or higher, show a Chrome notification
export async function showUVAlert() {
  const maxUV = await checkUVForecast();
  if(maxUV >= 3) {
      chrome.notifications.create({
      type: "basic",
      iconUrl: "images/icon-red-128.png",
      title: "High UV index today!",
      message: "Don't forget to apply sunscreen!",
      priority: 2
    });
  }
}