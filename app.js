/* Imports */
import { getBeanies } from './fetch-utils.js';
import { getAstroSigns } from './fetch-utils.js';

import { renderAstroSignOption } from './render-utils.js';
import { renderBeanie } from './render-utils.js';

/* Get DOM Elements */
const beanieList = document.getElementById('beanie-list');
const notificationDisplay = document.getElementById('notification-display');
const astroSignSelect = document.getElementById('astro-sign-select');

/* State */
let error = null;
// let count = 0;
let beanies = [];
let astroSigns = [];

/* Events */
window.addEventListener('load', async () => {
    findBeanies();

    const response = await getAstroSigns();

    error = response.error;
    astroSigns = response.data;

    if (!error) {
        displayAstroSignOptions();
    }
});

async function findBeanies(name, astroSign) {
    const response = await getBeanies();

    error = response.error;
    // count = response.count;
    beanies = response.data;

    displayNotifications();
    if (!error) {
        displayBeanies();
    }
}

/* Display Functions */
function displayBeanies() {
    beanieList.innerHTML = '';

    for (const beanie of beanies) {
        const beanieEl = renderBeanie(beanie);
        beanieList.append(beanieEl);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
    }
}

function displayAstroSignOptions() {
    for (const astroSign of astroSigns) {
        const option = renderAstroSignOption(astroSign);
        astroSignSelect.append(option);
    }
}
// (don't forget to call any display functions you want to run on page load!)
