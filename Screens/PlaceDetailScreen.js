import React from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../Components/MapPreview";
import Colors from "../Constants/Colors";
const PlaceDetails = (props) => {
  const id = props.route.params.id;
  const currPlace = useSelector((state) =>
    state.placesState.places.find((place) => place.id === id)
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image style={styles.imageStyle} source={{ uri: currPlace.imagePath }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
            {currPlace.address}
          </Text>
        </View>

        <MapPreview
          style={styles.mapPreview}
          location={currPlace.coordinates}
          onMapPressHandler={() => {
            props.navigation.navigate("Map", {
              pickedLocation: {
                lat: currPlace.coordinates.lat,
                long: currPlace.coordinates.long,
              },
              readOnly: true,
            });
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: "100%",
    height: "35%",
    minHeight: 300,
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
export default PlaceDetails;
