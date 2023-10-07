import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import SvgLogOut from '../assets/svg/SvgLogOut';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import PostItem from '../components/PostItem';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import { createStackNavigator } from '@react-navigation/stack';
import { CommentsScreen } from './CommentsScreen';
import { MapScreen } from './MapScreen';
import { DefaultPostsScreen } from './DefaultPostScreen';

// const Tabs = createBottomTabNavigator();
const NestedScreen = createStackNavigator();

export const PostsScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  return (
    <NestedScreen.Navigator
      initialRouteName="DefaultPosts"
      // screenOptions={{
      //   cardStyle: { backgroundColor: '#FFF' },
      //   headerShown: false,
      // }}
      screenOptions={{ headerShown: false }}
    >
      <NestedScreen.Screen name="DefaultPosts" component={DefaultPostsScreen} />
      {/* <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        // options={{ headerShown: false }}
        options={{
          headerShown: true,
          title: 'Коментарі',
          headerStyle: {
            backgroundColor: '#fff',
            // height: 88,
            // paddingTop: 44,
            elevation: 1,
            // shadowColor: '#000',
            shadowOffset: { width: 0, height: 0.5 },
            shadowOpacity: 0.3,
            shadowRadius: 0,
            borderBottomColor: '#000',

            borderBottomColor: 'rgba(0, 0, 0, 0.3)',
            borderBottomWidth: 0.5,
            borderRadius: 0,
            // borderBottomWidth: 0.5,
            // borderBottomColor: 'rgba(0, 0, 0, 0.3)',
            // boxShadow: '0px 0.5px 0px rgba(0, 0, 0, 0.3)',
          },
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
          headerTintColor: '#000',
          headerTitleStyle: {
            fontSize: 17,
            fontFamily: 'Roboto-Medium',
            lineHeight: 22,
          },
          headerTitleAlign: 'center',
          // headerLeft: () => (
          //   <TouchableOpacity style={{ marginLeft: 16 }}>
          //     <SvgArrowLeft onPress={() => navigation.goBack()} />
          //   </TouchableOpacity>
          // ),
          // headerRight: () => (
          //   <TouchableOpacity style={{ marginRight: 16 }}>
          //     <SvgLogOut onPress={() => navigation.navigate('Login')} />
          //   </TouchableOpacity>
          // ),
          // tabBarIcon: () => {
          //   return (
          //     <View
          //       style={{
          //         ...styles.iconWrapper,
          //         marginRight: 31,
          //       }}
          //     >
          //       <SvgGrid />
          //     </View>
          //   );
          // },
          // tabBarLabel: () => null,
          // headerShown: false,
        }}
      /> */}
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: true,
          tabBarStyle: { display: 'none' },
          title: 'Коментарі',
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
            lineHeight: 22,
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <SvgArrowLeft onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
          // headerShown: true,
          // headerStyle: {
          //   // borderBottomWidth: 0.5,
          //   // borderBottomColor: 'rgba(0, 0, 0, 0.3)',
          //   // boxShadow: '0px 0.5px 0px rgba(0, 0, 0, 0.3)',
          // },
          // headerTintColor: '#212121',
          // headerTitleStyle: {
          //   fontFamily: 'Roboto',
          //   fontStyle: 'normal',
          //   fontWeight: 'bold',
          //   fontSize: 17,
          //   lineHeight: 22,

          //   textAlign: 'center',
          // },
          // title: 'Коментарі',
          // headerTitleAlign: 'center',
          // headerLeft: () => (
          //   <SvgArrowLeft
          //     onPress={() => navigation.goBack()}
          //     // title="Return back"
          //     // color="#fff"
          //     // style={styles.arrowLeft}
          //   />
          // ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: true,
          title: 'Місцевість',
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
            lineHeight: 22,
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <SvgArrowLeft onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
  //   const [posts, setPosts] = useState([
  //     {
  //       id: 'V1StGXR8_Z5jdHi6B-myT',
  //       imageUri:
  //         'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FreactNativeProject-227d88aa-d0a8-4283-8e95-dfc92a59b734/Camera/52ac14ac-9b19-489c-adc4-0ff2906f9db2.jpg',
  //       location: 'Hhhh',
  //       name: 'Test',
  //       locationCoords: { latitude: 49.843485, longitude: 24.026541 },
  //     },
  //     // {
  //     //   id: 'V1StGXR8_Z5jdHi6B-myg',
  //     //   imageUri:
  //     //     'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FreactNativeProject-227d88aa-d0a8-4283-8e95-dfc92a59b734/Camera/52ac14ac-9b19-489c-adc4-0ff2906f9db2.jpg',
  //     //   location: 'Hhhh',
  //     //   name: 'Test',
  //     //   locationCoords: { latitude: 49.843485, longitude: 24.026541 },
  //     // },
  //   ]);

  //   // setPosts([
  //   //   {
  //   //     id: 'V1StGXR8_Z5jdHi6B-myT',
  //   //     imageUri:
  //   //       'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FreactNativeProject-227d88aa-d0a8-4283-8e95-dfc92a59b734/Camera/52ac14ac-9b19-489c-adc4-0ff2906f9db2.jpg',
  //   //     location: 'Hhhh',
  //   //     name: 'Test',
  //   //     locationCoords: { latitude: 49.843485, longitude: 24.026541 },
  //   //   },
  //   //   {
  //   //     id: 'V1StGXR8_Z5jdHi6B-myg',
  //   //     imageUri:
  //   //       'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FreactNativeProject-227d88aa-d0a8-4283-8e95-dfc92a59b734/Camera/52ac14ac-9b19-489c-adc4-0ff2906f9db2.jpg',
  //   //     location: 'Hhhh',
  //   //     name: 'Test',
  //   //     locationCoords: { latitude: 49.843485, longitude: 24.026541 },
  //   //   },
  //   // ]);

  //   useEffect(() => {
  //     if (!route.params) return;
  //     setPosts(prev => [...prev, route.params.formData]);
  //     console.log('route.params :>> ', route.params.formData);
  //     console.log('post :>> ', posts);
  //   }, [route.params]);

  //   return (
  //     <View style={styles.container}>
  //       {/* <ScrollView> */}
  //       {/* <View style={styles.header}>
  //           <View style={styles.headerWrapper}>
  //             <TouchableOpacity style={styles.arrowWrapper}>
  //               <SvgLogOut />
  //             </TouchableOpacity>
  //             <Text style={styles.title}>Публікації</Text>
  //           </View>
  //         </View> */}
  //       <View
  //         style={{
  //           marginTop: 32,
  //           marginBottom: 32,
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //         }}
  //       >
  //         {/* <View style={styles.userAvatar}></View> */}
  //         <Image style={styles.userAvatar} source={{}} />
  //         <View style={{ marginLeft: 8 }}>
  //           <Text
  //             style={{
  //               fontFamily: 'Roboto-Regular',
  //               fontWeight: 700,
  //               color: '#212121',
  //             }}
  //           >
  //             Natali Romanova
  //           </Text>
  //           <Text
  //             style={{
  //               fontFamily: 'Roboto-Regular',
  //               fontSize: 11,
  //               color: 'rgba(33, 33, 33, 0.80)',
  //             }}
  //           >
  //             email@example.com
  //           </Text>
  //         </View>
  //       </View>

  //       {/* <FlatList
  //         style={styles.postsWrapper}
  //         data={posts}
  //         // renderItem={({ item }) => (
  //         //   <>
  //         //     <Text>{item.name}</Text>
  //         //     <Test />
  //         //   </>
  //         // )}
  //         // renderItem={testt}
  //         // keyExtractor={(item, idx) => idx.toString()}
  //         keyExtractor={item => item.id}
  //       /> */}
  //       <FlatList
  //         data={posts}
  //         renderItem={({ item }) => (
  //           // <Test name={item.name} />
  //           <View>
  //             {/* <Image />
  //             <Text>test</Text> */}
  //             <PostItem
  //               name={item.name}
  //               image={item.imageUri}
  //               location={item.location}
  //               coordinates={item.locationCoords}
  //             />
  //           </View>
  //         )}
  //         keyExtractor={item => item.id}
  //         // keyExtractor={(item, idx) => idx.toString()}
  //       />
  //       {/* </ScrollView> */}
  //     </View>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     // justifyContent: 'center',
  //     // alignItems: 'center',
  //     paddingLeft: 16,
  //     paddingRight: 16,
  //     backgroundColor: '#FFF',
  //   },
  //   userAvatar: {
  //     width: 60,
  //     height: 60,
  //     // marginLeft: 'auto',
  //     // marginRight: 'auto',
  //     backgroundColor: '#F6F6F6',
  //     // borderWidth: 1,
  //     // borderColor: '#000',
  //     borderRadius: 16,
  //     // elevation: 4,
  //     // shadowColor: '#000',
  //     // shadowOffset: { width: 0, height: 4 },
  //     // shadowOpacity: 0.25,
  //     // top: -60,
  //     // marginLeft: 'auto',
  //     // marginRight: 'auto',
  //     // position: 'absolute',
  //   },
  // header: {
  //   height: 88,
  //   paddingTop: 44,
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
  // headerWrapper: {
  //   alignItems: 'center',
  //   height: 44,
  //   justifyContent: 'center',
  // },

  // arrowWrapper: {
  //   position: 'absolute',
  //   right: 16,
  //   bottom: 10,
  // },
  // title: {
  //   fontSize: 17,
  //   fontFamily: 'Roboto-Medium',
  // },
  // });
};
