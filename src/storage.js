const KEY_PREFIX = "weather_thing_";

export const Key = {
  TRACKED_LOCATIONS: "tracked_locations"
};

export function setItem(key, value) {
  return localStorage.setItem(`${KEY_PREFIX}${key}`, JSON.stringify(value));
}

export function getItem(key) {
  return JSON.parse(localStorage.getItem(`${KEY_PREFIX}${key}`));
}

export function removeItem(key) {
  return localStorage.removeItem(`${KEY_PREFIX}${key}`);
}

export function clear() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(KEY_PREFIX)) {
      localStorage.removeItem(key);
    }
  }
}
