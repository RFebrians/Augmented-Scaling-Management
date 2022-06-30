import React from "react";
import { StyleSheet, Text, View } from "react-native";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function Details_InputContainer(props) {
  const { title, text, children, containerStyle } = props;

  return (
    <View
      style={[
        {
          backgroundColor: colorDefinitions.light.gray5,
          padding: 10,
          marginVertical: 5,
          marginHorizontal: 2,
          borderRadius: 10,
        },
        containerStyle,
      ]}
    >
      <Text
        style={{
          color: colorDefinitions.light.black,
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 4,
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: colorDefinitions.light.black,
          fontSize: 18,
        }}
      >
        {text}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  bottomContainer: {
    width: "100%",
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
});
