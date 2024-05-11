import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import colors from "src/theme/colors.theme";
import Typography from "./Typography";

import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}

const SearchBar: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder = "",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search-outline" size={24} color={colors.black} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={false}
        keyboardType={"web-search"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    gap: 10,
    flexDirection: "row",
    borderColor: colors.gray,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  input: {
    height: 50,

    fontFamily: "Roboto_400Regular",
    fontSize: 16,
  },
});

export default SearchBar;
