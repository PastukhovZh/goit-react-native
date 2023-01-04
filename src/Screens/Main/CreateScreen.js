import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";

import * as Location from "expo-location";

import {
  Alert,
  Button,
  Image,
  Keyboard,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";

import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'; 

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";


export const CreateScreen = ({ onLayout, navigation }) => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");


  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);


  const descriptionHandler = (text) => setDescription(text.trim());

  const keyboardHide = () => {
    Keyboard.dismiss();
  };


  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationOfPhoto = await Location.getCurrentPositionAsync();

      let coords = {
        latitude: locationOfPhoto.coords.latitude,
        longitude: locationOfPhoto.coords.longitude,
      };

      let address = await Location.reverseGeocodeAsync(coords);
      let city = address[0].city;
      setLocation(locationOfPhoto);
      setCity(city);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };
if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={{ marginTop: 100 }}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Change photo" />
      </View>
    );
  }

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `images/${uniquePostId}`);

    const response = await fetch(photo);
    const file = await response.blob();

    const uploadPhoto = await uploadBytes(storageRef, file).then(() => {
      Alert.alert(`photo is uploaded`);
    });

    const processedPhoto = await getDownloadURL(
      ref(storage, `images/${uniquePostId}`)
    )
      .then((url) => {
        return url;
      })
      .catch((error) => {
        Alert.alert(error);
      });
    return processedPhoto;
  };

const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    try {
      const setUserPost = await addDoc(collection(db, "posts"), {
        photo,
        description,
        location,
        city,
        userId,
        login,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const sendInfo = () => {
    navigation.navigate("Posts");
  };

  const onPost = () => {
    if (!description.trim()|| !location) {
      Alert.alert(
        `Please fill in the description and wait until the Location is uploaded!`
      );
      return;
    }
    uploadPostToServer();

    sendInfo();
    uploadPhotoToServer();
    setDescription("");
    setLocation(null);
    setCity(null);
    setPhoto(null);
    Keyboard.dismiss();
    return
  };

  const onDelete = () => {
    setDescription("");
    setLocation(null);
    setCity(null);
    setPhoto(null);

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
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Posts")}>
              <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              {photo ? (
                <View style={styles.takePhotoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={{ height: 240, width: "100%" }}
                  />
                  <TouchableOpacity
                    style={styles.changeBtn}
                    onPress={() => {setPhoto(null), setLocation(null)}}
                  >
                    <Text style={{ color: "#fff" }}>New Photo</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Camera
                  ref={setCamera}
                  style={{
                    ...styles.camera,
                    backgroundColor: "rgba(189, 189, 189, 1)",
                  }}
                >
                  <TouchableOpacity onPress={takePhoto}>
                    <MaterialIcons name="add-a-photo" size={45} color="white" style={styles.photoButton} />
                  </TouchableOpacity>
                </Camera>
              )}

              <View style={styles.form}>
                <TextInput
                  value={description}
                  onChangeText={descriptionHandler}
                  placeholder="Description"
                  style={{
                    ...styles.input,
                    fontFamily: "Roboto",
                  }}
                />
                <View>
                  <View
                    style={{
                      ...styles.input,
                      paddingLeft: 28,
                      justifyContent: "center",
                    }}
                  >
                    <AntDesign name="enviromento" size={24} color="black" style={styles.location} />
                    <Text
                      style={{
                        fontFamily: "Roboto",
                        fontSize: 16,
                      }}
                    >
                      Location: {city}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  disabled={photo ? false : true}
                  style={styles.submitBtn}
                  activeOpacity={0.8}
                  onPress={onPost}
                >
                  <Text style={{ fontFamily: "Roboto" }}>POST</Text>
                </TouchableOpacity>
              </View>
            </View>
            {photo&& <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPress={onDelete}>
              <FontAwesome name="trash-o" size={24} color="black" />
              </TouchableOpacity>
            </View> }
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
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 32,
  },
  takePhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 32,
  },
  changeBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
    marginBottom: 16,

    height: 50,
    width: 150,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "#FF6C00",
    backgroundColor: "#FF6C00",
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
  photoButton:{
    width: 50,
    height:50
  }
});

export default CreateScreen;
