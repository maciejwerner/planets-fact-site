'use strict';

import {
  nodeElementListener,
  nodeElementsListener,
  selector,
  selectors,
} from './utils.js';

let planetState = {};

/*
 *
 */
const fetchPlanetsApi = async (planetName) => {
  const URL = './assets/data/data.json';

  try {
    const response = await fetch(URL);

    if (response.ok) {
      const data = await response.json();
      planetState = data.filter((planet) => planet.name === planetName)[0];

      renderBasicPlanetFacts();
    } else {
      throw new Error(`Response error: ${response.status}`);
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

/*
 *
 */
const menuLinks = selectors('.menu__link');

const getPlanetName = (e) => {
  const planetName = e.target.dataset.planet;

  fetchPlanetsApi(planetName);
};

nodeElementsListener(menuLinks, 'click', getPlanetName);

/*
 *
 */
const renderBasicPlanetFacts = () => {
  revealElements();
  setTimeout(() => {
    setBodyPlanetAttribute();
    setSelectedOverlayTab();
    renderPlanetTitle();
    renderPlanetOverview();
    renderPlanetDetails();
  }, 700);
};

/*
 * reveal elements
 */
const revealElements = () => {
  selectors('[data-reveal]').forEach((element) =>
    element.classList.remove('revealed'),
  );

  setTimeout(() => {
    selectors('[data-reveal]').forEach((element) =>
      element.classList.add('revealed'),
    );
  }, 751);
};

/*
 *
 */
const setBodyPlanetAttribute = () => {
  selector('[data-selector-body]').setAttribute(
    'data-planet',
    planetState.name,
  );
};

/*
 *
 */
const setSelectedOverlayTab = () => {
  selectors('[data-tab-btn]').forEach((tab) =>
    tab.classList.remove('selected'),
  );

  selectors('[data-tab-btn]')[0].classList.add('selected');
};

/*
 *
 */
const renderPlanetTitle = () => {
  const planetName = planetState.name;
  selector('[data-hero-title]').textContent = planetName;
};

/*
 *
 */
const renderPlanetOverview = (bool = false) => {
  selector('.fact__image--wrapper').classList.remove('display', 'revealed');

  if (bool === true) {
    setTimeout(() => {
      selector('.fact__image--wrapper').classList.add('revealed');
      selector('[data-planet-image]').src = planetState.images.planet;
      selector('[data-planet-image]').setAttribute(
        'alt',
        `Image of the planet ${planetState.name}`,
      );
    }, 751);
  } else {
    selector('.fact__image--wrapper').classList.add('revealed');
    selector('[data-planet-image]').src = planetState.images.planet;
    selector('[data-planet-image]').setAttribute(
      'alt',
      `Image of the planet ${planetState.name}`,
    );
  }

  selector('[data-surface-image]').src = '';

  selector('[data-hero-text]').textContent = planetState.overview.content;
  selector('[data-source-link]').setAttribute(
    'href',
    planetState.overview.source,
  );
};

const overviewBtn = selector('[data-tab-overview]');
overviewBtn.addEventListener('click', () => renderPlanetOverview(true));

/*
 *
 */
const renderPlanetStructure = () => {
  selector('.fact__image--wrapper').classList.remove('display', 'revealed');

  setTimeout(() => {
    selector('.fact__image--wrapper').classList.add('revealed');
    selector('[data-planet-image]').src = planetState.images.internal;
    selector('[data-planet-image]').setAttribute(
      'alt',
      `Image of the inner structure of the planet ${planetState.name}`,
    );
  }, 751);

  selector('[data-surface-image]').src = '';

  selector('[data-hero-text]').textContent = planetState.structure.content;
  selector('[data-source-link]').setAttribute(
    'href',
    planetState.structure.source,
  );
};

const structureBtn = selector('[data-tab-structure]');
nodeElementListener(structureBtn, 'click', renderPlanetStructure);

/*
 *
 */
const renderPlanetGeology = () => {
  selector('.fact__image--wrapper').classList.add('display');
  selector('.fact__image--wrapper').classList.remove('revealed');

  setTimeout(() => {
    selector('.fact__image--wrapper').classList.add('revealed');
    selector('[data-planet-image]').src = planetState.images.planet;
    selector('[data-planet-image]').setAttribute(
      'alt',
      `Image of the surface of the planet ${planetState.name} and its internal structure`,
    );
    selector('[data-surface-image]').src = planetState.images.geology;
  }, 751);

  selector('[data-hero-text]').textContent = planetState.geology.content;
  selector('[data-source-link]').setAttribute(
    'href',
    planetState.geology.source,
  );
};

const geologyBtn = selector('[data-tab-geology]');
nodeElementListener(geologyBtn, 'click', renderPlanetGeology);

/*
 *
 */
const renderPlanetDetails = () => {
  selector('[data-rotation-time]').textContent = planetState.rotation;
  selector('[data-revolution-time]').textContent = planetState.revolution;
  selector('[data-radius]').textContent = planetState.radius;
  selector('[data-average-temp]').textContent = planetState.temperature;
};

await fetchPlanetsApi('Earth');
