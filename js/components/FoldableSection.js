import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function FoldableSection(props) {
  const { cardTitle } = props;
  const [displayOptional, setDisplayOptional] = useState(false);

  return (
    <View>
      <Pressable
        onPress={() => setDisplayOptional(!displayOptional)}
        style={[
          styles.cardMainClosed,
          !displayOptional && styles.cardMainOpenAdd,
        ]}
      >
        <Text style={styles.cardTitle}>{cardTitle}</Text>
        {!displayOptional && (
          <Ionicons
            name="arrow-back"
            size={24}
            color={colorDefinitions.light.white}
          />
        )}
        {displayOptional && (
          <Ionicons
            name="arrow-down"
            size={24}
            color={colorDefinitions.light.white}
          />
        )}
      </Pressable>
      {displayOptional && <View style={styles.children}>{props.children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    color: colorDefinitions.light.white,
    fontSize: 20,
  },
  cardMainClosed: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colorDefinitions.light.gray2,
    padding: 10,
    marginTop: 20,
    marginHorizontal: 5,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardMainOpenAdd: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  children: {
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: colorDefinitions.light.gray3,
    padding: 10,
    marginHorizontal: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
