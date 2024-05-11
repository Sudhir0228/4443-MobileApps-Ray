import React from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import { SafeAreaProvider } from "react-native-safe-area-context";

// Store
import store from "src/store/store";

// Localization
import "src/localization/i18n.config";

const persistor = persistStore(store);

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default Providers;
