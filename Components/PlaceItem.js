import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Colors from "../Constants/Colors";

const PlaceItem = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onViewSelect}>
      <View style={styles.main}>
        <Image
          style={styles.image}
          source={{
            uri: props.imageURL,
          }}
        />
        <View style={styles.infoContainer}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
            {props.title}
          </Text>
          <Text>props.address</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  main: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    height: 80,
    width: "90%",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 10,
  },
  image: {
    backgroundColor: "#ccc",
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 10,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
});

export default PlaceItem;
