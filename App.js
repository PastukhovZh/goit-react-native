// App.js
import React, { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import useRoute from "./route";
import Home from "./Screens/Main/Home";

export default function App() {
  const routing = useRoute(false);

  // підключення шрифту
  const [fontsLoaded] = useFonts({
    RobotoBold: require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    Roboto: require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  //   підключення шрифту
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
    <NavigationContainer onLayout={onLayout}>{routing}</NavigationContainer>
  );
}

{
  //   /* {routing} */
}
// auth
