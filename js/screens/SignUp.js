import React, { useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import firebase from "../Firebase";

export default function SignUp(props) {
  const navigation = props.navigation;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVeri, setPasswordVeri] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState();

  const _signUp = async () => {
    if (!email) {
      setError("Bitte geben Sie eine E-Mail Adresse ein");
      return;
    } else if (!password && password.trim() && password.length > 6) {
      setError("Weak password, minimum 5 chars");
      return;
    } else if (password !== passwordVeri) {
      setError(
        "Die eingegebenen Passwörter stimmen nicht miteinander überein!"
      );
      return;
    }

    await _createUser(email, password);
  };

  const _createUser = async (email, password) => {
    try {
      let response = await firebase.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (response && response.user) {
        firebase.db
          .collection("userProfiles")
          .doc(response.user.uid)
          .set({
            userId: response.user.uid,
            name: name,
            email: email,
            config: {
              categories: [
                "keine Angabe",
                "Gehalt",
                "Versicherung",
                "Auto",
                "Miete",
                "Haushalt",
                "Lebensmittel",
                "Hobbys & Freizeit",
                "Technik",
              ],
              stores: [
                "keine Angabe",
                "Rewe",
                "Penny Markt",
                "Aldi Süd",
                "Aldi Nord",
                "Edeka",
                "Amazon",
                "Netflix",
                "Vodafone",
                "Telekom",
              ],
              templates: [],
            },
          })
          .then(() => {
            Alert.alert(
              "Account erstellt",
              "Dein Account wurde erfolgreich angelegt"
            );
            navigation.navigate("Login", {});
          })
          .catch((error) => {
            setError("Es ist ein Fehler aufgetreten: ", error.message);
          });
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>Registrierung</Text>
      <Text>Bitte füllen Sie die nachfolgenden Felder aus</Text>
      <TextInput
        placeholder="E-Mail Adresse"
        style={styles.inputStyle}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Passwort"
        style={styles.inputStyle}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Passwort bestätigen"
        style={styles.inputStyle}
        value={passwordVeri}
        onChangeText={setPasswordVeri}
        secureTextEntry
      />
      <TextInput
        placeholder="Name"
        style={styles.inputStyle}
        value={name}
        onChangeText={setName}
      />
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      <Button title="Account erstellen" onPress={_signUp} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputStyle: {
    alignSelf: "center",
    width: 200,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 0.2,
    borderColor: "black",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
