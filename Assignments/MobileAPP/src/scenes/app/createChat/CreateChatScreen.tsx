import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import uuid from "react-native-uuid";

//Store
import { RouteProp } from "@react-navigation/native";
import Screen from "src/components/Screen";

import {
  AppNavScreenList,
  AppStackParamList,
} from "../navigation/AppNavConstants";
import Typography from "src/components/Typography";

import { Candy, Category, GroupChat, Member } from "src/models/API";
import { useAppDispatch, useAppSelector } from "src/store/storeHook";
import {
  createGroupChat,
  getCurrentUser,
  getMembers,
  setMembers,
} from "src/store/slice/applicationSlice";
import MemberItemComponent from "./components/MemberItemComponent";
import InputField from "src/components/InputField";
import Button from "src/components/Button";
import colors from "src/theme/colors.theme";

// Interfaces
interface ICreateChatScreen {
  navigation: StackNavigationProp<
    AppStackParamList,
    AppNavScreenList.CREATE_CHAT_SCREEN
  >;
  route: RouteProp<AppStackParamList, AppNavScreenList.CREATE_CHAT_SCREEN>;
}

const CreateChatScreen = ({ navigation, route }: ICreateChatScreen) => {
  const members = useAppSelector(getMembers) || [];
  const currentUser = useAppSelector(getCurrentUser);
  const [groupName, setGroupName] = useState<string>("");
  const [selectedMembers, setSelectedMembers] = useState<Member[]>();
  const [message, setMessage] = useState<string>("");
  const dispatch = useAppDispatch();

  const validation = () => {
    if (!groupName || (groupName.length === 0 && members.length > 1)) {
      Alert.alert("Validation Error", "Please enter group name.");
      return false;
    }

    if (!selectedMembers || selectedMembers.length === 0) {
      Alert.alert("Validation Error", "Please select at least one member.");
      return false;
    }

    return true;
  };
  // Cta
  const onCreateGroupPress = () => {
    if (validation()) {
      let name = groupName;
      const createdUser: Member = {
        id: currentUser?.id || "",
        firstName: currentUser?.first || "",
        lastName: currentUser?.last || "",
      };

      if (selectedMembers?.length === 1 && groupName.length === 0) {
        name = `${createdUser.firstName} And ${selectedMembers[0].firstName}`;
      }
      const groupChat: GroupChat = {
        id: uuid.v4().toString(),
        name: name,
        members: [createdUser, ...(selectedMembers || [])],
        messages: [],
        lastUpdated: new Date().toISOString(),
      };
      dispatch(createGroupChat(groupChat));
      navigation.goBack();
    }
  };

  const onMemberPress = (member: Member) => {
    const isSelected =
      selectedMembers?.some((m) => m.id === member.id) || false;
    if (isSelected) {
      setSelectedMembers(selectedMembers?.filter((m) => m.id !== member.id));
    } else {
      setSelectedMembers([...(selectedMembers || []), member]);
    }
  };

  const renderItem = (item: Member) => {
    const isSelected =
      selectedMembers?.some((member) => member.id === item.id) || false;
    return (
      <MemberItemComponent
        member={item}
        isSelected={isSelected}
        onPress={() => onMemberPress(item)}
      />
    );
  };

  return (
    <Screen safeView={false}>
      <View style={styles.container}>
        <View style={styles.fieldContainer}>
          <InputField
            label="Enter Group name"
            value={groupName}
            placeholder="Group Name"
            onChangeText={(em) => setGroupName(em)}
          />
          <Typography variant="h4">Select Members</Typography>
          <FlatList
            data={members}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => renderItem(item)}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Create Group" onPress={onCreateGroupPress} />
        </View>
      </View>
    </Screen>
  );
};

export default CreateChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  searchBar: {
    marginTop: 16,
  },
  fieldContainer: {
    gap: 16,
    flex: 1,
    paddingBottom: 24,
  },
  buttonContainer: {
    height: 100,
    backgroundColor: colors.white,
  },
});
