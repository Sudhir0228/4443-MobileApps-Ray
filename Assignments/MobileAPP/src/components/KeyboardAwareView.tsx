import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "src/theme/colors.theme";

interface IKeyboardAwareView {
  children: React.ReactNode;
  viewStyle?: StyleProp<ViewStyle>;
}

const KeyboardAwareView = ({ children, viewStyle }: IKeyboardAwareView) => {
  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      style={viewStyle}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareView;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
});
