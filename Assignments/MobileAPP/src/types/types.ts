import { User } from "../models/API";

export interface IAccount {
  user: User;
  accountType: AccountType;
}

export enum AccountType {
  ANONYMOUS_ACCOUNT,
  AUTHENTICATED,
}

export enum AccountStatus {
  SIGNED_IN = "signed_in",
  SIGNED_OUT = "signed_out",
  INACTIVE = "inactive",
}

export interface UserRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
