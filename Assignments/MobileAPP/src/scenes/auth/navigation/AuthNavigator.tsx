import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Types
import {
  AuthNavScreenList,
  AuthStackParamList,
} from "src/scenes/auth/navigation/AuthNavConstants";

import LandingScreen from "../landing/LandingScreen";
import LoginScreen from "../login/LoginScreen";
import RegisterScreen from "../register/RegisterScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();
const { Navigator, Group, Screen } = Stack;

const AuthNavigator = () => {
  return (
    <Navigator
      initialRouteName={AuthNavScreenList.LANDING_SCREEN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name={AuthNavScreenList.LANDING_SCREEN}
        component={LandingScreen}
        options={{ orientation: "portrait" }}
      />
      <Screen
        name={AuthNavScreenList.LOGIN_SCREEN}
        component={LoginScreen}
        options={{ orientation: "portrait" }}
      />
      <Screen
        name={AuthNavScreenList.REGISTER_SCREEN}
        component={RegisterScreen}
        options={{ orientation: "portrait" }}
      />
    </Navigator>
  );
};

export default AuthNavigator;
