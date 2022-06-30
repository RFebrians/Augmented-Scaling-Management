import React, { useState, useLayoutEffect } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { deleteTemplate } from "../redux/actions/User";
import firebase from "../Firebase";
import { selectablePaymentMethods } from "../Helper";
import {
  OverflowMenuContainer,
  OverflowMenuItem,
} from "../components/OverflowMenu";
import Hr from "../components/HorizontalRule";
import DetailsContainer from "../components/DetailsContainer";
const colorDefinitions = require("../../assets/colorDefinition.json");

function Templates_Details(props) {
  const route = props.route;
  const navigation = props.navigation;
  const [displayHeaderMenu, setDisplayHeaderMenu] = useState(false);

  const item = JSON.parse(route.params.itemObject);
  item.date = new Date(item.date);
  item.createdAt = new Date(item.createdAt);
  item.modifiedAt = new Date(item.modifiedAt);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Details zu Vorlage",
      headerRight: () => (
        <Pressable
          onPress={() => setDisplayHeaderMenu(!displayHeaderMenu)}
          style={{ padding: 10 }}
        >
          <Ionicons name="ellipsis-horizontal-sharp" size={24} color="white" />
        </Pressable>
      ),
    });
  }, [navigation, displayHeaderMenu]);

  const onPressEdit = () => {
    navigation.navigate("Bearbeiten", {
      itemObject: route.params.itemObject,
    });
  };

  const onPressDelete = () => {
    console.log("Delete item: " + item.templateId);

    props.deleteTemplate(item.templateId);

    firebase.db
      .collection("userProfiles")
      .doc(props.currentUser.userId)
      .update({
        "config.templates": props.currentUser.config.templates.filter(
          (element) => element.templateId !== item.templateId
        ),
      })
      .then(() => {
        Alert.alert(
          "Löschen erfolgreich 🗑️",
          "Das Template " + item.title + " wurde gelöscht"
        );
      })
      .catch((error) => {
        Alert.alert(
          "Fehler",
          "Beim Löschen ist ein Fehler aufgetreten: " + error.message
        );
      });

    navigation.navigate("Vorlagen");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <Text>{displayHeaderMenu}</Text>
        <Pressable
          style={styles.contentContainer}
          onPress={() => setDisplayHeaderMenu(false)}
        >
          <DetailsContainer title="Titel" text={item.title} />
          <DetailsContainer title="Betrag" text={item.amount + item.currency} />
          <DetailsContainer
            title="Bezahlmethode"
            text={
              selectablePaymentMethods.find(
                (el) => el.value === item.paymentMethod
              ).label
            }
          />
          <DetailsContainer title="Geschäft" text={item.store} />
          <DetailsContainer title="Kategorie" text={item.category} />
          {item.description !== "" && (
            <DetailsContainer title="Beschreibung" text={item.description} />
          )}
        </Pressable>
      </ScrollView>

      {displayHeaderMenu && (
        <OverflowMenuContainer
          menuType="topRight"
          closeAction={() => setDisplayHeaderMenu(false)}
          bottom
        >
          <OverflowMenuItem text="Edit" action={onPressEdit} />
          <Hr />
          <OverflowMenuItem text="Delete" action={onPressDelete} />
        </OverflowMenuContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  bottomContainer: {
    width: "100%",
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => {
  return { currentUser: state.user };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ deleteTemplate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Templates_Details);
