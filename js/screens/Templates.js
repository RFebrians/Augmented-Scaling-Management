import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Templates_List from "./Templates_List";
import Templates_Details from "./Templates_Details";
import Templates_Edit from "./Templates_Edit";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function Templates() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colorDefinitions.light.black },
        headerTintColor: colorDefinitions.light.white,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Template"
        component={Templates_List}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={Templates_Details}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="EditTemplate"
        component={Templates_Edit}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
