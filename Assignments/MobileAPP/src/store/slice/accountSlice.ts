import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "src/models/API";

import { IAccount, AccountType } from "src/types/types";

const initialState: IAccount = {
  user: { id: "" } as any,
  accountType: AccountType.ANONYMOUS_ACCOUNT,
};

// Slice
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setUserAccount: (state, action: PayloadAction<IAccount>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setAccountType: (state, action: PayloadAction<AccountType>) => {
      state.accountType = action.payload;
    },
    logOut: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("reset", (state, payload) => initialState);
  },
});

// Actions
export const { setUserInfo, setUserAccount, setAccountType, logOut } =
  accountSlice.actions;

// Selectors
export const getUserAccount = ({ account }: { account: IAccount }) => account;
export const getUserAccountType = ({ account }: { account: IAccount }) =>
  account.accountType;
export const getUser = ({ account }: { account: IAccount }) => account.user;

export default accountSlice.reducer;
