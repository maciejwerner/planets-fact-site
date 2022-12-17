'use strict';

import {
  nodeElementListener,
  nodeElementsListener,
  selector,
  selectors,
} from './utils.js';

/*
 * animate links
 */
const menuItemsAnimation = () => {
  selectors('.menu__item').forEach((item, index) => {
    if (item.style.animation) {
      item.style.animation = '';
    } else {
      item.style.animation = `menuItemFade 250ms ease forwards ${
        index / 8 + 0.3
      }s`;
    }
  });
};

/*
 *
 */
const toggleNav = () => {
  selector('[data-selector-body]').classList.toggle('active');
  selector('[data-nav-menu]').classList.toggle('active');

  menuItemsAnimation();
};

/*
 *
 */
const hamburgerBtn = selector('[data-hamburger-btn]');

const togglelMenu = () => {
  const isOpened = hamburgerBtn.getAttribute('aria-expanded') === 'true';

  toggleNav();

  if (!isOpened) {
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    return;
  }

  hamburgerBtn.setAttribute('aria-expanded', 'false');
};

nodeElementListener(hamburgerBtn, 'click', togglelMenu);

/*
 *
 */
const menuLinks = selectors('.menu__link');

const toggleSelectedLink = (e) => {
  const target = e.target;
  const isOpened = hamburgerBtn.getAttribute('aria-expanded') === 'true';

  if (target.classList.contains('selected')) return;

  if (isOpened) {
    toggleNav();
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  menuLinks.forEach((link) => link.classList.remove('selected'));
  target.classList.add('selected');
};

nodeElementsListener(menuLinks, 'click', toggleSelectedLink);

/*
 *
 */
const tabButtons = selectors('[data-tab-btn]');

const toggleTab = (e) => {
  const target = e.target;

  if (target.classList.contains('selected')) return;

  tabButtons.forEach((tab) => tab.classList.remove('selected'));
  target.classList.add('selected');
};

nodeElementsListener(tabButtons, 'click', toggleTab);
