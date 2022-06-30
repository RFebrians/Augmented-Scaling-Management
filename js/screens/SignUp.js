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
      setError("silahkan masukan alamat email");
      return;
    } else if (!password && password.trim() && password.length > 7) {
      setError("Password minimal 6 karakter");
      return;
    } else if (password !== passwordVeri) {
      setError(
        "Password yang dimasukkan tidak cocok"
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
                "tidak ada informasi",
                "Gaji",
                "Asuransi",
                "Mobil",
                "Sewa",
                "Rumah tangga",
                "Kebutuhan Pokok",
                "Hobi",
                "Teknologi",
              ],
              stores: [
                "Tidak ada Informasi",
                "Supermarket",
                "Alfamart",
                "Mall",
                "Pasar",
                "Shopee",
                "Tokopedia",
                "PLN",
                "WiFi",
                "PAM",
              ],
              templates: [],
            },
          })
          .then(() => {
            Alert.alert(
              "Akun telah dibuat",
              "Akun anda telah berhasil dibuat"
            );
            navigation.navigate("Login", {});
          })
          .catch((error) => {
            setError("Sebuah kesalahan telah terjadi: ", error.message);
          });
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 40, marginBottom: 20 }}>Daftar</Text>
      <Text>Silakan isi kolom di bawah ini</Text>
      <TextInput
        placeholder="Alamat Email"
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
      <TextInput
        placeholder="Konfirmasi Password"
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
      <Button title="Buat Akun" onPress={_signUp} />
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
