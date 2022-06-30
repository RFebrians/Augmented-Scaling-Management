import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PaymentAmountText from "./PaymentAmountText";
import PaymentMethodIcon from "./PaymentMethodIcon";
const colorDefinitions = require("../../assets/colorDefinition.json");

export default function OverviewListItem(props) {
  const { onPress, itemObject } = props;
  const {
    title,
    amount,
    paymentMethod,
    currency,
    date,
  } = itemObject;
  const dateFormatted = new Date(date);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <PaymentMethodIcon
        paymentMethod={paymentMethod}
        iconColor={colorDefinitions.light.white}
      />
      <View style={styles.containerText}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textDescr}>{dateFormatted.toDateString()}</Text>
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
    //backgroundColor: colorDefinitions.light.black,
    //opacity: 0.6,
    backgroundColor: "#717171",
    marginVertical: 2.5,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
  },
  containerText: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  containerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  },
  textDate: {
    fontSize: 12,
    fontWeight: "normal",
    color: colorDefinitions.light.white,
  },
});
