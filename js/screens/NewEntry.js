import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  FlatList,
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
import { addTemplate } from "../redux/actions/User";
import { addFinanceItem } from "../redux/actions/Finance";
import firebase from "../Firebase";
import { generateUUID, selectablePaymentMethods, uploadImage } from "../Helper";
import AppSafeAreaView from "../components/AppSafeAreaView";
import { ObjectItemPicker, StringItemPicker } from "../components/ItemPicker";
import NewEntry_Template from "../components/NewEntry_Template";
import NewEntry_Camera from "../components/NewEntry_Camera";
const colorDefinitions = require("../../assets/colorDefinition.json");

function NewEntry(props) {
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(
    Platform.OS === "ios"
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [store, setStore] = useState(props.currentUser.config.stores[0]);
  const [category, setCategory] = useState(
    props.currentUser.config.categories[0]
  );
  const [isExpense, setIsExpense] = useState(false);
  const [isSubscription, setIsSubscription] = useState(false);
  const [amount, setAmount] = useState(0.0);
  const [amountValue, setAmountValue] = useState(0.0);
  const [unit, setUnit] = useState("Rp");
  const [paymentMethod, setPaymentMethod] = useState(
    selectablePaymentMethods[0].value
  );
  const [imageUrl, setImageUrl] = useState("");

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

    setIsDatePickerVisible(Platform.OS === "ios");
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
    setImageUrl("");
  };

  const submitForm = async () => {
    if (imageUrl !== "") {
      const url = await uploadImage(imageUrl);
      setImageUrl(url);
    }

    let data = {
      title: title,
      description: description,
      date: date,
      store: store,
      category: category,
      amount: amountValue,
      currency: unit,
      paymentMethod: paymentMethod,
      imageUrl: imageUrl,
      isSubscription: isSubscription,
      userId: props.currentUser.userId,
      createdAt: new Date(),
      modifiedAt: new Date(),
    };

    firebase.db
      .collection("financialData")
      .add(data)
      .then((docRef) => {
        Alert.alert(
          "Data ditambahkan",
          "Data telah berhasil disimpan ke cloud"
        );

        data["docId"] = docRef.id;
        props.addFinanceItem(data);

        resetForm();
      })
      .catch((error) => {
        Alert.alert(
          "Kesalahan",
          "Terjadi kesalahan saat menyimpan ke cloud: " +
            error.message
        );
      });
  };

  const saveAsTemplate = () => {
    const data = {
      title: title,
      description: description,
      date: date,
      store: store,
      category: category,
      amount: amountValue,
      currency: "€",
      paymentMethod: paymentMethod,
      isSubscription: isSubscription,
      userId: props.currentUser.userId,
      createdAt: new Date(),
      modifiedAt: new Date(),
      templateColor: colorDefinitions.light.blue,
      templateId: generateUUID(),
    };

    props.addTemplate(data);

    firebase.db
      .collection("userProfiles")
      .doc(props.currentUser.userId)
      .update({
        "config.templates": firebase.fieldVal.arrayUnion(data),
      })
      .then(() => {
        Alert.alert(
          "Berhasil ditambahkan",
          "Template telah berhasil disimpan ke cloud"
        );
      })
      .catch((error) => {
        Alert.alert(
          "Kesalahan",
          "Terjadi kesalahan saat menyimpan ke cloud: " +
            error.message
        );
      });
  };

  return (
    <AppSafeAreaView title="Entri baru">
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS == "ios" ? 120 : 20}
        style={styles.container}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          {/* Templates */}
          <FlatList
            horizontal
            style={{ paddingVertical: 10 }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            data={props.currentUser.config.templates}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={(item) => item.templateId}
            renderItem={({ item }) => (
              <NewEntry_Template
                text={item.title}
                onPress={() => {
                  setTitle(item.title);
                  setDescription(item.description);
                  setDate(new Date());
                  if (item.amount < 0) {
                    setAmount(Math.abs(item.amount));
                    setIsExpense(true);
                  } else {
                    setAmount(item.amount);
                    setIsExpense(false);
                  }
                  setPaymentMethod(item.paymentMethod);
                  setCategory(item.category);
                  setStore(item.store);
                  setIsSubscription(item.isSubscription);
                }}
              />
            )}
          />

          {/* Form */}
          <View>
            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Nama</Text>
              <TextInput
                placeholder="Nama"
                style={styles.inputView_textInput}
                onChangeText={(val) => setTitle(val)}
                value={title}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Tanggal</Text>

              {/* https://github.com/react-native-datetimepicker/datetimepicker */}
              {Platform.OS === "android" && (
                <Button
                  title="Pilih tanggal"
                  style={styles.button}
                  onPress={() => setIsDatePickerVisible(true)}
                />
              )}
              {Platform.OS === "android" && (
                <Text style={styles.inputView_textInput}>{date.toDateString()}</Text>
              )}
              {isDatePickerVisible && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  onChange={onTimeChange}
                  value={date}
                />
              )}
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Pengeluaran</Text>
              <Switch
                onValueChange={() => {
                  setIsExpense((prevVal) => !prevVal);
                }}
                value={isExpense}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Jumlah</Text>
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

            <View>
              <View style={styles.inputView}>
                <Text style={styles.inputView_text}>Bezahlmethode</Text>
                <ObjectItemPicker
                  title="Pilih metode pembayaran: "
                  selectableItems={selectablePaymentMethods}
                  onValueChange={(val) => setPaymentMethod(val)}
                  value={paymentMethod}
                />
              </View>

              <View style={styles.inputView}>
                <Text style={styles.inputView_text}>Kategorie</Text>
                <StringItemPicker
                  title="Pilih kategori"
                  selectableItems={props.currentUser.config.categories}
                  onValueChange={(cat) => setCategory(cat)}
                  value={category}
                />
              </View>

              <View style={styles.inputView}>
                <Text style={styles.inputView_text}>Geschäft</Text>
                <StringItemPicker
                  title="Pilih toko"
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
                <Text style={styles.inputView_text}>Berlangganan</Text>
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

              <View style={styles.inputView}>
                <Pressable
                  onPress={() => {
                    setIsCameraVisible(true);
                  }}
                  style={[
                    styles.submitButton,
                    { backgroundColor: colorDefinitions.light.gray },
                  ]}
                >
                  <Ionicons
                    name="ios-camera-sharp"
                    size={20}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.submitButtonText}>Bild aufnehmen</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.submitButtonView}>
            <Pressable onPress={submitForm} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Eintrag speichern</Text>
            </Pressable>
          </View>

          <View style={styles.submitButtonView}>
            <Pressable onPress={saveAsTemplate} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>
                Als Template speichern
              </Text>
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
              setIsCameraVisible(false);
            }}
          />
        </View>
      )}
    </AppSafeAreaView>
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
  submitButtonView: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  submitButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colorDefinitions.light.blue,
    borderRadius: 5,
    marginVertical: 5,
    marginBottom: 10,
    padding: 5,
  },
  submitButtonText: {
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
  bindActionCreators({ addFinanceItem, addTemplate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewEntry);
