import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppStateStatus } from "react-native";
import { generateRandomUsers } from "src/mockData/mockUsers";
import { GroupChat, Member, User } from "src/models/API";
import { AccountStatus } from "src/types/types";

interface IApplication {
  appState: AppStateStatus;
  accountStatus: AccountStatus;
  members?: Member[];
  groupChat?: GroupChat[];
  currentUser?: User;
}

const initialState: IApplication = {
  appState: "active" as AppStateStatus,
  accountStatus: AccountStatus.INACTIVE,
  members: generateRandomUsers(20),
  groupChat: undefined,
  currentUser: undefined,
};

// Slice
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setAppState: (state, action: PayloadAction<AppStateStatus>) => {
      state.appState = action.payload;
    },
    setAccountStatus: (state, action: PayloadAction<AccountStatus>) => {
      state.accountStatus = action.payload;
    },
    setMembers: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload;
    },
    createGroupChat: (state, action: PayloadAction<GroupChat>) => {
      state.groupChat = [...(state.groupChat || []), action.payload];
    },
    updateGroupChat: (state, action: PayloadAction<GroupChat>) => {
      state.groupChat = state.groupChat?.map((chat) =>
        chat.id === action.payload.id ? action.payload : chat
      );
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
});

// Actions
export const {
  setAppState,
  setAccountStatus,
  setMembers,
  createGroupChat,
  setCurrentUser,
  updateGroupChat,
} = applicationSlice.actions;

// Selectors
export const getApplication = ({
  application,
}: {
  application: IApplication;
}) => application;
export const getApplicationAppState = ({
  application,
}: {
  application: IApplication;
}) => application.appState;
export const getAccountStatus = ({
  application,
}: {
  application: IApplication;
}) => application.accountStatus;
export const getIsUserSigned = ({
  application,
}: {
  application: IApplication;
}) => application.accountStatus === AccountStatus.SIGNED_IN;

export const getMembers = ({ application }: { application: IApplication }) =>
  application.members;

export const getGroupChats = ({ application }: { application: IApplication }) =>
  application.groupChat;

export const getGroupChatById =
  ({ application }: { application: IApplication }) =>
  (id?: string) =>
    application.groupChat?.find((chat) => chat.id === id);

export const getCurrentUser = ({
  application,
}: {
  application: IApplication;
}) => application.currentUser;

export default applicationSlice.reducer;
