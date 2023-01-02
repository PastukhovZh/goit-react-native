import { useTogglePasswordVisibility } from "../assets/useTogglePasswordVisibility";

import { useFonts } from "expo-font";
// import Add from "../assets/img/add.svg";
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
import { Ionicons } from "@expo/vector-icons";

const Registration = ({ navigation, onLayout }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [borderColorLogin, setborderColorLogin] = useState("#E8E8E8");
  const [borderColorEmail, setborderColorEmail] = useState("#E8E8E8");
  const [borderColorPassword, setborderColorPassword] = useState("#E8E8E8");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  const nameHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onRegister = () => {
    console.log(`${login} + ${password}` + `${email}`);

    setLogin("");
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

  const window = Dimensions.get("window").width - 16 * 2;
  const [dimensions, setDimensions] = useState(window);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (window) => {
      setDimensions(window);
    });
    return () => subscription?.remove();
  }, [dimensions]);

  return (
    <ScrollView style={styles.container} onLayout={onLayout}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          style={styles.imageBGPicture}
          source={require("../assets/img/Photo_BG.jpg")}
        >
          <View
            style={{
              ...styles.wrapper,
              marginTop: isShowKeyboard ? 147 : 263,
            }}
          >
            <View style={styles.image_thumb}>
              <Ionicons name="add-circle-outline" size={20} style={styles.icons } />
            </View>
            <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>
              Registration
            </Text>
            <View style={{ ...styles.form, width: dimensions }}>
              <TextInput
                value={login}
                onChangeText={nameHandler}
                onFocus={() => {
                  setborderColorLogin("#FF6C00");
                  setIsShowKeyboard(true);
                }}
                onBlur={() => setborderColorLogin("transparent")}
                placeholder="Login"
                style={{
                  ...styles.input,
                  fontFamily: "Roboto",
                  borderColor: borderColorLogin,
                }}
              />
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
                  secureTextEntry={passwordVisibility}
                  style={{
                    ...styles.input,
                    fontFamily: "Roboto",
                    borderColor: borderColorPassword,
                    marginBottom: 0,
                  }}
                />

                <TouchableOpacity onPress={handlePasswordVisibility}>
                  <Text style={{ ...styles.password, fontFamily: "Roboto" }}>
                    {rightIcon}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.8}
                onPress={onRegister}
              >
                <Text style={{ ...styles.btnTitle, fontFamily: "Roboto" }}>
                  SING UP
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{ ...styles.linkTitle, fontFamily: "Roboto" }}>
                  Already have an account?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
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

    paddingTop: 92,
    borderWidth: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: "#fff",
    backgroundColor: "#fff",
  },
  image_thumb: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderColor: "#F6F6F6",
    borderWidth: 1,
    borderRadius: 16,
  },
  addBtn: {
    position: "absolute",
    bottom: 14,
    left: 104,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    lineHeight: 35.16,
    marginBottom: 33,
  },
  form: {
    flex: 1,
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

export default Registration;
