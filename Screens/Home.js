import { StyleSheet, Text, View } from 'react-native';
import { PostsScreen } from './PostsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';
import SvgGrid from '../assets/svg/SvgGrid';
import SvgNewPost from '../assets/svg/SvgNewPost';
import SvgUser from '../assets/svg/SvgUser';

const Tabs = createBottomTabNavigator();

export const Home = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          height: 83,
          paddingTop: 9,
          paddingBottom: 31,
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
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
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
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: () => {
            return <SvgNewPost />;
          },
          tabBarLabel: () => null,
          headerShown: false,
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
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigatorWrapper: {
    height: 88,
    paddingTop: 44,
    elevation: 1,
    shadowOffset: { width: 0, height: 0.5 },
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 0,
  },
});
