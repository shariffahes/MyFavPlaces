import React, { useReducer, useCallback, useState } from "react";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import ImagePicker from "../Components/ImagePicker";
import LocationPicker from "../Components/LocationPicker";

import Colors from "../Constants/Colors";
import { addPalce } from "../Store/places_actions";

const formReducer = (state, action) => {
  if (action.type === "UPDATE") {
    const updatedValues = {
      ...state.inputValue,
      [action.identifier]: action.value,
    };
    const updatedValidity = {
      ...state.inputValidity,
      [action.identifier]: action.validity,
    };
    let validation = true;
    for (const value in updatedValidity) {
      validation = validation && updatedValidity[value];
    }
    return {
      ...state,
      inputValue: updatedValues,
      inputValidity: updatedValidity,
      formValidity: validation,
    };
  }
  return state;
};

const NewPlacePage = (props) => {
  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValue: { name: "", selectedImage: "", address: { lat: "", long: "" } },
    inputValidity: { name: false, selectedImage: false, coordinates: false },
    formValidity: false,
  });

  const dispatch = useDispatch();
  const onChangeHandler = useCallback(
    (input, identifier) => {
      let isValid = true;

      if (!input || input.length === 0) isValid = false;
      dispatchForm({
        type: "UPDATE",
        identifier,
        value: input,
        validity: isValid,
      });
    },
    [dispatchForm]
  );

  const submit = () => {
    if (!formState.formValidity) return;
    dispatch(
      addPalce(
        formState.inputValue.name,
        formState.inputValue.selectedImage,
        formState.inputValue.coordinates
      )
    ).catch((error) =>
      Alert.alert("Error", error.toString(), [
        { text: "dismiss", style: "default" },
      ])
    );
    props.navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="eg. Eiffel Tower"
          onChangeText={(input) => {
            onChangeHandler(input, "name");
          }}
        />
        <ImagePicker
          onImageTaken={(imageUri) => {
            onChangeHandler(imageUri, "selectedImage");
          }}
        />
        <LocationPicker
          navigation={props.navigation}
          route={props.route}
          onPickLocationHandler={(coordinates) => {
            onChangeHandler(coordinates, "coordinates");
          }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Save" color={Colors.primary} onPress={submit} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  buttonContainer: {
    margin: 10,

    alignSelf: "center",
  },
});
export default NewPlacePage;
