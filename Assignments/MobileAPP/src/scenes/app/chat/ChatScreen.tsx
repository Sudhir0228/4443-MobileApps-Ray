import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TextInput } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

//Store
import { RouteProp } from "@react-navigation/native";
import Screen from "src/components/Screen";

import {
  AppNavScreenList,
  AppStackParamList,
} from "../navigation/AppNavConstants";
import Typography from "src/components/Typography";
import SearchBar from "src/components/SearchBar";
import { Candy, Category, GroupChat, Member, Message } from "src/models/API";
import api from "src/utils/api";
import ChatGroupComponent from "./components/SentChatComponent";
import colors from "src/theme/colors.theme";
import InputField from "src/components/InputField";
import { useAppDispatch, useAppSelector } from "src/store/storeHook";
import {
  getCurrentUser,
  getGroupChatById,
  getGroupChats,
  updateGroupChat,
} from "src/store/slice/applicationSlice";
import SentChatComponent from "./components/SentChatComponent";
import Button from "src/components/Button";
import SecondaryButton from "src/components/SecondaryButton";
import uuid from "react-native-uuid";

// Interfaces
interface IChatGroupScreen {
  navigation: StackNavigationProp<
    AppStackParamList,
    AppNavScreenList.CHAT_SCREEN
  >;
  route: RouteProp<AppStackParamList, AppNavScreenList.CHAT_SCREEN>;
}

const ChatScreen = ({ navigation, route }: IChatGroupScreen) => {
  const groupChat = route.params.groupChat;
  const allChats = useAppSelector(getGroupChats);
  const chat = allChats?.find((chat) => chat.id === groupChat.id);
  const messages = allChats?.find((chat) => chat.id === groupChat.id)?.messages;
  const currentUser = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();

  const [createMessage, setCreateMessage] = useState<string>("");

  //Cta
  const onSentMessagePress = () => {
    if (createMessage.length === 0) {
      return;
    }
    if (!currentUser) {
      return;
    }
    const sender: Member = {
      id: currentUser.id,
      firstName: currentUser.first,
      lastName: currentUser.last,
    };

    const newMessage: Message = {
      id: uuid.v4().toString(),
      content: createMessage,
      sender: sender,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = messages ? [...messages, newMessage] : [newMessage];

    const updatedChat: GroupChat = {
      ...chat,
      id: chat?.id || "",
      name: chat?.name || "",
      members: chat?.members || [],
      messages: updatedMessages,
      latestMessage: newMessage,
      lastUpdated: newMessage.timestamp,
    };

    dispatch(updateGroupChat(updatedChat));
    setCreateMessage("");
  };

  const renderItem = (item: Message) => {
    const isSentByMe = item.sender.id === currentUser?.id;

    return (
      <>
        {isSentByMe && <SentChatComponent message={item} />}
        {!isSentByMe && <ChatGroupComponent message={item} />}
      </>
    );
  };

  const onChangeText = (text: string) => {
    setCreateMessage(text);
  };

  return (
    <Screen safeView={true} edges={["top"]}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderItem(item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.divider} />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <TextInput
            style={styles.input}
            value={createMessage}
            onChangeText={onChangeText}
            placeholder={"Type a message  "}
            autoCapitalize="none"
            secureTextEntry={false}
          />
          <SecondaryButton
            title="Send"
            style={styles.button}
            onPress={onSentMessagePress}
            disabled={createMessage.length === 0}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  searchBar: {
    marginTop: 16,
  },
  buttonContainer: {
    height: 100,
    backgroundColor: colors.white,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.border,
    opacity: 0.5,
  },
  button: {
    height: 32,
  },
  input: {
    flex: 1,
    margin: 23,
  },
});
