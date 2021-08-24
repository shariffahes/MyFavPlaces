import * as FileSystem from "expo-file-system";

export const ADD_PLACE = "ADD_PALACE";
export const addPalce = (name, imageURI) => {
  return async (dispatch) => {
    try {
      const fileName = imageURI.split("/").pop();
      const newPath = FileSystem.documentDirectory + fileName;

      await FileSystem.moveAsync({ from: imageURI, to: newPath });
      dispatch({
        type: ADD_PLACE,
        placeData: { name, imageURI: newPath },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
