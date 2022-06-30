import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function NewEntry_Template(props) {
  const {
    text,
    backgroundColor = colorDefinitions.light.blue,
    onPress,
  } = props;

  return (
    <Pressable
      style={[styles.container, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.textStyle}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    width: 180,
    height: 90,
    margin: 5,
    shadowColor: colorDefinitions.light.black,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  textStyle: {
    fontSize: 20,
    color: colorDefinitions.light.white,
  },
});
