import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
import Colors from "../Constants/Colors";
import * as imagePicker from "expo-image-picker";

const ImagePicker = (props) => {
  const [pickedImage, setPickedImage] = useState("");
  const toggleImagePicker = useCallback(async () => {
    const verifyPermission = async () => {
      const result = await imagePicker.requestCameraPermissionsAsync();

      if (result.status != "granted") {
        Alert.alert(
          "No permission granted",
          "You need to grant the app permission to take picture.",
          [{ text: "Okay" }]
        );
        return false;
      }
      return true;
    };

    const isPermisionGranted = await verifyPermission();
    if (!isPermisionGranted) return;
    const image = await imagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
  }, []);

  useEffect(() => {
    props.onImageTaken(pickedImage);
  }, [pickedImage]);

  return (
    <View style={styles.main}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.imageStyle} source={{ uri: pickedImage }} />
        )}
      </View>

      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={toggleImagePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  },
});
export default ImagePicker;
