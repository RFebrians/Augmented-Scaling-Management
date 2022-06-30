import React, { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
const colorDefinitions = require("../../assets/colorDefinition.json");

export function OverflowMenuContainer(props) {
  const { closeAction, menuType } = props;
  const [viewBottom, setViewBottom] = useState(false);
  const [viewTopRight, setViewTopRight] = useState(false);
  const opacity = useState(new Animated.Value(0))[0];

  function fadeIn() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  function fadeOut() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(({ finished }) => {
      /* completion callback */
      closeAction();
    });
  }

  useEffect(() => {
    switch (menuType) {
      case "bottom":
        setViewBottom(true);
        break;
      case "topRight":
        setViewTopRight(true);
        break;
      default:
        setViewBottom(true);
        break;
    }
    fadeIn();
  }, []);

  return (
    <Pressable onPress={fadeOut} style={StyleSheet.absoluteFill}>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: opacity }]}>
        <BlurView
          intensity={90}
          style={[
            StyleSheet.absoluteFill,
            viewTopRight && styles.component_Right,
            viewBottom && styles.component_Bottom,
          ]}
        >
          <View
            style={[
              styles.menuContainer,
              viewTopRight && styles.menu_Right,
              viewBottom && styles.menu_Bottom,
            ]}
          >
            {props.children}
          </View>
        </BlurView>
      </Animated.View>
    </Pressable>
  );
}

export function OverflowMenuItem(props) {
  const { text, textColor = colorDefinitions.light.blue, action } = props;

  return (
    <View style={styles.componentContainer}>
      <Pressable onPress={action} style={styles.menuItem}>
        <Text style={[styles.menuItemText, { color: textColor }]}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: colorDefinitions.light.gray5,
    borderRadius: 10,
    shadowColor: colorDefinitions.light.black,
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  menuItemText: {
    fontSize: 20,
  },
  component_Bottom: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  component_Right: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: 10,
    paddingRight: 10,
  },
  menu_Bottom: {
    width: "90%",
  },
  menu_Right: {
    width: "50%",
  },
});
