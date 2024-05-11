import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import colors from "src/theme/colors.theme";

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backdrop,
  },
});

export default LoadingView;
