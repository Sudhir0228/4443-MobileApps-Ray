import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

//Store
import { RouteProp } from "@react-navigation/native";
import Screen from "src/components/Screen";

import {
  AppNavScreenList,
  AppStackParamList,
} from "../navigation/AppNavConstants";
import Typography from "src/components/Typography";
import SearchBar from "src/components/SearchBar";
import CandyCardComponent from "./components/CandyCardComponent";
import { Candy, Category } from "src/models/API";
import api from "src/utils/api";
import CategoriesComponent from "./components/CategoriesComponent";

// Interfaces
interface IHomeScreen {
  navigation: StackNavigationProp<
    AppStackParamList,
    AppNavScreenList.HOME_SCREEN
  >;
  route: RouteProp<AppStackParamList, AppNavScreenList.HOME_SCREEN>;
}

const HomeScreen = ({ navigation, route }: IHomeScreen) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [candies, setCandies] = React.useState<Candy[]>();
  const [categories, setCategories] = React.useState<Category[]>();

  const fetchCandies = async () => {
    try {
      const res = await api<Candy, Candy[]>({
        method: "GET",
        path: "candies",
      });

      if (res.data) {
        setCandies(res.data);
      }
    } catch (error) {
      console.log("Error fetching candies", error);
    }
  };

  // CTA
  const onSearchTextChange = (text: string) => {
    setSearchText(text);
    setSearchText(text);
    const filteredShops = candies?.filter((shop) =>
      shop.name.toLowerCase().includes(text.toLowerCase())
    );
    setCandies(filteredShops);
  };

  const onShopCardPress = (shop: Candy) => {
    navigation.navigate(AppNavScreenList.DETAILS_SCREEN, { candy: shop });
  };

  const renderItem = (item: Candy) => {
    return (
      <CandyCardComponent
        name={item.name}
        price={item.price}
        description={item.desc}
        imageUrl={item.img_url}
        onPress={() => onShopCardPress(item)}
      />
    );
  };

  useEffect(() => {
    fetchCandies();
  }, []);

  return (
    <Screen safeView={true} edges={["top"]}>
      <View style={styles.container}>
        <Typography variant="h3">Sweet Delights! 🍬</Typography>
        <SearchBar
          onChangeText={onSearchTextChange}
          value={searchText}
          placeholder="Search candies"
          style={styles.searchBar}
        />
        {/* <CategoriesComponent
          categories={categories || []}
          onCategorySelect={(id) => fetchCandiesByCategory(id)}
        /> */}
        <FlatList
          data={candies}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => renderItem(item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  searchBar: {
    marginTop: 16,
  },
});
