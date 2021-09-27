import { DisplayedList } from "../const";

const initialState = {
  displayedList: DisplayedList.SEARCH,
  search: {
    isLoading: false,
    lastRequestId: null,
    results: [],
    distanceSearchOrigin: null
  },
  trackedLocations: [],
  viewedLocation: null
};

export default initialState;
