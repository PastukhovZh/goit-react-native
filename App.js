import React, { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import { SplashScreen } from 'react-native'

import Main from "./src/components/Main";
import { store } from "./src/redux/store";


export default function App() {

  const [fontsLoaded] = useFonts({
    RobotoBold: require("./src/assets/fonts/Roboto/Roboto-Bold.ttf"),
    Roboto: require("./src/assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
    <Main onLayout={onLayout}/>
    </Provider>
  );
}

{
  //   /* {routing} */
}
// auth
