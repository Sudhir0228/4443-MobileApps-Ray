import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

//Store
import { RouteProp } from "@react-navigation/native";
import Screen from "src/components/Screen";

import {
  AppNavScreenList,
  AppStackParamList,
} from "../navigation/AppNavConstants";
import Typography from "src/components/Typography";
import { GroupChat } from "src/models/API";
import ChatGroupComponent from "./components/ChatGroupComponent";
import { useAppSelector } from "src/store/storeHook";
import { getGroupChats } from "src/store/slice/applicationSlice";
import colors from "src/theme/colors.theme";

const plus = require("src/assets/icons/plus.png") as ImageSourcePropType;

// Interfaces
interface IChatGroupScreen {
  navigation: StackNavigationProp<
    AppStackParamList,
    AppNavScreenList.CHAT_SCREEN
  >;
  route: RouteProp<AppStackParamList, AppNavScreenList.CHAT_SCREEN>;
}

const ChatGroupScreen = ({ navigation, route }: IChatGroupScreen) => {
  const groupChat = useAppSelector(getGroupChats);

  // Cta
  const onCreateChatPress = () => {
    console.log("Create Chat Pressed");
    navigation.navigate(AppNavScreenList.CREATE_CHAT_SCREEN);
  };
  const onGroupChatPress = (chat: GroupChat) => {
    navigation.navigate(AppNavScreenList.CHAT_SCREEN, { groupChat: chat });
  };

  const renderItem = (item: GroupChat) => {
    return (
      <ChatGroupComponent
        groupChat={item}
        onPress={() => onGroupChatPress(item)}
      />
    );
  };

  return (
    <Screen safeView={true} edges={["top"]}>
      <View style={styles.container}>
        <Typography variant="h3">Messages</Typography>
        <FlatList
          data={groupChat}
          keyExtractor={(item) => item.name.toString()}
          renderItem={({ item }) => renderItem(item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.createChat} onPress={onCreateChatPress}>
        <Image source={plus} style={styles.icon} />
      </TouchableOpacity>
    </Screen>
  );
};

export default ChatGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  createChat: {
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    width: 60,
    backgroundColor: colors.primary,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 32,
    width: 32,
    tintColor: colors.white,
  },
});
