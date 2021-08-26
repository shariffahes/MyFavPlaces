import React from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ApiKey } from "../keys";

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+ff2600(${props.location.long},${props.location.lat})/${props.location.long},${props.location.lat},11.03,0/300x200?access_token=${ApiKey}`;
  }

  return (
    <View style={{ ...props.style }}>
      {imagePreviewUrl ? (
        <TouchableWithoutFeedback onPress={props.onMapPressHandler}>
          <Image source={{ uri: imagePreviewUrl }} style={styles.imageStyle} />
        </TouchableWithoutFeedback>
      ) : (
        props.children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: "100%",
    width: "100%",
  },
});

export default MapPreview;
