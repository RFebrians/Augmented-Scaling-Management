import React from "react";
import { View } from "react-native";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function Hr(props) {
  const { thickness = 0.5, color = colorDefinitions.light.gray4 } = props;
  return (
    <View
      style={{
        borderWidth: thickness,
        borderColor: color,
        marginVertical: 4,
      }}
    />
  );
}
