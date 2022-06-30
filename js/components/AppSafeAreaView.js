import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function AppSafeAreaView(props) {
  const { title } = props;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.childContainer}>{props.children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: colorDefinitions.light.gray6,
  },
  childContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
