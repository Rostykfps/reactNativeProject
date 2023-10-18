import 'react-native-gesture-handler';
import { RegistrationScreen } from './Screens/RegistrationScreen';
import { LoginScreen } from './Screens/LoginScreen';
import { useFonts } from 'expo-font';
import { PostsScreen } from './Screens/PostsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreatePostsScreen } from './Screens/CreatePostsScreen';
import { ProfileScreen } from './Screens/ProfileScreen';
import { CommentsScreen } from './Screens/CommentsScreen';
import { MapScreen } from './Screens/MapScreen';
// import { Home } from './Screens/Home';
import { StatusBar } from 'react-native';
import Home from './navigation/Home';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { Text } from 'react-native';
import AuthStack from './navigation/AuthStack';
import { stateChangeUser } from './redux/auth/authOperation';
import Main from './navigation/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <Main />
        {/* <NavigationContainer> */}
        {/* {stateChange ? <Home /> : <AuthStack />} */}
        {/* <Home /> */}
        {/* <AuthStack /> */}
        {/* </NavigationContainer> */}
      </PersistGate>
    </Provider>
  );
}
