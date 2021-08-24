import React from "react";
import { enableScreens } from "react-native-screens";
import { applyMiddleware, combineReducers, createStore } from "redux";
import PlaceReducer from "./Store/places_reducers";
import PlacesNavigator from "./Navigation/PlacesNavigator";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  placesState: PlaceReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
