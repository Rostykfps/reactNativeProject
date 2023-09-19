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
import { Home } from './Screens/Home';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          cardStyle: { backgroundColor: '#FFF' },
          // headerShown: false,
        }}
      >
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen name="Posts" component={PostsScreen} />
        <MainStack.Screen name="CreatePosts" component={CreatePostsScreen} />
        <MainStack.Screen name="Comment" component={CommentsScreen} />
        <MainStack.Screen name="Profile" component={ProfileScreen} />
        <MainStack.Screen name="Map" component={MapScreen} />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
