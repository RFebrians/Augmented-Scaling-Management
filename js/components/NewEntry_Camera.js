import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  StyleSheet,
  Pressable,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function NewEntry_Template(props) {
  const { onCancel, onSavePicture } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [isPreviewVisible, setIsPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  let camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const __takePicture = async () => {
    const picture = await camera.takePictureAsync();
    setCapturedImage(picture);
    setIsPreviewVisible(true);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setIsPreviewVisible(false);
  };

  const __savePicture = () => {
    onSavePicture(capturedImage);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!isPreviewVisible && (
        <Camera
          style={styles.camera}
          type={type}
          ref={(r) => {
            camera = r;
          }}
        >
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onCancel}>
              <Ionicons name="close-circle-sharp" size={24} color="white" />
            </Pressable>
            <Pressable style={styles.button} onPress={__takePicture}>
              <Ionicons name="ios-camera-outline" size={24} color="white" />
            </Pressable>
          </View>
        </Camera>
      )}
      {isPreviewVisible && (
        <View
          style={{
            backgroundColor: "transparent",
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <ImageBackground
            source={{ uri: capturedImage && capturedImage.uri }}
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                padding: 15,
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  onPress={__retakePicture}
                  style={styles.previewButton}
                >
                  <Ionicons
                    name="ios-reload-circle-sharp"
                    size={18}
                    color="white"
                  />
                  <Text style={styles.previewButtonText}>Neuer Versuch</Text>
                </Pressable>
                <Pressable onPress={__savePicture} style={styles.previewButton}>
                  <Ionicons name="ios-save-sharp" size={18} color="white" />
                  <Text style={styles.previewButtonText}>Bild speichern</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  previewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colorDefinitions.light.gray,
    borderRadius: 5,
    padding: 5,
  },
  previewButtonText: {
    alignSelf: "center",
    fontSize: 18,
    color: colorDefinitions.light.white,
    paddingVertical: 5,
    marginLeft: 2,
  },
});
