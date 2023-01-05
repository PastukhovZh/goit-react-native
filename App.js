import React, { useEffect, useCallback,useState } from "react";
import * as Font from "expo-font";
import { Provider } from "react-redux";

import { Alert, LogBox, SplashScreen } from 'react-native'

import Main from "./src/components/Main";
import { store } from "./src/redux/store";


export default function App() {
const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          RobotoBold: require("./src/assets/fonts/Roboto/Roboto-Bold.ttf"),
          Roboto: require("./src/assets/fonts/Roboto/Roboto-Regular.ttf"),
          RobotoItalic: require("./src/assets/fonts/Roboto/Roboto-Italic.ttf"),
        })
      } catch (error) {
        Alert.alert(error.message)
      } finally { 
        setIsAppReady(true)
      }
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);
  if (!isAppReady) {
    return null;
  }

  LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core']);

  return (
    <Provider store={store}>
    <Main onLayout={onLayout}/>
    </Provider>
  );
}

