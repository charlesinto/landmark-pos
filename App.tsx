import "react-native-gesture-handler";

import React, { useEffect, useRef } from "react";
import { BackHandler, StyleSheet, useColorScheme, View } from "react-native";

import SplashScreen from "react-native-splash-screen";
import Onboarding from "./src/screen/onboarding";

import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Loading from "./src/Loading";
import FlashMessage from "react-native-flash-message";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducers from "./src/reducers";
import AuthState from "./src/AuthState";
import Login from "./src/screen/auth/Login";
import { NativeBaseProvider } from "native-base";
import Record from "./src/screen/Record";
import CustomerDetail from "./src/screen/Record/CustomerDetail";

const Stack = createStackNavigator();

const TabNavigator = createBottomTabNavigator();

export const store = createStore(reducers, applyMiddleware(thunk));

const App = () => {
  const myLocalFlashMessage = useRef();
  useEffect(() => {}, []);

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home">
            <Stack.Screen
              options={{ headerShown: false }}
              name="home"
              component={AuthState}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="CustomerDetail"
              component={CustomerDetail}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="appHome"
              component={Record}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Loading />
        <FlashMessage
          hideOnPress
          duration={4000}
          position="top"
          ref={myLocalFlashMessage.current}
        />
      </Provider>
    </NativeBaseProvider>
  );
};

//contentInsetAdjustmentBehavior="automatic"

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    marginHorizontal: 24,
  },
  optionalContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  optionalText: {
    fontFamily: "SFUIText-Regular",
    fontSize: 18,
  },
  highlightText: {
    marginLeft: 8,
    color: "#007AFF",
  },

  onBoardingTextContatiner: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  onBoardingText: {
    color: "#808080",
    fontSize: 18,
    fontFamily: "SFUIText-Light",
  },
});

export default App;
