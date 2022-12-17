/*
 * HELPERS
 */
export const selector = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

export const selectors = (selector, scope) => {
  return (scope || document).querySelectorAll(selector);
};

export const nodeElementListener = (selector, event, callback) => {
  selector.addEventListener(event, callback);
};

export const nodeElementsListener = (selectors, event, callback) => {
  selectors.forEach((selector) => selector.addEventListener(event, callback));
};
