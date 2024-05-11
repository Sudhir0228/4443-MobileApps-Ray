import { Candy, GroupChat } from "src/models/API";

export enum AppNavScreenList {
  BOTTOM_TAB_NAV = "BottomTabNav",
  DETAILS_SCREEN = "DetailsScreen",
  HOME_SCREEN = "HomeScreen",
  PROFILE_SCREEN = "ProfileScreen",
  MAP_SCREEN = "MapScreen",
  CHAT_GROUP_SCREEN = "ChatGroupScreen",
  CREATE_CHAT_SCREEN = "CreateChatScreen",
  CHAT_SCREEN = "ChatScreen",
}

export type AppStackParamList = {
  BottomTabNav: undefined;
  DetailsScreen: { candy: Candy };
  HomeScreen: undefined;
  ProfileScreen: undefined;
  MapScreen: undefined;
  ChatGroupScreen: undefined;
  CreateChatScreen: undefined;
  ChatScreen: { groupChat: GroupChat };
};
