import { combineReducers } from "@reduxjs/toolkit";
import accountReducer from "src/store/slice/accountSlice";
import applicationReducer from "src/store/slice/applicationSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  application: applicationReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;
