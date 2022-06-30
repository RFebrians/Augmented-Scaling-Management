import React, { useState, useEffect } from "react";
import {
  Alert,
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
import { updateTemplate } from "../redux/actions/User";
import firebase from "../Firebase";
import { selectablePaymentMethods } from "../Helper";
import { ObjectItemPicker, StringItemPicker } from "../components/ItemPicker";
const colorDefinitions = require("../../assets/colorDefinition.json");

function Templates_Edit(props) {
  const route = props.route;
  const navigation = props.navigation;

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
  const [templateId, setTemplateId] = useState();
  const [createdAt, setCreatedAt] = useState();

  useEffect(() => {
    navigation.setOptions({
      title: "Bearbeiten der Vorlage",
    });

    const item = JSON.parse(route.params.itemObject);
    let expense = false;
    let amount = 0.0;

    if (item.amount < 0.0) {
      expense = true;
      amount = Math.abs(item.amount);
    } else {
      expense = false;
      amount = Math.abs(item.amount);
    }

    setTitle(item.title);
    setDescription(item.description);
    setDate(new Date(item.date));
    setStore(item.store);
    setCategory(item.category);
    setAmount(amount);
    setIsExpense(expense);
    setPaymentMethod(item.paymentMethod);
    setIsSubscription(item.isSubscription);
    setTemplateId(item.templateId);
    setCreatedAt(new Date(item.createdAt));
  }, []);

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

  const saveTemplate = () => {
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
      templateColor: colorDefinitions.light.blue,
      templateId: templateId,
    };

    props.updateTemplate(data);

    firebase.db
      .collection("userProfiles")
      .doc(props.currentUser.userId)
      .update({
        "config.templates": props.currentUser.config.templates.map((item) => {
          if (item.templateId === data.templateId) {
            return data;
          }
          return item;
        }),
      })
      .then(() => {
        Alert.alert(
          "Erfolgreich aktualisiert",
          "Die Daten wurden erfolgreich in der Cloud gespeichert"
        );
      })
      .catch((error) => {
        Alert.alert(
          "Fehler",
          "Beim Speichern in der Cloud ist ein Fehler aufgetreten: " +
            error.message
        );
      });

    resetForm();
    navigation.navigate("Vorlagen");
  };

  return (
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
              placeholder="Titel"
              style={styles.inputView_textInput}
              onChangeText={(val) => setTitle(val)}
              value={title}
            />
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

          <View>
            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Bezahlmethode</Text>
              <ObjectItemPicker
                title="Wählen Sie eine Bezahlmethode aus:"
                selectableItems={selectablePaymentMethods}
                onValueChange={(val) => setPaymentMethod(val)}
                value={paymentMethod}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Kategorie</Text>
              <StringItemPicker
                title="Wählen Sie eine Kategorie aus:"
                selectableItems={props.currentUser.config.categories}
                onValueChange={(cat) => setCategory(cat)}
                value={category}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Geschäft</Text>
              <StringItemPicker
                title="Wählen Sie ein Geschäft aus:"
                selectableItems={props.currentUser.config.stores}
                onValueChange={(cat) => setStore(cat)}
                value={store}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Beschreibung</Text>
              <TextInput
                placeholder="Beschreibung"
                style={styles.inputView_textInput}
                onChangeText={(val) => setDescription(val)}
                value={description}
              />
            </View>

            <View style={styles.inputView}>
              <Text style={styles.inputView_text}>Abonnement</Text>
              <Switch
                onValueChange={() => setIsSubscription((prevVal) => !prevVal)}
                value={isSubscription}
              />
            </View>
          </View>
        </View>

        <View style={styles.submitButtonView}>
          <Pressable onPress={saveTemplate} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Template speichern</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  bindActionCreators({ updateTemplate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Templates_Edit);
