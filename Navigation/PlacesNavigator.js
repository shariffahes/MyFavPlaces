import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesList from "../Screens/PlacesListScreen";
import NewPlacePage from "../Screens/NewPlaceScreen";
import PlaceDetails from "../Screens/PlaceDetailScreen";
import MapPage from "../Screens/MapScreen";
import { Platform, Text } from "react-native";
import Colors from "../Constants/Colors";
import { NavigationContainer } from "@react-navigation/native";

const StackContainer = createNativeStackNavigator();

const PlacesNavigator = () => {
  return (
    <NavigationContainer>
      <StackContainer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "#fff" : Colors.primary,
        }}
      >
        <StackContainer.Screen name="All Places" component={PlacesList} />
        <StackContainer.Screen
          name="Details"
          component={PlaceDetails}
          options={({ route }) => ({
            headerTitle: route.params.title,
          })}
        />
        <StackContainer.Screen name="Add New Place" component={NewPlacePage} />
        <StackContainer.Screen name="Map" component={MapPage} />
      </StackContainer.Navigator>
    </NavigationContainer>
  );
};

export default PlacesNavigator;
