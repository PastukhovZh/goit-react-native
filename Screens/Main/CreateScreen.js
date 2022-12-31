import React, { useState } from "react";

import {
  Keyboard,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

import ArrowLeft from "../../assets/img/arrow-left.svg";
import MapIcon from "../../assets/img/map-pin.svg";
import Photo from "../../assets/img/Photo.svg";
import Trash from "../../assets/img/trash.svg";

export const CreateScreen = ({ onLayout }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  //   зайва змінна?

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const nameHandler = (text) => setName(text.trim());
  const locationHandler = (text) => setLocation(text.trim());

  const onPost = () => {
    setName("");
    setLocation("");

    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <ScrollView style={styles.container} onLayout={onLayout}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View>
          <View style={styles.header}>
            <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>
              Create post
            </Text>
            <TouchableOpacity style={styles.backBtn}>
              <ArrowLeft width={24} height={24} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              <View style={{ ...styles.imgThumb }}>
                <TouchableOpacity>
                  <Photo />
                </TouchableOpacity>
              </View>
              <View style={styles.form}>
                <TouchableOpacity>
                  <Text style={{ ...styles.download, fontFamily: "Roboto" }}>
                    Download a photo
                  </Text>
                </TouchableOpacity>
                <TextInput
                  value={name}
                  onChangeText={nameHandler}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  placeholder="Name"
                  style={{
                    ...styles.input,
                    fontFamily: "Roboto",
                  }}
                />
                <View>
                  <TextInput
                    value={location}
                    onChangeText={locationHandler}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                    placeholder="Location"
                    style={{
                      ...styles.input,
                      paddingLeft: 28,
                      fontFamily: "Roboto",
                    }}
                  />
                  <MapIcon style={styles.location} />
                </View>
                <TouchableOpacity
                  //  перевіряємо на наявність всіх наних і активуємо тоді кнопку
                  //   disabled = { data ? false : true }
                  style={styles.submitBtn}
                  activeOpacity={0.8}
                  onPress={onPost}
                >
                  <Text style={{ fontFamily: "Roboto" }}>POST</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
              //   onPress={()=>{}} - буде щось очищати або видаляти
              >
                <Trash width={70} height={40} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "relative",
    paddingTop: 55,
    paddingBottom: 11,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  title: {
    fontSize: 17,
    lineHeight: 22,
  },

  backBtn: {
    position: "absolute",
    top: 55,
    left: 16,
  },
  imgThumb: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(189, 189, 189, 1)",
    marginHorizontal: 16,
    marginTop: 32,
  },
  download: {
    fontSize: 16,
    color: "#BDBDBD",
    marginBottom: 32,
  },

  form: {
    marginHorizontal: 16,
    marginTop: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    fontSize: 16,
  },
  location: {
    position: "absolute",

    left: 0,
    bottom: 15,
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,

    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "rgba(189, 189, 189, 1)",
    backgroundColor: "rgba(189, 189, 189, 1)",
  },
});

export default CreateScreen;
