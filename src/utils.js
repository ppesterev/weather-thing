export const debounce = (cb, delay) => {
  let timeoutId = null;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => cb.call(this, ...args), delay);
  };
};

export const coordsToString = ({ latt, long }) => {
  const NS = latt > 0 ? "N" : "S";
  const EW = long > 0 ? "E" : "W";
  const fixedLatt = Math.abs(latt).toFixed(2);
  const fixedLong = Math.abs(long).toFixed(2);
  return `${fixedLatt} ${NS}, ${fixedLong} ${EW}`;
};

export const celciusToFahrenheit = (celcius) => (celcius * 5) / 9 + 32;
