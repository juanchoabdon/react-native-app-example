import { AsyncStorage } from "react-native";
import * as firebase from "firebase";

export const USER_KEY = "auth-demo-key";

export const onSignIn = (user) => AsyncStorage.setItem('user', JSON.stringify(user));

export const onSignOut = async () => {
  try {
      await firebase.auth().signOut();

      AsyncStorage.removeItem('user');

  } catch (error) {
      console.log(error);
  }
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('user')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};
