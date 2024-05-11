import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Image,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import uuid from "react-native-uuid";

// Types
import {
  AuthNavScreenList,
  AuthStackParamList,
} from "src/scenes/auth/navigation/AuthNavConstants";

//Store
import {
  getAccountStatus,
  setAccountStatus,
  setCurrentUser,
  setMembers,
} from "src/store/slice/applicationSlice";
import { useAppDispatch, useAppSelector } from "src/store/storeHook";
import { AccountStatus } from "src/types/types";
import { RouteProp } from "@react-navigation/native";
import Screen from "src/components/Screen";
import colors from "src/theme/colors.theme";
import Typography from "src/components/Typography";
import InputField from "src/components/InputField";
import Button from "src/components/Button";
import api from "src/utils/api";
import KeyboardAwareView from "src/components/KeyboardAwareView";
import LinkButton from "src/components/LinkButton";
import Back from "src/components/Back";
import LoadingView from "src/components/LoadingView";
import { generateRandomUsers } from "src/mockData/mockUsers";
import { User } from "src/models/API";

// Interfaces
interface ILoginScreen {
  navigation: StackNavigationProp<
    AuthStackParamList,
    AuthNavScreenList.LOGIN_SCREEN
  >;
  route: RouteProp<AuthStackParamList, AuthNavScreenList.LOGIN_SCREEN>;
}

const LoginScreen = ({ navigation, route }: ILoginScreen) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const dispatch = useAppDispatch();

  const accountStatus = useAppSelector(getAccountStatus);

  const validation = () => {
    if (!username || username.length === 0) {
      Alert.alert("Validation Error", "Please enter username.");
      return false;
    }
    if (!password || password.length === 0) {
      Alert.alert("Validation Error", "Please enter password.");
      return false;
    }
    return true;
  };

  const onLoginPress = async () => {
    try {
      if (!validation()) return;
      const res = await api<any, any>({
        method: "GET",
        path: "login",
        params: {
          email: username,
          password: password,
        },
      });
      const user: User = {
        id: res.data._id,
        _id: res.data,
        first: res.data.first,
        last: res.data.last,
        email: res.data.email,
        username: res.data.user || "",
        location: [],
      };
      console.log("User", user);
      dispatch(setCurrentUser(user));
      dispatch(setMembers(generateRandomUsers(20)));
      dispatch(setAccountStatus(AccountStatus.SIGNED_IN));
    } catch (error) {
      console.log(error);
    }
  };

  const onRegisterPress = () => {
    navigation.navigate(AuthNavScreenList.REGISTER_SCREEN);
  };

  return (
    <Screen safeView={true}>
      <KeyboardAwareView>
        <Back onPress={() => navigation.goBack()} style={styles.back} />
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Typography variant="h3">Login</Typography>
          </View>
          <View style={styles.fieldContainer}>
            <InputField
              label="Enter your username"
              value={username || ""}
              placeholder="Username"
              onChangeText={(em) => setUsername(em)}
            />
            <InputField
              label="Enter password"
              value={password || ""}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(em) => setPassword(em)}
            />
            <Button title="Login" onPress={onLoginPress} />
            <LinkButton
              title="Don't have an account?"
              onPress={onRegisterPress}
            />
          </View>
        </View>
      </KeyboardAwareView>
      {isLoading && <LoadingView />}
    </Screen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    flex: 1,
    width: "100%",
    gap: 16,
    marginTop: 48,
  },
  logo: {
    width: 200,
    height: 200,
  },
  back: {
    marginStart: 24,
  },
});
