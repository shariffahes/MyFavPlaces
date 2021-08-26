import Place from "../Modal/Place";
import { ADD_PLACE, SET_PLACES } from "./places_actions";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const extractedData = action.placeData;
      const newPlace = new Place(
        extractedData.id.toString(),
        extractedData.name,
        extractedData.imageURI,
        extractedData.address,
        extractedData.coordinates
      );
      return {
        places: state.places.concat(newPlace),
      };
    case SET_PLACES:
      return {
        places: action.places.map((item) => {
          const coords = { lat: item.lat, long: item.lng };

          return new Place(
            item.id.toString(),
            item.title,
            item.imagePath,
            item.address,
            coords
          );
        }),
      };
    default:
      return state;
  }
};
