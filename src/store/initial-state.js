import { DisplayedList, TempScale } from "../const";

const initialState = {
  displayedList: DisplayedList.SEARCH,
  search: {
    isLoading: false,
    lastRequestId: null,
    results: null,
    distanceSearchOrigin: null
  },
  trackedLocations: [],
  viewedLocation: null,
  tempScale: TempScale.C
};

export default initialState;
