import React, { useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../Components/CustomHeaderButton";
import PlaceItem from "../Components/PlaceItem";
import { loadPlaces } from "../Store/places_actions";

const PlacesList = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: (options) => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            iconName={Platform.select({
              ios: "ios-add",
              android: "md-add",
            })}
            color={options.tintColor}
            onPress={() => {
              props.navigation.navigate("Add New Place");
            }}
          />
        </HeaderButtons>
      ),
    });
  }, []);
  const places = useSelector((rootState) => rootState.placesState.places);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);
  const renderList = ({ item }) => {
    return (
      <PlaceItem
        title={item.title}
        imageURL={item.imagePath}
        address={item.address}
        onViewSelect={() => {
          props.navigation.navigate("Details", {
            title: item.title,
            id: item.id,
          });
        }}
      />
    );
  };
  return <FlatList data={places} renderItem={renderList} />;
};

const styles = StyleSheet.create({});
export default PlacesList;
