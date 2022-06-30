import React, { useState, useEffect } from "react";
import { Button, Text, Modal, StyleSheet, View, Pressable } from "react-native";
import { BlurView } from "expo-blur";
import { Picker } from "@react-native-picker/picker";
const colorDefinitions = require("../../assets/colorDefinition.json");

export function ObjectItemPicker(props) {
  const { selectableItems, onValueChange, title, value } = props;
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState(selectableItems[0].value);

  useEffect(() => {
    setSelectedValue(value);
    setSelectedIndex(selectableItems.findIndex((x) => x.value === value));
  }, [value]);

  const closeModal = () => {
    setShowCategoryPicker(!showCategoryPicker);
    onValueChange(selectedValue);
  };

  return (
    <View>
      <Pressable
        style={{
          backgroundColor: colorDefinitions.light.gray5,
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => setShowCategoryPicker(!showCategoryPicker)}
      >
        <Text style={{ color: colorDefinitions.light.blue, fontSize: 18 }}>
          {selectableItems[selectedIndex].label}
        </Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showCategoryPicker}
      >
        <BlurView
          intensity={100}
          tint="dark"
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              opacity: 1,
            },
          ]}
        >
          <Pressable onPress={() => setShowCategoryPicker(false)}>
            <View style={styles.centeredView}>
              <Pressable>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{title}</Text>
                  <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 200, marginBottom: 150 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedValue(itemValue);
                      setSelectedIndex(itemIndex);
                    }}
                  >
                    {selectableItems.map((cat, index) => (
                      <Picker.Item
                        key={index}
                        label={cat.label}
                        value={cat.value}
                      />
                    ))}
                  </Picker>
                  <Button
                    title="Konfirmasi Pilihan"
                    onPress={() => closeModal()}
                  />
                </View>
              </Pressable>
            </View>
          </Pressable>
        </BlurView>
      </Modal>
    </View>
  );
}

export function StringItemPicker(props) {
  const { title, selectableItems, onValueChange, value } = props;
  const [showPicker, setShowPicker] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectableItems[0]);

  useEffect(() => {
    setSelectedItem(value);
  }, [value]);

  const closeModal = () => {
    setShowPicker(!showPicker);
    onValueChange(selectedItem);
  };

  return (
    <View>
      <Pressable
        style={{
          backgroundColor: colorDefinitions.light.gray5,
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => setShowPicker(!showPicker)}
      >
        <Text style={{ color: colorDefinitions.light.blue, fontSize: 18 }}>
          {value}
        </Text>
      </Pressable>

      <Modal animationType="fade" transparent={true} visible={showPicker}>
        <BlurView
          intensity={100}
          tint="dark"
          style={[
            StyleSheet.absoluteFill,
            {
              alignItems: "center",
              justifyContent: "center",
              opacity: 1,
            },
          ]}
        >
          <Pressable onPress={() => setShowPicker(false)}>
            <View style={styles.centeredView}>
              <Pressable>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{title}</Text>
                  <Picker
                    selectedValue={selectedItem}
                    style={{ height: 50, width: 200, marginBottom: 150 }}
                    onValueChange={(itemValue) => {
                      setSelectedItem(itemValue);
                    }}
                  >
                    {selectableItems.map((cat, index) => (
                      <Picker.Item key={index} label={cat} value={cat} />
                    ))}
                  </Picker>
                  <Button
                    title="konfirmasi pilihan"
                    onPress={() => closeModal()}
                  />
                </View>
              </Pressable>
            </View>
          </Pressable>
        </BlurView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: colorDefinitions.light.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
