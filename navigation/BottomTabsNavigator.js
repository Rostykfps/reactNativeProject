import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CreatePostsScreen } from '../Screens/CreatePostsScreen';
import { ProfileScreen } from '../Screens/ProfileScreen';
import { TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import SvgGrid from '../assets/svg/SvgGrid';
import SvgNewPost from '../assets/svg/SvgNewPost';
import SvgUser from '../assets/svg/SvgUser';
import SvgLogOut from '../assets/svg/SvgLogOut';
import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import { useNavigation } from '@react-navigation/native';
import AuthStack from './AuthStack';
import { PostsScreen } from '../Screens/PostsScreen';
import { signOutUser } from '../redux/auth/authOperation';
import { useDispatch } from 'react-redux';

const Tabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <Tabs.Navigator
      initialRouteName="Posts"
      screenOptions={{
        cardStyle: { backgroundColor: '#FFF' },

        // headerShown: false,
        tabBarStyle: {
          // borderBottomWidth: 0.5,
          // borderBottomColor: 'rgba(0, 0, 0, 0.3)',
          // boxShadow: '0px 0.5px 0px rgba(0, 0, 0, 0.3)',
          borderTopWidth: 0.5,
          borderTopColor: 'rgba(0, 0, 0, 0.3)',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          boxShadow: '0px 0.5px 0px rgba(0, 0, 0, 0.3)',
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 1,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          //   headerShown: false,
          title: 'Публікації',
          headerStyle: {
            backgroundColor: '#fff',
            // height: 88,
            // paddingTop: 44,
            elevation: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.3,
            shadowRadius: 0,
            borderBottomColor: '#000',

            borderBottomColor: 'rgba(0, 0, 0, 0.3)',
            boxShadow: '0px 0.5px 0px rgba(0, 0, 0, 0.3)',
            borderBottomWidth: 0.5,
            borderRadius: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: 'Roboto-Medium',
            lineHeight: 22,
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <SvgLogOut
                onPress={
                  // () => navigation.navigate('AuthStack', { screen: 'Login' })

                  () => {
                    dispatch(signOutUser());
                  }
                  //   navigation.navigate('AuthStack', {
                  //     screen: 'Registration',
                  //   })
                }
              />
            </TouchableOpacity>
          ),
          tabBarIcon: () => {
            return (
              <View
                style={{
                  ...styles.iconWrapper,
                  marginRight: 31,
                }}
              >
                <SvgGrid />
              </View>
            );
          },
          tabBarLabel: () => null,
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          // headerShown: true,
          title: 'Створити публікацію',
          headerStyle: {
            backgroundColor: '#FFF',
            // height: 88,
            // paddingTop: 44,
            elevation: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.3,
            shadowRadius: 0,
            borderBottomColor: '#000',

            borderBottomColor: 'rgba(0, 0, 0, 0.3)',
            borderBottomWidth: 0.5,
            borderRadius: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: 'Roboto-Medium',
            lineHeight: 22,
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <SvgArrowLeft onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
          tabBarIcon: () => {
            return <SvgNewPost />;
          },
          tabBarLabel: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <View
                style={{
                  ...styles.iconWrapper,
                  marginLeft: 31,
                }}
              >
                <SvgUser />
              </View>
            );
          },
          tabBarLabel: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
