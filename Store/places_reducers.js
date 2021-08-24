import Place from "../Modal/Place";
import { ADD_PLACE } from "./places_actions";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const extractedData = action.placeData;
      const newPlace = new Place(
        new Date().toString(),
        extractedData.name,
        extractedData.imageURI
      );
      return {
        places: state.places.concat(newPlace),
      };
    default:
      return state;
  }
};
