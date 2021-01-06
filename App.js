import React, { Component } from "react";
import LinkingConfiguration from "./navigation/LinkingConfiguration";
import { Platform, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ReallifeAPI } from "./ApiHandler";
import { NotifyHandler } from "./NotifyHandler";
// Components
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import { Ionicons } from "@expo/vector-icons";
import Settings from "./components/Settings";

const reallifeRPG = new ReallifeAPI();
const notifyHandler = new NotifyHandler();

export default class App extends Component {
  openSettings = () => this.settingsRef.open();

  async componentDidMount() {
    // Check is the ReallifeRPG API-Key was set
    const apiKey = await reallifeRPG.getApiKey();

    // TODO Check if this works
    if (apiKey !== null) {
      // Check if the expire date matches the notification date
      // const scheduledNotifications = await notifyHandler.getAllScheduledNotifications();
      // scheduledNotifications.forEach((notification) => {
      //   const creatorApiKey = notification.content.data.creatorKey; // Should return the Reallife API-Key
      //   const notificationIdentifier = notification.identifier;
      //   if (creatorApiKey === apiKey) {
      //     // TODO Check if the scheduled time still matches the house expiration
      //   } else {
      //     notifyHandler.cancelScheduledNotification(notificationIdentifier);
      //   }
      // });
    } else {
      this.openSettings();
      // notifyHandler.cancelAllScheduledNotifications();
    }
  }

  render() {
    const Stack = createStackNavigator();
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen
              name="Root"
              component={BottomTabNavigator}
              options={{
                headerStyle: {
                  backgroundColor: "#fff",
                  elevation: 0, // for android
                  shadowOpacity: 0, // for iOS
                  borderBottomWidth: 1,
                  borderBottomColor: "#ededed",
                },
                headerTintColor: "black",
                headerTitleStyle: {
                  fontWeight: "bold",
                  flexGrow: 1,
                  alignSelf: "center",
                  marginRight: -55 /* required to be in center bcause of the headerRight-element */,
                },
                headerRight: () => (
                  <TouchableWithoutFeedback onPress={this.openSettings}>
                    <Ionicons
                      style={{ marginRight: 25 }}
                      name="ios-settings"
                      size={28}
                      color="black"
                    />
                  </TouchableWithoutFeedback>
                ),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Settings ref={(modal) => (this.settingsRef = modal)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
