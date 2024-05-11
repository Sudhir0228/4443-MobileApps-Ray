
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import AppNavigator from "src/scenes/app/navigation/AppNavigator";

import { getIsUserSigned } from "src/store/slice/applicationSlice";
import { useAppSelector } from "src/store/storeHook";
import AuthNavigator from "./scenes/auth/navigation/AuthNavigator";

const Routes = () => {
  const isUserSignedIn = useAppSelector(getIsUserSigned);
  return (
    <NavigationContainer>
      {isUserSignedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Routes;
