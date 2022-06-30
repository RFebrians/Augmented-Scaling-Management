import React from "react";
import { View, Modal, StyleSheet } from "react-native";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function CustomModal(props) {
  return (
    <Modal animationType="slide" transparent={true} visible={props.isVisible}>
      <View style={styles.container}>
        <View style={styles.modalView}>{props.children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    alignItems: "center",
    margin: 20,
    padding: 35,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },
});
