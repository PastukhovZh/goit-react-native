import React, { useState, useEffect } from "react";
import {
  Image,
  Item,
  FlatList,
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import LogOutIcon from "../../assets/img/log-out.svg";
import Shape from "../../assets/img/Shape.svg";
import Location from "../../assets/img/map-pin.svg";

const PostsScreen = ({ onLayout, navigation, route }) => {
  const [postsInfo, setPostsInfo] = useState([]);
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPostsInfo((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("postsInfo", postsInfo);

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
                  navigation.navigate("CommentsScreen");
                }}
              >
                <Shape width={24} height={24} />
              </TouchableOpacity>

              <Text style={{ alignSelf: "center", marginRight: 8 }}> 34 </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Location width={24} height={24} />
            <View
              style={{
                alignSelf: "center",
                marginLeft: 8,
                flexDirection: "column",
              }}
            >
              <Text>{item.location?.latitude}</Text>
              <Text>{item.location?.longitude}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} onLayout={onLayout}>
      <View style={styles.header}>
        <Text style={{ ...styles.title, fontFamily: "RobotoBold" }}>Posts</Text>
        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <LogOutIcon width={24} height={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Image
          style={{ marginRight: 8, borderRadius: 16 }}
          source={require("../../assets/img/UserPhoto.jpg")}
        />
        <View>
          <Text style={{ fontFamily: "RobotoBold" }}>userLogin</Text>
          <Text style={{ fontFamily: "Roboto" }}>userEmail</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={postsInfo}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
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
