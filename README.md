# UV index Alert Chrome Extension ☀️
This browser extension checks the UV index forecast for Bratislava for the current day. If the index is above 3, it sends an alarm reminder to use sunscreen.

I wrote this extension for people with fair skin like myself. So that we don't forget to protect our skin from the sun and don't get burned. 

## Features
- Automatic UV forecast check daily
- Notification if UV index ≥ 3
- The 24 hours until a new notification starts either when the extension is installed, when the browser is opened, or when the extension icon is clicked
- Works in the background using Chrome's alarms and notifications API

## Installation
1. Download this repository: click the green **<> Code** button and select **Download ZIP**
2. Unzip the folder
3. Open Google Chrome and go to: `chrome://extensions`
4. Enable **Developer Mode** (top-right toggle)
5. Click **Load unpacked**
6. Select the unzipped project folder (it should contain `manifest.json`)
7. You're all set! The extension will run in the background and notify you daily if the UV index is high.

In case the extension does not send alarms, please check that you have Google Chrome notifications and alarms enabled.

## Developer Notes
- This extension uses a public UV forecast API:
  [currentuvindex.com](https://currentuvindex.com)
- You can adjust the location (latitude/longitude) in `uviApi.js`

## License
MIT

--

Take care of yourself, use sunscreen, hats and long sleeve clothes ❤️
