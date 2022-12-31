import { useFonts } from "expo-font";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";


const Login = ({ navigation, onLayout }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [borderColorEmail, setborderColorEmail] = useState("#E8E8E8");
  const [borderColorPassword, setborderColorPassword] = useState("#E8E8E8");

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    console.log(`${email}` + `${password}`);

    setPassword("");
    setEmail("");
    navigation.navigate("Home");

    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  //  параметри екрану
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
      const height = Dimensions.get("window").height;
      setWindowHeight(height);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler?.remove();
  }, []);
  //

  return (
    <ScrollView style={styles.container} onLayout={onLayout}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View
          style={{ flex: 1, justifyContent: "canter", alignItems: "center" }}
        >
          <ImageBackground
            style={{
              ...styles.imageBGPicture,
              width: windowWidth,
              height: windowHeight,
            }}
            source={require("../assets/img/Photo_BG.jpg")}
          >
            <View
              style={{
                ...styles.wrapper,
                marginTop: isShowKeyboard ? 273 : 323,
                paddingBottom: 132,
              }}
            >
              <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>
                Login
              </Text>
              <View style={{ ...styles.form, width: windowWidth }}>
                <TextInput
                  value={email}
                  onChangeText={emailHandler}
                  onFocus={() => {
                    setborderColorEmail("#FF6C00");
                    setIsShowKeyboard(true);
                  }}
                  onBlur={() => setborderColorEmail("transparent")}
                  placeholder="Email"
                  style={{
                    ...styles.input,
                    fontFamily: "Roboto",
                    borderColor: borderColorEmail,
                  }}
                />
                <View style={{ position: "relative" }}>
                  <TextInput
                    value={password}
                    onChangeText={passwordHandler}
                    onFocus={() => {
                      setborderColorPassword("#FF6C00");
                      setIsShowKeyboard(true);
                    }}
                    onBlur={() => setborderColorPassword("transparent")}
                    placeholder="Password"
                    secureTextEntry={true}
                    style={{
                      ...styles.input,
                      fontFamily: "Roboto",
                      borderColor: borderColorPassword,
                      marginBottom: 0,
                    }}
                  />
                  <TouchableOpacity>
                    <Text style={{ ...styles.password, fontFamily: "Roboto" }}>
                      Show password
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.8}
                  onPress={onLogin}
                >
                  <Text style={{ ...styles.btnTitle, fontFamily: "Roboto" }}>
                    SING IN
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={{ ...styles.linkTitle, fontFamily: "Roboto" }}>
                    Don't have an account? Please make registration.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBGPicture: {
    flex: 1,
    resizeMode: "cover",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",

    paddingTop: 33,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 35.16,
    marginBottom: 33,
  },
  form: {
    paddingHorizontal: 16,
  },
  input: {
    marginBottom: 16,
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
  },
  password: {
    position: "absolute",
    paddingRight: 16,
    right: 0,
    bottom: 15,
    fontSize: 16,
    lineHeight: 18.75,
    textAlign: "right",
    color: "#1B4371",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 16,

    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#FF6C00",
    backgroundColor: "#FF6C00",
  },
  btnTitle: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 18.75,
  },
  linkTitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 18.75,
    color: "#1B4371",
  },
});

export default Login;
