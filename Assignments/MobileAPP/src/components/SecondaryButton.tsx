import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import Typography from "./Typography"; // Ensure this path is correct to import the Typography component
import colors from "src/theme/colors.theme"; // Adjust the path as necessary to import the colors

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>; // Adjust if necessary for more specific text styling within the button
}

const SecondaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      {...props}
    >
      <Typography variant="button" style={[styles.text, textStyle]}>
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    paddingHorizontal: 16,
    backgroundColor: colors.transparent,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.primary,
  },
});

export default SecondaryButton;
