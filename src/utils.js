export const debounce = (cb, delay) => {
  let timeoutId = null;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => cb.call(this, ...args), delay);
  };
};
