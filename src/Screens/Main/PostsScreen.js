import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  Item,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { authSignOutUser } from "../../redux/auth/authOperations";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";


const PostsScreen = ({ onLayout, navigation, route }) => {
  const [postsInfo, setPostsInfo] = useState([]);


  const dispatch = useDispatch();
  const { email, login, myImage } = useSelector((state) => state.auth);

const signOut = () => {
  dispatch(authSignOutUser());
  
  };
  const getAllPosts = async () => {
    const dbRef = collection(db, "posts");
    onSnapshot(dbRef, (docSnap) =>
      setPostsInfo(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cardInfo}>
      <Image
        source={{ uri: item.photo }}
        style={{ height: 240, width: 350, borderRadius: 8 }}
      />
      <View style={{ alignItems: "center" }}>
        <Text style={{ ...styles.locationName, fontFamily: "Roboto" }}>
          {item.name}
        </Text>
        <View style={{ ...styles.infoSection }}>
          <View style={{ flexDirection: "row", marginRight: 27 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CommentsScreen", {
                    postId: item.id,
                    photo: item.photo,
                  });
                }}
              >
                <FontAwesome name="commenting-o" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
                onPress={() => {
                  navigation.navigate("MapScreen", { location: item.location });
                }}
              >
                <AntDesign name="enviromento" size={24} color="black" />
              </TouchableOpacity>
            <View
              style={{
                alignSelf: "center",
                marginLeft: 8,
                flexDirection: "column",
              }}
            >
              <Text>{item.city}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.header}>
        <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>Posts</Text>
        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={signOut}
        >
          <MaterialIcons name="logout" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Image
          style={{ marginRight: 8, borderRadius: 16 }}
          source={{uri:myImage}}
        />
        <View>
          <Text style={{ fontFamily: "RobotoBold" }}>{login}</Text>
          <Text style={{ fontFamily: "Roboto" }}>{email}</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={postsInfo}
          keyExtractor={postsInfo.id}
          renderItem={renderItem}
        />
      </View>
    </View>
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

  logOutBtn: {
    position: "absolute",
    top: 55,
    right: 16,
  },
  userInfo: {
    paddingLeft: 16,
    paddingTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  cardInfo: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  locationName: {
    fontSize: 16,
    marginTop: 8,
  },
  infoSection: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PostsScreen;
