import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function CategoryListItem(props) {
  const { name } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorDefinitions.light.gray4,
    margin: 1,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    color: colorDefinitions.light.black,
  },
});
