import React from "react";
import { Animated, StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function SwipeableActionItem(props) {
  const { text, color, x, progress, onPress } = props;

  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
  });

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
      <RectButton
        style={[styles.buttonStyle, { flex: 1, backgroundColor: color }]}
        onPress={onPress}
      >
        <Text style={styles.textStyle}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 10,
    padding: 5,
    marginRight: 3,
    marginVertical: 3,
  },
  textStyle: {
    alignSelf: "center",
    color: colorDefinitions.light.white,
  },
});
