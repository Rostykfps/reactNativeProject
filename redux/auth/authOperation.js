import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { authSignOut, authStateChange, updateUserProfile } from './authSlice';
import { Alert } from 'react-native';

export const signUpUser =
  ({ login, email, password, avatar }) =>
  async dispatch => {
    try {
      // console.log('object :>> ');
      //   console.log('object2 :>> ', login, email, password, avatarImage);
      await createUserWithEmailAndPassword(auth, email, password);
      //   const user = auth.currentUser;

      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
        // photoURL: avatarImage,
      });
      const { uid, displayName, photoURL } = auth.currentUser;

      const userProfile = {
        userId: uid,
        login: displayName,
        email,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userProfile));
      dispatch(authStateChange({ stateChange: true }));
      //   console.log('current user :>> ', auth.currentUser);
      return auth.currentUser;
    } catch (error) {
      console.log('erroro :>> ', error);
      return error.message;
    }
  };

export const signInUser =
  ({ email, password }) =>
  async dispatch => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, photoURL } = auth.currentUser;
      const userProfile = {
        userId: uid,
        login: displayName,
        email,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userProfile));
      dispatch(authStateChange({ stateChange: true }));
      console.log('object :>> ', email, password);
    } catch (error) {
      Alert.alert('Не вірний email або пароль');
      return error.message;
    }
  };

export const signOutUser = () => async dispatch => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
    //   dispatch(authStateChange({ stateChange: false }));
  } catch (error) {
    return error.message;
  }
};

export const stateChangeUser = () => async dispatch => {
  // try {
  //   await onAuthStateChanged(auth, user => {
  //     if (user) {
  //       console.log('user :>> ', user);
  //       const userUpdateProfile = {
  //         userId: user.uid,
  //         login: user.displayName,
  //         email: user.email,
  //         avatar: user.photoURL,
  //       };
  //       dispatch(updateUserProfile(userUpdateProfile));
  //       dispatch(authStateChange({ stateChange: true }));
  //     }
  //     console.log('-user :>> ', user);
  //     dispatch(authStateChange({ stateChange: false }));
  //   });
  // } catch (error) {
  //   error.message;
  //   }

  await onAuthStateChanged(auth, user => {
    try {
      if (user) {
        // console.log('user :>> ', user);
        const userUpdateProfile = {
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        };

        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange({ stateChange: true }));
      }
      console.log('-user :>> ', user.displayName);
      //   dispatch(authStateChange({ stateChange: false }));
    } catch (error) {
      error.message;
      //   Alert.alert(error.message);
    }
  });
};
