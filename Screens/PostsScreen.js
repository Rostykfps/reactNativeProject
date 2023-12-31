import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import SvgLogOut from '../assets/svg/SvgLogOut';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import PostItem from '../components/PostItem';
import { useSelector } from 'react-redux';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase/config';

export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([
    // {
    //   id: 'V1StGXR8_Z5jdHi6B-myT',
    //   postImage:
    //     'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FreactNativeProject-227d88aa-d0a8-4283-8e95-dfc92a59b734/Camera/52ac14ac-9b19-489c-adc4-0ff2906f9db2.jpg',
    //   location: 'Location 1',
    //   postName: 'Test 1',
    //   locationCoords: { latitude: 49.843485, longitude: 24.026541 },
    // },
    // {
    //   id: 'V1StGXR8_Z5jdHi6B-my',
    //   postImage:
    //     'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FreactNativeProject-227d88aa-d0a8-4283-8e95-dfc92a59b734/Camera/7cad5e2a-6880-489e-a245-b531aa878b6c.jpg',
    //   location: 'Location 2',
    //   postName: 'Test 2',
    //   locationCoords: { latitude: 49.843485, longitude: 24.026541 },
    // },
  ]);

  // useEffect(() => {
  //   if (!route.params) return;
  //   setPosts(prev => [...prev, route.params.formData]);
  //   console.log('route.params :>> ', route.params.formData);
  // }, [route.params]);

  const { login, email, avatar } = useSelector(state => state.auth);

  const getAllPosts = async () => {
    try {
      const ref = query(collection(db, 'posts'));
      onSnapshot(ref, snapshot => {
        setPosts(snapshot.docs.map(doc => ({ ...doc.data(), postId: doc.id })));
      });
    } catch (error) {
      console.log('error-message', error.message);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      {/* <View style={styles.header}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity style={styles.arrowWrapper}>
              <SvgLogOut />
            </TouchableOpacity>
            <Text style={styles.title}>Публікації</Text>
          </View>
        </View> */}
      {/* <View style={styles.userDataWrapper}>
        <Image style={styles.userAvatar} source={{}} />
        <View style={styles.userWrapper}>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View> */}

      <FlatList
        ListHeaderComponent={
          <View style={styles.userDataWrapper}>
            <Image style={styles.userAvatar} source={{ uri: avatar }} />
            <View style={styles.userWrapper}>
              <Text style={styles.userName}>{login}</Text>
              <Text style={styles.userEmail}>{email}</Text>
            </View>
          </View>
        }
        data={posts}
        renderItem={({ item }) => (
          // <View>
          <PostItem
            postName={item.postName}
            postImage={item.postImage}
            location={item.location}
            coordinates={item.locationCoords}
            userPostId={item.userId}
            postId={item.postId}
            commentsQuantity={item.commentsQuantity}
          />
          // </View>
        )}
        // keyExtractor={item => item.postId}
        keyExtractor={(item, idx) => idx.toString()}
      />

      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FFF',
  },
  userDataWrapper: {
    marginTop: 32,
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  userWrapper: {
    marginLeft: 8,
  },
  userName: {
    fontFamily: 'Roboto-Bold',
    color: '#212121',
  },
  userEmail: {
    fontFamily: 'Roboto-Regular',
    fontSize: 11,
    color: 'rgba(33, 33, 33, 0.80)',
  },
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
});
