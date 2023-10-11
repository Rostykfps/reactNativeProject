import { NavigationContainer } from '@react-navigation/native';
import BottomTabsNavigator from './BottomTabsNavigator';

import AuthStack from './AuthStack';
import { CreatePostsScreen } from '../Screens/CreatePostsScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import SvgLogOut from '../assets/svg/SvgLogOut';
import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import { useNavigation } from '@react-navigation/native';
import { CommentsScreen } from '../Screens/CommentsScreen';
import { LoginScreen } from '../Screens/LoginScreen';
import PostStack from './PostStack';
import { PostsScreen } from '../Screens/PostsScreen';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const MainStack = createStackNavigator();
// const MainStack = createNativeStackNavigator();

export default function Home() {
  const navigation = useNavigation();

  return (
    // <NavigationContainer>
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'transparent'}
        translucent={true}
      />
      <MainStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="BottomTabsNavigator"
      >
        <MainStack.Screen
          name="BottomTabsNavigator"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="AuthStack"
          component={AuthStack}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="PostStack"
          component={PostStack}
          options={{ headerShown: false }}
        />
        {/* <MainStack.Screen
          name="Comments"
          component={CommentsScreen}
          options={{ headerShown: false }}
        /> */}
        <MainStack.Screen
          name="Post"
          component={PostsScreen}
          options={{
            headerShown: true,
            // title: 'Публікації5',
            // headerStyle: {
            //   backgroundColor: '#fff',
            //   // height: 88,
            //   // paddingTop: 44,
            //   elevation: 1,
            //   shadowColor: '#000',
            //   shadowOffset: { width: 0, height: 0.5 },
            //   shadowOpacity: 0.3,
            //   shadowRadius: 0,
            //   borderBottomColor: '#000',

            //   borderBottomColor: 'rgba(0, 0, 0, 0.3)',
            //   boxShadow: '0px 0.5px 0px rgba(0, 0, 0, 0.3)',
            //   borderBottomWidth: 0.5,
            //   borderRadius: 0,
            // },
            // headerTintColor: '#000',
            // headerTitleStyle: {
            //   fontSize: 17,
            //   fontFamily: 'Roboto-Medium',
            //   lineHeight: 22,
            // },
            // headerTitleAlign: 'center',
            // headerRight: () => (
            //   <TouchableOpacity style={{ marginRight: 16 }}>
            //     <SvgLogOut onPress={() => navigation.navigate('Login')} />
            //   </TouchableOpacity>
            // ),
          }}
        />
        <MainStack.Screen
          name="CreatePosts"
          component={CreatePostsScreen}
          options={{
            headerShown: true,
            // title: '1Створити публікацію',
            // backgroundColor: '#fff',
            // headerStyle: {
            //   backgroundColor: '#fff',
            //   // height: 88,
            //   // paddingTop: 44,
            //   elevation: 1,
            //   shadowColor: '#000',
            //   shadowOffset: { width: 0, height: 0.5 },
            //   shadowOpacity: 0.3,
            //   shadowRadius: 0,
            //   borderBottomColor: '#000',
            //   borderBottomColor: 'rgba(0, 0, 0, 0.3)',
            //   borderBottomWidth: 0.5,
            //   borderRadius: 0,
            // },
            // headerTintColor: '#000',
            // headerTitleStyle: {
            //   fontSize: 17,
            //   fontFamily: 'Roboto-Medium',
            //   lineHeight: 22,
            // },
            // headerTitleAlign: 'center',
            // headerLeft: () => (
            //   <TouchableOpacity style={{ marginLeft: 16 }}>
            //     <SvgArrowLeft onPress={() => navigation.goBack()} />
            //   </TouchableOpacity>
            // ),
          }}
        />
        <MainStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            // tabBarStyle: { display: 'none' },
          }}
        />
      </MainStack.Navigator>
    </>
    // </NavigationContainer>
  );
}
