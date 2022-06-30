import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import firebase from "../Firebase";
import { loadUser } from "../redux/actions/User";
import { loadFinanceData } from "../redux/actions/Finance";

function Login(props) {
  const navigation = props.navigation;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const _signIn = async () => {
    try {
      let response = await firebase.auth.signInWithEmailAndPassword(
        email,
        password
      );
      if (response && response.user) {
        //Message
        alert("Login erfolgreich", "Willkommen zurück");

        // Get User Data from Firebase
        _getUserProfile(response.user.uid);

        // Get Financial Data from Firebase
        _getFinanceData(response.user.uid);

        //Navigate
        _navMain();
      }
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      setEmail("");
      setPassword("");
    }
  };

  const _getUserProfile = async (userId) => {
    const docUser = await firebase.db
      .collection("userProfiles")
      .doc(userId)
      .get();

    if (!docUser.exists) {
      console.log("Informasi pengguna tidak dapat ditemukan");
      return;
    }

    const userData = await docUser.data();

    if (userData.config.templates) {
      userData.config.templates.forEach((element) => {
        element.date = element.date.toDate();
        element.createdAt = element.createdAt.toDate();
        element.modifiedAt = element.modifiedAt.toDate();
      });
    }

    props.loadUser(userData);
  };

  const _getFinanceData = async (userId) => {
    const dataArray = [];
    const snapshot = await firebase.db
      .collection("financialData")
      .where("userId", "==", userId)
      .get();

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    snapshot.forEach(async (doc) => {
      const docData = await doc.data();
      docData.date = docData.date.toDate();
      docData.createdAt = docData.createdAt.toDate();
      docData.modifiedAt = docData.modifiedAt.toDate();
      docData.docId = doc.id;
      dataArray.push(docData);
    });

    props.loadFinanceData(dataArray);
  };

  const _navMain = () => {
    navigation.navigate("MainNav", {});
    navigation.reset({
      index: 0,
      routes: [{ name: "MainNav" }],
    });
  };

  const _navSignUp = () => {
    navigation.navigate("SignUp", {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>Willkommen zurück</Text>
      <Text>Bitte loggen Sie sich ein</Text>
      <View>
        <TextInput
          placeholder="Email"
          style={styles.inputStyle}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputStyle}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {errorMessage !== "" && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
        <Button title="Sign In" style={styles.button} onPress={_signIn} />
        <Button
          title="Register"
          style={styles.button}
          onPress={_navSignUp}
        />
      </View>
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
  button: {
    marginVertical: 5,
  },
  errorText: {
    fontSize: 15,
    color: "red",
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

const mapStateToProps = (state) => {
  return { userProfile: state.currentUser };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ loadUser, loadFinanceData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
