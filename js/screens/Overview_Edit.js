import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import CurrencyInput from "react-native-currency-input";
import { Ionicons } from "@expo/vector-icons";
import { updateFinanceItem } from "../redux/actions/Finance";
import firebase from "../Firebase";
import { selectablePaymentMethods, uploadImage } from "../Helper";
import NewEntry_Camera from "../components/NewEntry_Camera";
import { ObjectItemPicker, StringItemPicker } from "../components/ItemPicker";
const colorDefinitions = require("../../assets/colorDefinition.json");

function Overview_Edit(props) {
  const route = props.route;
  const navigation = props.navigation;

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(Platform.OS === 'ios');
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [store, setStore] = useState();
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState(0.0);
  const [amountValue, setAmountValue] = useState(0.0);
  const [unit, setUnit] = useState("€");
  const [isExpense, setIsExpense] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(
    selectablePaymentMethods[0].value
  );
  const [isSubscription, setIsSubscription] = useState(false);
  const [createdAt, setCreatedAt] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [docId, setDocId] = useState();
  const [isNewImage, setIsNewImage] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: "Edit entri",
    });

    const item = JSON.parse(route.params.itemObject);
    let expense = false;

    if (parseFloat(item.amount) < 0.0) {
      expense = true;
    } else {
      expense = false;
    }

    setTitle(item.title);
    setDescription(item.description);
    setDate(new Date(item.date));
    setStore(item.store);
    setCategory(item.category);
    setAmount(Math.abs(item.amount));
    setIsExpense(expense);
    setPaymentMethod(item.paymentMethod);
    setIsSubscription(item.isSubscription);
    setImageUrl(item.imageUrl);
    setCreatedAt(new Date(item.createdAt));
    setDocId(item.docId);
  }, [route.params.itemObject]);

  useEffect(() => {
    if (isExpense) {
      if (amount > 0) {
        setAmountValue(amount * -1);
      } else {
        setAmountValue(amount);
      }
    } else {
      if (amount < 0) {
        setAmountValue(amount * -1);
      } else {
        setAmountValue(amount);
      }
    }
  }, [isExpense, amount]);

  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setIsDatePickerVisible(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate(new Date());
    setStore(props.currentUser.config.stores[0]);
    setCategory(props.currentUser.config.categories[0]);
    setAmount(0.0);
    setPaymentMethod(selectablePaymentMethods[0].value);
    setIsSubscription(false);
  };

  const saveEntry = async () => {
    if (isNewImage) {
      const url = await uploadImage(imageUrl);
      setImageUrl(url);
    }

    const data = {
      title: title,
      description: description,
      date: date,
      store: store,
      category: category,
      amount: amountValue,
      currency: unit,
      paymentMethod: paymentMethod,
      isSubscription: isSubscription,
      userId: props.currentUser.userId,
      createdAt: createdAt,
      modifiedAt: new Date(),
      docId: docId,
      imageUrl: imageUrl,
    };

    props.updateFinanceItem(data);

    firebase.db
      .collection("financialData")
      .doc(docId)
      .update(data)
      .then(() => {
        Alert.alert(
          "Berhasil",
          "Data telah berhasil disimpan ke cloud"
        );
      })
      .catch((error) => {
        Alert.alert(
          "Kesalahan",
          "Terjadi kesalahan saat menyimpan ke cloud: " +
          error.message
        );
      });

    resetForm();
    navigation.navigate("Brief-Summary");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 120 : 20}
        style={styles.container}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Titel</Text>
              <TextInput
                placeholder="Nama"
                style={styles.inputView_textInput}
                onChangeText={(val) => setTitle(val)}
                value={title}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Datum</Text>
              {/* https://github.com/react-native-datetimepicker/datetimepicker */}
              {Platform.OS === "android" && <Button
                title="Pilih tanggal"
                style={styles.button}
                onPress={() => setIsDatePickerVisible(true)}
              />}
              {Platform.OS === "android" && (
                <Text style={styles.inputView_textInput}>{date.toDateString()}</Text>
              )}
              {isDatePickerVisible && <DateTimePicker
                mode="date"
                display="default"
                onChange={onTimeChange}
                value={date}
              />}
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Ausgabe</Text>
              <Switch
                onValueChange={() => setIsExpense((prevVal) => !prevVal)}
                value={isExpense}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Betrag</Text>
              <CurrencyInput
                value={amountValue}
                onChangeValue={setAmount}
                unit={unit}
                delimiter=","
                separator="."
                precision={2}
                style={styles.inputView_textInput}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Jenis pembayaran</Text>
              <ObjectItemPicker
                title="Pilih metode pembayaran"
                selectableItems={selectablePaymentMethods}
                onValueChange={(val) => setPaymentMethod(val)}
                value={paymentMethod}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Kategori</Text>
              <StringItemPicker
                title="Pilih kategori :"
                selectableItems={props.currentUser.config.categories}
                onValueChange={(cat) => setCategory(cat)}
                value={category}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Toko</Text>
              <StringItemPicker
                title="Pilih toko:"
                selectableItems={props.currentUser.config.stores}
                onValueChange={(cat) => setStore(cat)}
                value={store}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Keterangan</Text>
              <TextInput
                placeholder="Keterangan"
                style={styles.inputView_textInput}
                onChangeText={(val) => setDescription(val)}
                value={description}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Langganan</Text>
              <Switch
                onValueChange={() => setIsSubscription((prevVal) => !prevVal)}
                value={isSubscription}
              />
            </View>

            {imageUrl !== "" && (
              <View style={[styles.inputView, { height: 150 }]}>
                <Image
                  style={{ flex: 1, height: null, width: null }}
                  resizeMode="contain"
                  source={{ url: imageUrl }}
                />
              </View>
            )}

            <View
              style={[
                styles.inputView,
                { flexDirection: "row", justifyContent: "space-evenly" },
              ]}
            >
              <Pressable
                onPress={() => {
                  setIsCameraVisible(true);
                }}
                style={[
                  styles.button,
                  { backgroundColor: colorDefinitions.light.gray },
                ]}
              >
                <Ionicons
                  name="ios-camera-sharp"
                  size={20}
                  color="white"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.buttonText}>Ambil gambar</Text>
              </Pressable>

              {imageUrl !== "" && (
                <Pressable
                  onPress={() => {
                    setImageUrl("");
                  }}
                  style={[
                    styles.button,
                    { backgroundColor: colorDefinitions.light.red },
                  ]}
                >
                  <Ionicons
                    name="ios-camera-sharp"
                    size={20}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.buttonText}>Hapus gambar</Text>
                </Pressable>
              )}
            </View>
          </View>

          <View style={styles.buttonView}>
            <Pressable style={styles.button} onPress={saveEntry}>
              <Text style={styles.buttonText}>Perbarui entri</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {isCameraVisible && (
        <View style={StyleSheet.absoluteFill}>
          <NewEntry_Camera
            onCancel={() => {
              setIsCameraVisible(false);
            }}
            onSavePicture={(pic) => {
              setImageUrl(pic.uri);
              setIsNewImage(true);
              setIsCameraVisible(false);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inputView_text: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  inputView_textInput: {
    fontSize: 18,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  inputView: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
  },
  buttonView: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorDefinitions.light.blue,
    borderRadius: 5,
    marginVertical: 5,
    marginBottom: 10,
    padding: 5,
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 18,
    color: colorDefinitions.light.white,
    paddingVertical: 5,
  },
});

const mapStateToProps = (state) => {
  return { currentUser: state.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ updateFinanceItem }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Overview_Edit);
