import { Key, setItem } from "../storage";

export const syncStoragePlugin = (store) => {
  store.subscribe((mutation, state) => {
    switch (mutation.type) {
      case "addTrackedLocation":
      case "updateTrackedLocation":
      case "removeTrackedLocation":
      case "setTrackedLocations":
        setItem(Key.TRACKED_LOCATIONS, state.trackedLocations);
        break;
    }
  });
};
