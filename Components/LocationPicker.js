import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import Colors from "../Constants/Colors";
import * as Location from "expo-location";
import MapPreview from "./MapPreview";

const LocationPicker = (props) => {
  const [pickedLocation, setLocation] = useState();
  const [isFetching, setFetch] = useState();
  const selectedLocation = props.route.params;
  useEffect(() => {
    if (selectedLocation) setLocation(selectedLocation.location);
  }, [selectedLocation]);
  const getUserLocation = async () => {
    setFetch(true);
    const isPermit = await Location.requestForegroundPermissionsAsync();
    if (!isPermit) {
      setFetch(false);
      Alert.alert(
        "A permission is required",
        "You need to give this app a permision to your location in order to continue using the location feature.",
        [{ text: "Okay", style: "default" }]
      );
      return;
    }
    try {
      const currLocation = await Location.getCurrentPositionAsync({
        accuracy: 6,
      });

      const coords = {
        lat: currLocation.coords.latitude,
        long: currLocation.coords.longitude,
      };

      setLocation(coords);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Could not reach your current location. Use the map to specify your location or try again later.",
        [{ text: "Okay", style: "default" }]
      );
    }
    setFetch(false);
  };
  useEffect(() => {
    props.onPickLocationHandler(pickedLocation);
  }, [pickedLocation]);
  return (
    <View style={styles.main}>
      <MapPreview
        style={styles.locationViewStyle}
        location={pickedLocation}
        onMapPressHandler={() => {
          props.navigation.navigate("Map", { pickedLocation, readOnly: false });
        }}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No loaction added</Text>
        )}
      </MapPreview>
      <View style={styles.buttons}>
        <View style={{ margin: 5 }}>
          <Button
            title="Get my Location"
            color={Colors.primary}
            onPress={getUserLocation}
          />
        </View>
        <View style={{ margin: 5 }}>
          <Button
            title="Pick on Map"
            color={Colors.primary}
            onPress={() => {
              props.navigation.navigate("Map", { readOnly: false });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 15,
  },
  locationViewStyle: {
    marginBottom: 10,
    width: "100%",
    height: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});

export default LocationPicker;
