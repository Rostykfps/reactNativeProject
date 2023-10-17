import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJEpMy7eLTOSZ9R1ZYr_iYjDshTHxqIZQ',
  authDomain: 'react-native-hw-9fc44.firebaseapp.com',
  databaseURL:
    'https://react-native-hw-9fc44-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-native-hw-9fc44',
  storageBucket: 'react-native-hw-9fc44.appspot.com',
  messagingSenderId: '160935896232',
  appId: '1:160935896232:web:8496e28e416b9166e70e9d',
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
