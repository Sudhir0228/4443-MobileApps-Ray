import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import colors from "src/theme/colors.theme";
import { Ionicons } from "@expo/vector-icons";

interface BackProps extends TouchableOpacityProps {
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
}

const Back: React.FC<BackProps> = ({ onPress, buttonStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      hitSlop={8}
    >
      <Ionicons name="arrow-back-outline" size={24} color={colors.black} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginStart: 16,
  },
});

export default Back;
