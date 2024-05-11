import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { AppNavScreenList } from "src/scenes/app/navigation/AppNavConstants";
import colors from "src/theme/colors.theme";
import ProfileScreen from "../profile/ProfileScreen";
import HomeScreen from "../home/HomeScreen";
import MapScreen from "../map/MapScreen";
import ChatGroupScreen from "../chatGroup/ChatGroupScreen";

const home = require("src/assets/icons/tab_home.png") as ImageSourcePropType;
const profile =
  require("src/assets/icons/tab_profile.png") as ImageSourcePropType;
const map = require("src/assets/icons/tab_map.png") as ImageSourcePropType;
const chat = require("src/assets/icons/tab_chat.png") as ImageSourcePropType;

const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab as any;

const TabsNavigator = (): JSX.Element => {
  const { t } = useTranslation();

  const initialScreen = AppNavScreenList.HOME_SCREEN;

  return (
    <Navigator
      initialRouteName={initialScreen}
      screenOptions={({ route }: any) => ({
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.black,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ focused }: any) => {
          let iconImage;
          const style = focused ? styles.iconActive : styles.icon;
          switch (route.name) {
            case AppNavScreenList.HOME_SCREEN:
              iconImage = <Image source={home} style={style} />;
              break;
            case AppNavScreenList.MAP_SCREEN:
              iconImage = <Image source={map} style={style} />;
              break;
            case AppNavScreenList.PROFILE_SCREEN:
              iconImage = <Image source={profile} style={style} />;
              break;
            case AppNavScreenList.CHAT_GROUP_SCREEN:
              iconImage = <Image source={chat} style={style} />;
              break;
            default:
              break;
          }
          return iconImage;
        },
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: ((tabRoute) => {})(route),
      })}
      backBehavior="none"
      sceneContainerStyle={{ backgroundColor: colors.white }}
    >
      <Screen
        name={AppNavScreenList.HOME_SCREEN}
        component={HomeScreen}
        options={{ tabBarLabel: t("Candy House") || "" }}
      />
      <Screen
        name={AppNavScreenList.MAP_SCREEN}
        component={MapScreen}
        options={{ tabBarLabel: t("Map") || "" }}
      />

      <Screen
        name={AppNavScreenList.CHAT_GROUP_SCREEN}
        component={ChatGroupScreen}
        options={{ tabBarLabel: t("Chat") || "" }}
      />
      <Screen
        name={AppNavScreenList.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ tabBarLabel: t("User") || "" }}
      />
    </Navigator>
  );
};

export default TabsNavigator;

const styles = StyleSheet.create({
  contentContainer: {
    display: "flex",
    backgroundColor: colors.white,
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  label: {
    fontFamily: "Roboto_500Medium",
    textTransform: "uppercase",
  },
  shadowStyle: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 9,
  },
  icon: {
    height: 24,
    width: 24,
  },
  iconActive: {
    height: 24,
    width: 24,
    tintColor: colors.primary,
  },
});
