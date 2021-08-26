import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../Components/CustomHeaderButton";
const MapPage = (props) => {
  const isReadOnly = props.route.params.readOnly;

  useEffect(() => {
    if (!isReadOnly) {
      props.navigation.setOptions({
        headerRight: (options) => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="save"
              color={options.tintColor}
              onPress={() => {
                saveSelectedLocation();
              }}
            />
          </HeaderButtons>
        ),
      });
    }
  });
  const [selectedLocation, setLocation] = useState({
    lat: 37.33233141,
    long: -122.0312186,
  });
  useEffect(() => {
    if (props.route.params.pickedLocation) {
      setLocation(props.route.params.pickedLocation);
    }
  }, []);

  const mapRegion = {
    latitude: selectedLocation.lat,
    longitude: selectedLocation.long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (!isReadOnly) {
      setLocation({
        lat: event.nativeEvent.coordinate.latitude,
        long: event.nativeEvent.coordinate.longitude,
      });
    }
  };
  const saveSelectedLocation = useCallback(() => {
    if (selectedLocation)
      props.navigation.navigate("Add New Place", {
        location: selectedLocation,
      });
  }, [selectedLocation]);

  let markerCoords = {
    latitude: selectedLocation.lat,
    longitude: selectedLocation.long,
  };

  return (
    <MapView
      style={styles.previewStyle}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoords && (
        <Marker coordinate={markerCoords} title="selected location" />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  previewStyle: {
    flex: 1,
  },
});
export default MapPage;
