import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth} from "../../firebase/config";
import authSlice from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignInUser = ({ email, password }) => async (dispatch, getSatte) => {
    try {
        await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    } catch (error) {
        Alert.alert(`${error.message}`);
        console.log("error.message", error.message);
        showLoginError(error);
    }
}

export const authSignUpUser =
  ({ email, password, login, myImage }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: myImage,
      });

      const { uid, displayName, photoURL } = auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          email,
          myImage: photoURL,
        })
      );
      // try {
      //   const userCredential = await createUserWithEmailAndPassword(
      //     auth,
      //     email,
      //     password,
      //     login
      //   );

      //   updateProfile(auth.currentUser, {
      //     displayName: login,
      //     photoURL: myImage,
      //   }).then(() => {
      //     dispatch(
      //       updateUserProfile({
      //         userId: userCredential.user.uid,
      //         login: userCredential.user.displayName,
      //         email: userCredential.user.email,
      //         myImage: userCredential.user.photoURL,
      //       })
      //     );
      //   });
      Alert.alert(`Welcome`);
    } catch (error) {
      Alert.alert(error.message);
      console.log("error.messageOperations", error.message);
    }
        };
  
export const authSignOutUser = () => async (dispatch, getSatte) => {
await signOut(auth)
    .then(() => {
      console.log(`Sign-out successful`);
      dispatch(authSignOut());
    })
    .catch((error) => {
      console.log(error);
    });
}


export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email: user.email,
        myImage: user.photoURL,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateProfile));
    }
  });
};