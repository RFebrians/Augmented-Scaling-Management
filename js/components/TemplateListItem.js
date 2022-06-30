import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PaymentAmountText from "./PaymentAmountText";
import PaymentMethodIcon from "./PaymentMethodIcon";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function TemplateListItem(props) {
  const { onPress, itemObject } = props;
  const {
    title,
    description,
    amount,
    paymentMethod,
    currency,
    category,
    store,
  } = itemObject;

  const minimizeText = (text) => {
    if (text.length > 100) {
      text = text.substring(0, 100);
      text = text + "...";
    }
    return text;
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <PaymentMethodIcon
        paymentMethod={paymentMethod}
        iconColor={colorDefinitions.light.white}
      />
      <View style={styles.containerText}>
        <Text style={styles.textTitle}>{title}</Text>
        {category !== "" && <Text style={styles.textDescr}>{category}</Text>}
        {store !== "" && <Text style={styles.textDescr}>{store}</Text>}
        {description !== "" && (
          <Text style={styles.textDescr}>{minimizeText(description)}</Text>
        )}
      </View>
      <PaymentAmountText value={amount} currency={currency} fontSize={20} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colorDefinitions.light.black,
    opacity: 0.7,
    padding: 10,
    margin: 2,
    borderRadius: 5,
  },
  containerText: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colorDefinitions.light.white,
  },
  textDescr: {
    fontSize: 16,
    fontWeight: "normal",
    color: colorDefinitions.light.white,
    marginLeft: 5,
  },
});
