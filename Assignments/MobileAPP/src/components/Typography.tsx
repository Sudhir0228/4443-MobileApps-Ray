import React from "react";
import {
  Text,
  StyleSheet,
  TextProps,
  StyleProp,
  TextStyle,
} from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_300Light,
  Roboto_400Regular_Italic,
} from "@expo-google-fonts/roboto";
import colors from "src/theme/colors.theme";

interface TypographyProps extends TextProps {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "bodyBold"
    | "bodyItalic"
    | "caption"
    | "overline"
    | "button"
    | "link";
  style?: StyleProp<TextStyle>;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant,
  style,
  ...props
}) => {
  const variantStyles = styles[variant] || styles.body;
  return (
    <Text style={[styles.color, variantStyles, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: { fontSize: 26, fontFamily: "Roboto_700Bold" },
  h2: { fontSize: 24, fontFamily: "Roboto_700Bold" },
  h3: { fontSize: 20, fontFamily: "Roboto_700Bold" },
  h4: { fontSize: 18, fontFamily: "Roboto_400Regular" },
  h5: { fontSize: 16, fontFamily: "Roboto_400Regular" },
  h6: { fontSize: 14, fontFamily: "Roboto_400Regular" },
  body: { fontSize: 16, fontFamily: "Roboto_400Regular" },
  bodyBold: { fontSize: 16, fontFamily: "Roboto_700Bold" },
  bodyItalic: { fontSize: 16, fontFamily: "Roboto_400Regular_Italic" },
  caption: { fontSize: 12, fontFamily: "Roboto_300Light" },
  overline: {
    fontSize: 10,
    fontFamily: "Roboto_400Regular",
    textTransform: "uppercase",
  },
  button: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    textTransform: "uppercase",
  },
  link: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    textDecorationLine: "underline",
  },
  color: {
    color: colors.black,
  },
});

export default Typography;
