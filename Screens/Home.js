import { StyleSheet, View } from 'react-native';
import { PostsScreen } from './PostsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';
import SvgGrid from '../assets/svg/SvgGrid';
import SvgNewPost from '../assets/svg/SvgNewPost';
import SvgUser from '../assets/svg/SvgUser';
import { TouchableOpacity } from 'react-native';
import SvgLogOut from '../assets/svg/SvgLogOut';
import { useNavigation } from '@react-navigation/native';
import SvgArrowLeft from '../assets/svg/SvgArrowLeft';

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();

  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          // height: 83,
          // height: 71,
          // paddingTop: 9,
          // paddingBottom: 34,
          // paddingBottom: 22,
          paddingLeft: 82,
          paddingRight: 81,
          elevation: 1,
          shadowOffset: { width: 0, height: 0.5 },
          borderTopColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 0,
          borderTopWidth: 0.5,
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 0,
          borderRadius: 0,
        },
        tabBarItem: {
          width: 40,
          height: 100,
        },
        tabStyle: { width: 70 },
        shadow: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0.5 },
          shadowOpacity: 0.3,
          shadowRadius: 0,
          elevation: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
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
            borderBottomWidth: 0.5,
            borderRadius: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: 'Roboto-Medium',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <SvgLogOut onPress={() => navigation.navigate('Login')} />
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
          // headerShown: false,
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: 'Створити публікацію',
          backgroundColor: '#fff',
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
            borderBottomWidth: 0.5,
            borderRadius: 0,
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: 'Roboto-Medium',
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
          // headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        tabB
        options={{
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
          headerShown: false,
          // tabBarVisible: false,
          // tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // iconWrapper: {
  //   width: 40,
  //   height: 40,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // navigatorWrapper: {
  //   height: 88,
  //   paddingTop: 44,
  //   elevation: 1,
  //   shadowOffset: { width: 0, height: 0.5 },
  //   borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  //   borderRadius: 0,
  // },
});
