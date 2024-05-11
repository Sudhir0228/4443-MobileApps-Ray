import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  AppNavScreenList,
  AppStackParamList,
} from "src/scenes/app/navigation/AppNavConstants";
import TabsNavigator from "src/scenes/app/navigation/TabsNavigator";
import colors from "src/theme/colors.theme";
import DetailsScreen from "../details/DetailsScreen";
import CreateChatScreen from "../createChat/CreateChatScreen";
import ChatScreen from "../chat/ChatScreen";

const Stack = createNativeStackNavigator<AppStackParamList>();
const { Navigator, Screen } = Stack;

const AppNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.backgroundFill },
      }}
    >
      <Screen
        name={AppNavScreenList.BOTTOM_TAB_NAV}
        component={TabsNavigator}
        options={{
          animation: "none",
        }}
      />

      <Screen
        name={AppNavScreenList.DETAILS_SCREEN}
        component={DetailsScreen}
        options={{
          animation: "none",
          headerShown: false,
          headerBackTitle: "Back",
          title: "Details",
        }}
      />
      <Screen
        name={AppNavScreenList.CREATE_CHAT_SCREEN}
        component={CreateChatScreen}
        options={{
          animation: "none",
          headerShown: true,
          headerBackTitle: "Back",
          title: "Create Chat Group",
        }}
      />
      <Screen
        name={AppNavScreenList.CHAT_SCREEN}
        component={ChatScreen}
        options={{
          animation: "none",
          headerShown: true,
          headerBackTitle: "Back",
          title: "Chat",
        }}
      />
    </Navigator>
  );
};

export default AppNavigator;
