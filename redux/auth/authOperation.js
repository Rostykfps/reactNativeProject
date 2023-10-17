import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { updateUserProfile } from './authSlice';
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

      //   console.log('current user :>> ', auth.currentUser);
      return auth.currentUser;
    } catch (error) {
      console.log('erroro :>> ', error);
      return error.message;
    }
  };

export const signInUser =
  ({ email, password }) =>
  async () => {
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert('Не вірний email або пароль');
      return error.message;
    }
  };

export const signOutUser = () => async () => {
  try {
    await signOut(auth);
    dispatch(signOut());
  } catch (error) {
    return error.message;
  }
};
