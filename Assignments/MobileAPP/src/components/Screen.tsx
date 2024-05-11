import React, { ReactNode } from "react";
import { View, ViewStyle, StatusBar, StyleSheet } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import colors from "src/theme/colors.theme";

interface IScreen {
  children: ReactNode | ReactNode[];
  safeView?: boolean;
  rootStyle?: ViewStyle;
  edges?: Edge[];
}

const Screen = ({
  children,
  safeView = true,
  rootStyle = {},
  edges = ["top", "right", "bottom", "left"],
}: IScreen) => {
  const RootContainer = safeView ? SafeAreaView : View;
  return (
    <RootContainer style={[styles.root, rootStyle]} edges={edges}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {children}
    </RootContainer>
  );
};

export default Screen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
});
