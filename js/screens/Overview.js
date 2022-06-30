import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Overview_List from "./Overview_List";
import Overview_Details from "./Overview_Details";
import Overview_Edit from "./Overview_Edit";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function OverviewList() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: colorDefinitions.light.white,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Stack.Screen
        name="BriefSummary"
        component={Overview_List}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DetailOverview" component={Overview_Details} />
      <Stack.Screen name="EditOverview" component={Overview_Edit} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: colorDefinitions.light.black },
  headerTitle: { fontWeight: "bold" },
});
