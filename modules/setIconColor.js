'use strict';

import {checkCurrentUVIndex} from './uviApi.js';

async function selectColor() {
    const uv = await checkCurrentUVIndex();
    let color;
    if(uv == null && uv == undefined) {
        color = "gray";
    } else if(uv < 3) {
        color = "green";
    } else if(uv >= 3 && uv < 5) {
        color = "orange";
    } else if(uv >= 5) {
        color = "red";
    }
    return color;
}

export async function setIconColor() {
    const iconColor = await selectColor();
    const path = {
        "16": `images/icon-${iconColor}-16.png`,
        "32": `images/icon-${iconColor}-32.png`,
        "48": `images/icon-${iconColor}-48.png`,
        "128": `images/icon-${iconColor}-128.png`,
    };
    await chrome.action.setIcon({ path });
}