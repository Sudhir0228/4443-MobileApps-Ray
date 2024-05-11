// ShopDetails.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "src/components/Typography";
import { Candy } from "src/models/API";
import { parseProductName } from "src/utils/utils";

export interface ShopDetailsProps {
  candy: Candy;
}
const ShopDetails = (props: ShopDetailsProps) => {
  const { name, desc } = props.candy;
  const { mainName, quantity } = parseProductName(name);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Typography variant="h2" style={styles.name}>
          {mainName}
        </Typography>
        {quantity && (
          <View style={[styles.status, { backgroundColor: "#4CAF50" }]}>
            <Typography variant="h3" style={styles.statusText}>
              {quantity}
            </Typography>
          </View>
        )}
      </View>
      <Typography variant="h5" style={styles.desc}>
        {desc}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    flex: 1,
  },
  status: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  desc: {
    fontSize: 18,
    marginTop: 24,
    lineHeight: 30,
  },
});

export default ShopDetails;
