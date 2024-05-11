import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

//Store
import { RouteProp } from "@react-navigation/native";
import Screen from "src/components/Screen";

import {
  AppNavScreenList,
  AppStackParamList,
} from "../navigation/AppNavConstants";
import { ScrollView } from "react-native-gesture-handler";
import { mockCandyShops } from "src/mockData/mockCandyShops";
import Typography from "src/components/Typography";
import Back from "src/components/Back";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShopDetails from "./components/ShopDetails";
import MenuItems from "./components/MenuItems";
import colors from "src/theme/colors.theme";

const shop_thumbnail = require("src/assets/images/shop_thumbnail.jpeg");
// Interfaces
interface IDetailsScreen {
  navigation: StackNavigationProp<
    AppStackParamList,
    AppNavScreenList.DETAILS_SCREEN
  >;
  route: RouteProp<AppStackParamList, AppNavScreenList.DETAILS_SCREEN>;
}

const DetailsScreen = ({ navigation, route }: IDetailsScreen) => {
  const insets = useSafeAreaInsets();
  const candy = route.params.candy;
  const { img_url } = candy;
  const source = img_url ? { uri: img_url } : shop_thumbnail;

  return (
    <Screen safeView={false}>
      <ScrollView style={styles.container}>
        <View style={styles.imageHeader}>
          <Image source={source} style={styles.image} />
          <View style={styles.divider} />
          <View style={{ top: insets.top, position: "absolute" }}>
            <Back
              style={[styles.backButton, { top: 100 }]}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
        <ShopDetails candy={candy} />
      </ScrollView>
    </Screen>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageHeader: {
    width: "100%",
    height: 400,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  contentContainer: {
    padding: 16,
  },
  shopName: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  shopHours: {
    fontSize: 18,
    marginBottom: 16,
  },
  statusIndicator: {
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    alignItems: "center",
  },
  statusText: {
    color: "white",
  },
  menuHeader: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
  },
  backButton: {
    position: "absolute",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.border,
    opacity: 0.5,
  },
});
