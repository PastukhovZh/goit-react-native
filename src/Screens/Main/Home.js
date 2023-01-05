import CreateScreen from "./CreateScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";
import MapScreen from "./MapScreen";


import { MaterialIcons, Ionicons,AntDesign  } from '@expo/vector-icons';
import {TouchableOpacity, StyleSheet} from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { createStackNavigator } from "@react-navigation/stack";

import CommentsScreen from "./CommentsScreen";

const HomeTabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();

export const HomeTabsBtn = () => {
  return (
    <HomeTabs.Navigator screenOptions={{ showLabel: false }}>
      <HomeTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: () =>
              <MaterialIcons name="photo-library" size={24} style={styles.icons} />,
          headerShown: false,
        }}
      />
      <HomeTabs.Screen
        name="CreateScreen"
        component={CreateScreen}
        options={{
          tabBarIcon: () => <Ionicons name="add-circle-outline" size={35} style={styles.icons } />,
          headerShown: false,
        }}
      />

      <HomeTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => 
            <AntDesign name="user" size={24} style={styles.icons }/>
          ,
          headerShown: false,
        }}
      />
    </HomeTabs.Navigator>
  );
};

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeTabsBtn}
      />
      <HomeStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
      />
      <HomeStack.Screen
        name="MapScreen"
        component={MapScreen}
      />
    </HomeStack.Navigator>
  );
};

const styles = StyleSheet.create({
  icons: {
    size: 34,
    color: 'grey',
  }
})


export default Home;


