import React, { Component } from "react";
import { expo } from "../app.json";
// Components
import { View, StyleSheet, TouchableOpacity, Text, Linking, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ReallifeAPI } from "../ApiHandler";

const reallifeRPG = new ReallifeAPI();

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      apiKey: null,
    };
    this.website = "https://dulliag.de";
    this.issues = "https://github.com/tklein1801/A3RLRPG-Infoapp/";
  }

  saveNewKey = async () => {
    const { apiKey } = this.state;
    reallifeRPG.saveApiKey(apiKey);
    // TODO Display an toast to show the user that the key was saved successfully
    // this.close();
    // We're gonna delete all scheduled push notifications because we're now selecting data from a new player
    // notifyHandler.cancelAllScheduledNotification();
  };

  async componentDidMount() {
    this.setState({ apiKey: await reallifeRPG.getApiKey() });
  }

  render() {
    const { apiKey } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView horizontal={false} showsVerticalScrollIndicator={true}>
          <View style={styles.section}>
            <Text style={styles.heading}>Informationen</Text>
            <Text style={styles.label}>
              Name: <Text style={styles.text}>{expo.name}</Text>
            </Text>
            <Text style={styles.label}>
              Webseite:{" "}
              <Text style={styles.text} onPress={() => Linking.openURL(this.website)}>
                {this.website}
              </Text>
            </Text>
            <Text style={styles.label}>
              Quellcode:{" "}
              <Text style={styles.text} onPress={() => Linking.openURL(this.issues)}>
                GitHub
              </Text>
            </Text>
            <Text style={styles.label}>
              Version: <Text style={styles.text}>{expo.version}</Text>
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.formControl}>
              <Text style={styles.heading}>API-Key</Text>
              <TextInput
                style={styles.input}
                onChangeText={(value) => this.setState({ apiKey: value })}
                placeholder={"API-Key eingeben"}
                value={apiKey}
              />
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity activeOpacity={0.9} onPress={this.saveNewKey}>
                  <Text style={{ ...styles.button, ...styles.save }}>Speichern</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  section: {
    width: "90%",
    marginTop: 10,
    marginLeft: "5%",
  },
  formControl: {
    width: "100%",
    marginTop: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 22,
    color: "#333",
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    fontWeight: "normal",
  },
  input: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ededed",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  save: {
    backgroundColor: "#2196F3",
    color: "white",
  },
});
