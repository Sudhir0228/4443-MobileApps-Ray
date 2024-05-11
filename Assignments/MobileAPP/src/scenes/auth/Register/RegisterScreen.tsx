import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  Image,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

// Types
import {
  AuthNavScreenList,
  AuthStackParamList,
} from "src/scenes/auth/navigation/AuthNavConstants";

//Store
import {
  getAccountStatus,
  setAccountStatus,
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
import { getNameParts } from "src/utils/utils";
import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateUsername,
} from "src/utils/validation";

const logo = require("src/assets/images/logo.jpeg") as ImageSourcePropType;

// Interfaces
interface IRegister {
  navigation: StackNavigationProp<
    AuthStackParamList,
    AuthNavScreenList.REGISTER_SCREEN
  >;
  route: RouteProp<AuthStackParamList, AuthNavScreenList.REGISTER_SCREEN>;
}

const RegisterScreen = ({ navigation, route }: IRegister) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [fullName, setFullName] = useState<string>();
  const [emailAddress, setEmailAddress] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const dispatch = useAppDispatch();

  const validation = () => {
    if (!fullName || !validateFullName(fullName)) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid full name with at least two parts."
      );
      return false;
    }
    if (!emailAddress || !validateEmail(emailAddress)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return false;
    }
    if (!username || !validateUsername(username)) {
      Alert.alert(
        "Validation Error",
        "Username must be at least 4 characters long."
      );
      return false;
    }
    if (!password || !validatePassword(password)) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 8 characters long."
      );
      return false;
    }
    return true;
  };

  const onRegisterPress = async () => {
    if (!validation()) {
      return;
    }
    setIsLoading(true);
    try {
      const { first, last } = getNameParts(fullName);
      const res = await api<any, any>({
        method: "POST",
        path: "register",
        data: {
          first,
          last,
          email: emailAddress,
          user: username,
          password: password,
        },
      });
      console.log("register-res", res.data);
      setIsLoading(false);
      if (res.data) {
        navigation.navigate(AuthNavScreenList.LOGIN_SCREEN);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Screen safeView={true}>
      <KeyboardAwareView>
        <View>
          <Back onPress={() => navigation.goBack()} style={styles.back} />
        </View>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Typography variant="h3">Register</Typography>
          </View>
          <View style={styles.fieldContainer}>
            <InputField
              label="Full name"
              value={fullName || ""}
              placeholder="Enter your full name"
              onChangeText={(em) => setFullName(em)}
            />
            <InputField
              label="Email"
              value={emailAddress || ""}
              placeholder="Enter your email"
              onChangeText={(em) => setEmailAddress(em)}
              keyboardType="email-address"
            />
            <InputField
              label="Username"
              value={username || ""}
              placeholder="Enter your username"
              onChangeText={(em) => setUsername(em)}
              keyboardType="email-address"
            />
            <InputField
              label="Password"
              value={password || ""}
              placeholder="Enter password"
              secureTextEntry={true}
              onChangeText={(em) => setPassword(em)}
            />
            <Button title="Register" onPress={onRegisterPress} />
            <LinkButton
              title="Already have account?"
              onPress={() =>
                navigation.navigate(AuthNavScreenList.LOGIN_SCREEN)
              }
            />
          </View>
        </View>
      </KeyboardAwareView>
      {isLoading && <LoadingView />}
    </Screen>
  );
};

export default RegisterScreen;

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
    height: 60,
    position: "absolute",
    top: 0,
  },
  back: {
    position: "absolute",
    start: 0,
  },
});
