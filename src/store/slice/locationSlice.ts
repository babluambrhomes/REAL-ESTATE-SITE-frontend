import { createSlice, type Middleware } from "@reduxjs/toolkit";
import type { OptionType } from "@/types";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const initialState: { selectedCity: OptionType | null; coordinates: Coordinates | null } = {
  selectedCity: null,
  coordinates: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCity(state, action) {
      state.selectedCity = action.payload;
    },
    setCoordinates(state, action) {
      state.coordinates = action.payload;
    },
  },
});

export const { setCity, setCoordinates } = locationSlice.actions;

export const persistLocation: Middleware = () => (next) => (action) => {
  const result = next(action);
  if (typeof window !== "undefined") {
    try {
      if (setCity.match(action)) {
        localStorage.setItem("city", action.payload.value);
      }
      if (setCoordinates.match(action)) {
        localStorage.setItem("coordinates", JSON.stringify(action.payload));
      }
    } catch (error) {
      void error;
    }
  }
  return result;
};

export default locationSlice.reducer;
