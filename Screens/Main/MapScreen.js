import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const MapScreen = ({navigation}) => {
  return (

    <View style={styles.container}>
    <View>  
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.516339,
          longitude: 30.602185,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
      >
        <Marker
          coordinate={{ latitude: 50.516339, longitude: 30.602185 }}
          title="travel photo"
        />
      </MapView>
      
    </View>
    <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => navigation.navigate("Posts")}
      >
        <Text style={styles.logOutBtnText}>Go Back </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  logOutBtn: {
    backgroundColor:'black',
    color:'black',
    top: 55,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutBtnText: {

    color: 'white',
  }
});

export default MapScreen;
