import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import AppSafeAreaView from "../components/AppSafeAreaView";
import TemplateListItem from "../components/TemplateListItem";

function Templates_List(props) {
  const navigation = props.navigation;

  return (
    <AppSafeAreaView title="Template">
      <View style={styles.container}>
        {props.currentUser.config.templates.length > 0 && (
          <FlatList
            data={props.currentUser.config.templates}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={(item) => item.templateId}
            renderItem={({ item }) => (
              <TemplateListItem
                itemObject={item}
                onPress={() =>
                  navigation.navigate("DetailTemplate", {
                    itemObject: JSON.stringify(item),
                  })
                }
              />
            )}
          />
        )}
        {props.currentUser.config.templates.length === 0 && (
          <Text style={{ alignSelf: "center", fontSize: 20, opacity: 0.5 }}>
            Tidak ada template yang tersedia
          </Text>
        )}
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
});

const mapStateToProps = (state) => {
  return { currentUser: state.user };
};

export default connect(mapStateToProps)(Templates_List);
