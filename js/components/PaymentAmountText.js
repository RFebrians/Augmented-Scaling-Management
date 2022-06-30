import React from "react";
import { View, Text, StyleSheet } from "react-native";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function PaymentAmountText(props) {
  const { value, currency, fontSize } = props;

  if (value < 0) {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[
            styles.textStyle,
            { color: colorDefinitions.light.red, fontSize: fontSize },
          ]}
        >
          {value}
        </Text>
        <Text
          style={[
            styles.textStyle,
            { color: colorDefinitions.light.red, fontSize: fontSize },
          ]}
        >
          {currency}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={{ flexDirection: "row" }}>
        <Text
          style={[
            styles.textStyle,
            { color: colorDefinitions.light.green, fontSize: fontSize },
          ]}
        >
          {value}
        </Text>
        <Text
          style={[
            styles.textStyle,
            { color: colorDefinitions.light.green, fontSize: fontSize },
          ]}
        >
          {currency}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
  },
});
