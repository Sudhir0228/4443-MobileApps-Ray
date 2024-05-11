import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Providers from "src/Providers";
import Routes from "src/Routes";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Roboto_400Regular,
          Roboto_700Bold,
          Roboto_500Medium,
          Roboto_900Black,
        });
        await new Promise((resolve: any) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Providers>
          <Routes />
        </Providers>
      </GestureHandlerRootView>
    </View>
  );
}
