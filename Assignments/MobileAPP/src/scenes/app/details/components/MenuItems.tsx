// MenuItems.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "src/components/Typography";
import { MenuItem } from "src/models/API";

export interface IMenuItemProps {
  items: MenuItem[];
}
const MenuItems = ({ items }: IMenuItemProps) => {
  return (
    <View style={styles.container}>
      <Typography variant="h3" style={styles.header}>
        Menu
      </Typography>
      <View style={styles.itemContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemCard}>
            <Typography variant="h5" style={styles.itemName}>
              {item.name}
            </Typography>
            <Typography variant="h4" style={styles.itemPrice}>
              ${item.price.toFixed(2)}
            </Typography>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 8,
  },
  itemCard: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemContainer: {
    marginTop: 24,
  },
});

export default MenuItems;
