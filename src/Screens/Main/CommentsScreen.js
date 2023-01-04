import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";

import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";
import { Feather } from '@expo/vector-icons';
import { db } from "../../firebase/config";

const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;

  const [comment, setComment] = useState("");
  const [allComments, setAllcomments] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { login, myImage } = useSelector((state) => state.auth);

  //   завантаження коментарів на firebase
  const sendCommentToServer = async () => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    try {
      const dbRef = doc(db, "posts", postId);
      await addDoc(collection(dbRef, "comments"), {
        comment,
        login,
        date,
        time,
      });
    } catch (error) {
      Alert.alert("error.message", error.message);
    }
  };

  const createComment = () => {
    sendCommentToServer();
    setComment("");
    keyboardHide();
  };

  const getAllComents = async () => {
    try {
      const dbRef = doc(db, "posts", postId);
      onSnapshot(collection(dbRef, "comments"), (docSnap) =>
        setAllcomments(docSnap.docs.map((doc) => ({ ...doc.data() })))
      );
    } catch (error) {
      Alert.alert(`getAllComents`, error);
    }
  };

  useEffect(() => {
    getAllComents();
  }, []);

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const renderItem = ({ item }) => (
    <View>
      <View
        style={{
          marginTop: 32,
          marginHorizontal: 16,
          flexDirection: "row",
        }}
      >
        <Image source={{ uri: myImage }} style={styles.imageIcon} />
        <View style={styles.comment}>
          <Text style={{ fontSize: 16 }}>User: {login}</Text>
          <Text>{item.comment}</Text>
          <Text style={styles.date}>
            {item.date}|{item.time}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View
        style={{ ...styles.container, marginBottom: isShowKeyboard ? 320 : 30 }}
      >
        <Image
          source={{ uri: photo }}
          style={{ height: 240, borderRadius: 8 }}
        />

        <FlatList
          data={allComments}
          keyExtractor={allComments.id}
          renderItem={renderItem}
        />

        <View style={styles.inputContainer}></View>
        <View>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Add comment"
            onFocus={() => setIsShowKeyboard(true)}
            style={{
              ...styles.submitBtn,
                fontFamily: "Roboto",
                position:'relative'
            }}
          />

          <TouchableOpacity onPress={createComment} style={{position:'absolute', top:45, right:20}}>
            <Feather name="send" size={24} color="tomato" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  imageIcon: { height: 38, width: 38, borderRadius: 100 },
  comment: {
    marginLeft: 16,
    width: 300,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "rgba(0, 0, 0, 0.03)",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  date: {
    fontSize: 12,
    textAlign: "right",
    color: "grey",
  },
  submitBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "rgba(189, 189, 189, 1)",
    backgroundColor: "#E8E8E8",
  },
  sendIcon: {
    position: "absolute",

    right: 15,
    bottom: 8,
  },
  inputContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    height: 50,
    fontSize: 16,
  },
});

export default CommentsScreen;
