import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import {AntDesign, Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";


const ProfileScreen = ({ onLayout, navigation }) => {
  const { login, userId } = useSelector((state) => state.auth);
  const [userPosts, setUserposts] = useState("");
  const { myImage } = useSelector((state) => state.auth);


  const dispatch = useDispatch();

  const getUserPosts = async () => {
    try {
      const dbRef = query(
        collection(db, "posts"),
        where("userId", "==", userId)
      );
      onSnapshot(dbRef, (docSnap) =>
        setUserposts(docSnap.docs.map((doc) => ({ ...doc.data() })))
      );
    } catch (error) {
      Alert.alert(error);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);
    
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  const logOutSys = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "OK",
          onPress: signOut, 
        }
      ])
  }

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
  const renderItem = ({item}) =>(
<View style={styles.cardInfo}>
      <Image
        source={{ uri: item.photo }}
        style={{ height: 240, width: 350, borderRadius: 8 }}
      />
      <View style={{ width: "100%" }}>
        <Text style={{ ...styles.locationName, fontFamily: "Roboto" }}>
          {item.description}
        </Text>
        <View
          style={{ ...styles.infoSection, justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CommentsScreen", {
                    postId: item.userId,
                    photo: item.photo,
                  });
                }}
              >
                <FontAwesome name="commenting-o" size={24} color="black" />
              </TouchableOpacity>

              <Text style={{ alignSelf: "center", marginRight: 8 }}>
                {" "}
                Comments{" "}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ flexDirection: "row", justifyContent: "center" }}
            onPress={() =>
              navigation.navigate("MapScreen", { location: item.location })
            }
          >
            <AntDesign name="enviromento" size={24} color="black" />
            <Text style={{ alignSelf: "center", marginLeft: 8 }}>
              {item.city}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  return (
    <View style={styles.container} onLayout={onLayout}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ImageBackground
            style={{
              ...styles.imageBGPicture,
              width: windowWidth,
              height: windowHeight,
            }}
            source={require("../../assets/img/Photo_BG.jpg")}
          >
            <View style={styles.wrapper}>
              <View style={styles.image_thumb}>
                {myImage ? (
                <Image
                  source={{ uri: myImage }}
                  style={{
                    height: 120,
                    with: 120,
                    borderRadius: 16,
                  }}
                />
              ) : (
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <AntDesign name="frowno" size={80} color="black" style={{marginTop:7}} />
                    <Text style={{ fontFamily: 'RobotoBold', fontSize: 20 }}>No Image</Text>
                </View>
              )}
            </View>
            

            
              <TouchableOpacity
                onPress={logOutSys}
                style={styles.logOutBtn}
              >
                <MaterialIcons name="logout" size={24} color="black" /> 
              </TouchableOpacity>
              <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>
                {login}
              </Text>

              <View style={styles.cardInfo}>
                
                <View>
                  <Text
                    style={{ ...styles.locationName, fontFamily: "RobotoBold" }}
                  >
                    {login}
                  </Text>
                  <View>
              <FlatList
                data={userPosts}
                keyExtractor={userPosts.id}
                renderItem={renderItem}
              />
            </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      
    </View>
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
    marginTop: 147,

    paddingTop: 33,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
  delBtn: {
    position: "absolute",
    bottom: 14,
    left: 104,
  },
  logOutBtn: {
    position: "absolute",
    top: 24,
    right: 16,
  },
  title: {
    marginTop: 32,
    fontSize: 30,
    textAlign: "center",
    lineHeight: 35.16,
    marginBottom: 33,
  },
  cardInfo: {
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

export default ProfileScreen;
