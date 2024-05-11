import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

//Store
import { RouteProp } from "@react-navigation/native";
import Screen from "src/components/Screen";

import {
  AppNavScreenList,
  AppStackParamList,
} from "../navigation/AppNavConstants";
import colors from "src/theme/colors.theme";
import Typography from "src/components/Typography";
import { useAppDispatch, useAppSelector } from "src/store/storeHook";
import { getUser } from "src/store/slice/accountSlice";
import Button from "src/components/Button";
import { setAccountStatus } from "src/store/slice/applicationSlice";
import { AccountStatus } from "src/types/types";

// Interfaces
interface IProfileScreen {
  navigation: StackNavigationProp<
    AppStackParamList,
    AppNavScreenList.PROFILE_SCREEN
  >;
  route: RouteProp<AppStackParamList, AppNavScreenList.PROFILE_SCREEN>;
}

const ProfileScreen = ({ navigation, route }: IProfileScreen) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const onLogoutPress = () => {
    dispatch(setAccountStatus(AccountStatus.SIGNED_OUT));
  };

  return (
    <Screen safeView={true}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <View style={styles.profileImageContainer}>
            {user.imageUrl && <Image style={styles.profileImage} />}
            {!user.imageUrl && <Typography variant="h3">TU</Typography>}
          </View>
          <View style={styles.nameContainer}>
            <Typography variant="h3">Testing User</Typography>
            <Typography variant="h5">testing@4.com</Typography>
          </View>
        </View>
        <View style={styles.midContainer}></View>
        <View>
          <Button title="Logout" onPress={onLogoutPress} />
        </View>
      </View>
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  headingContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  nameContainer: {
    gap: 3,
  },
  midContainer: {
    flex: 1,
  },
});
