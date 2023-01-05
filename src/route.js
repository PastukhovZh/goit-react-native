import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login";
import Register from "./Screens/Registration";

import Home from "./Screens/Main/Home";
import CreateScreen from "./Screens/Main/CreateScreen";

// import icons

const AuthStack = createStackNavigator(); 
const HomeStack = createStackNavigator(); 
const CreateStack = createStackNavigator(); 

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={Register}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        {/* <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        /> */}
      </AuthStack.Navigator>
    );
  }
  return <Home />;
};

export default useRoute;