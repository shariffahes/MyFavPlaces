import * as FileSystem from "expo-file-system";
import { fetchPlaces, insertPlace } from "../helpers/db";
import { ApiKey } from "../keys";

export const ADD_PLACE = "ADD_PALACE";
export const SET_PLACES = "SET_PLACES";
export const addPalce = (name, imageURI, coordinates) => {
  return async (dispatch) => {
    try {
      const fileName = imageURI.split("/").pop();
      const newPath = FileSystem.documentDirectory + fileName;

      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.long},${coordinates.lat}.json?access_token=${ApiKey}`
      );

      const decoded = await res.json();
      const addressTitle =
        decoded.length === 0 || decoded.features[0]["place_name"] === null
          ? "unknown"
          : decoded.features[0]["place_name"];

      await FileSystem.moveAsync({ from: imageURI, to: newPath });
      const dbResponse = await insertPlace(
        name,
        newPath,
        addressTitle,
        coordinates.lat,
        coordinates.long
      );
      const id = dbResponse.insertId;

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id,
          name,
          imageURI: newPath,
          address: addressTitle,
          coordinates,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch) => {
    try {
      const results = await fetchPlaces();
      const loadedPlaces = results.rows._array;

      dispatch({
        type: SET_PLACES,
        places: loadedPlaces,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
