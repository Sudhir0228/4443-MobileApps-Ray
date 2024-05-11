import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageSourcePropType, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

// Types
import {
  AuthNavScreenList,
  AuthStackParamList,
} from "src/scenes/auth/navigation/AuthNavConstants";

//Store
import { RouteProp } from "@react-navigation/native";
import Screen from "src/components/Screen";
import colors from "src/theme/colors.theme";
import Typography from "src/components/Typography";
import Button from "src/components/Button";
import { useTranslation } from "react-i18next";
import KeyboardAwareView from "src/components/KeyboardAwareView";
import SecondaryButton from "src/components/SecondaryButton";

const logo = require("src/assets/images/logo.jpeg") as ImageSourcePropType;

// Interfaces
interface ILandingScreen {
  navigation: StackNavigationProp<
    AuthStackParamList,
    AuthNavScreenList.LANDING_SCREEN
  >;
  route: RouteProp<AuthStackParamList, AuthNavScreenList.LANDING_SCREEN>;
}

const LandingScreen = ({ navigation, route }: ILandingScreen) => {
  // Hooks
  const { t } = useTranslation();

  const onLoginPress = () => {
    navigation.navigate(AuthNavScreenList.LOGIN_SCREEN);
  };

  const onRegisterPress = () => {
    navigation.navigate(AuthNavScreenList.REGISTER_SCREEN);
  };

  return (
    <Screen safeView={true}>
      <KeyboardAwareView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={logo} style={styles.logo} />
            <Typography variant="h3">{t("landing.welcome")}</Typography>
          </View>
          <Typography variant="h4" style={styles.description}>
            {t("landing.updatedDescription")}
          </Typography>
          <View
            style={{ width: "100%", flex: 1, justifyContent: "space-between" }}
          >
            <View style={{ flex: 1 }} />
            <View style={styles.fieldContainer}>
              <Button title="Already have account?" onPress={onLoginPress} />
              <SecondaryButton
                title="Create an account"
                onPress={onRegisterPress}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareView>
    </Screen>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 48,
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  description: {
    marginTop: 32,
    marginBottom: 32,
    textAlign: "center",
  },
});
