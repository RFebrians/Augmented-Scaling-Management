import React, { useEffect } from "react";
import { LogBox } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./js/redux/reducers/index";
import firebase from "./js/Firebase";
import OverviewList from "./js/screens/Overview";
import Templates from "./js/screens/Templates";
import Settings from "./js/screens/Settings";
import NewEntry from "./js/screens/NewEntry";
import Analysis from "./js/screens/Analysis";
import Login from "./js/screens/Login";
import SignUp from "./js/screens/SignUp";

LogBox.ignoreLogs(['Setting a timer']);
const colorDefinitions = require("./assets/colorDefinition.json");

export default function App() {
  const Stack = createStackNavigator();

  useEffect(() => {
    firebase.init();
  }, []);

  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <NavigationContainer>
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
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="MainNav"
            options={{ headerShown: false }}
            component={MainNav}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </Provider>
  );
}

function MainNav() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Brief-Summary" || "Overview":
              iconName = focused ? "ios-list" : "ios-list-outline";
              size = 25;
              break;
            case "Analisis" || "Analysis":
              iconName = focused ? "ios-analytics" : "ios-analytics-outline";
              size = 25;
              break;
            case "Entry-baru" || "NewEntry":
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
              size = 32;
              break;
            case "Template" || "Templates":
              iconName = focused ? "ios-layers" : "ios-layers-outline";
              size = 25;
              break;
            case "Settings" || "Settings":
              iconName = focused ? "ios-settings" : "ios-settings-outline";
              size = 25;
              break;
            default:
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colorDefinitions.light.blue,
        inactiveTintColor: colorDefinitions.light.gray,
        style: { backgroundColor: colorDefinitions.light.gray6 },
      }}
    >
      <Tab.Screen name="Brief-Summary" component={OverviewList} />
      <Tab.Screen name="Analisis" component={Analysis} />
      <Tab.Screen name="Entri-baru" component={NewEntry} />
      <Tab.Screen name="Template" component={Templates} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
