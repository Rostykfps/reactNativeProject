import { useState } from 'react';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  Animated,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SvgLogOut from '../assets/svg/SvgLogOut';
import { signOutUser } from '../redux/auth/authOperation';
import { uploadFileToDb } from '../utils/uploadFileToDb';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FlatList } from 'react-native';
import PostItem from '../components/PostItem';
import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen = () => {
  const { avatar, login, userId } = useSelector(state => state.auth);

  const [userAvatar, setUserAvatar] = useState(avatar || null);
  const [posts, setPosts] = useState([]);
  // const [shift, setShift] = useState(false);
  // const [position] = useState(new Animated.Value(0));

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // useEffect(() => {
  //   Animated.timing(position, {
  //     toValue: shift ? 90 : 78,
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();
  // }, [shift]);

  const pickAvatar = async () => {
    if (userAvatar) {
      setUserAvatar(null);
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUserAvatar(result.assets[0].uri);
      uploadFileToDb(userAvatar);
    }
  };

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
    // <View style={styles.container}>

    // <Text>ProfileScreen</Text> */

    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/images/photo-bg.jpg')}
      >
        {/* <Animated.View
                style={[
                  styles.formWrapper,
                  // , { paddingBottom: position }
                ]}
              > */}
        <View style={styles.listWrapper}>
          <TouchableOpacity style={{ position: 'absolute', top: 22, left: 16 }}>
            <SvgArrowLeft onPress={() => navigation.goBack()} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ position: 'absolute', top: 22, right: 16 }}
          >
            <SvgLogOut onPress={() => dispatch(signOutUser())} />
          </TouchableOpacity>
          <View style={styles.addPhoto}>
            <Image style={styles.avatar} source={{ uri: userAvatar }} />
            <TouchableOpacity
              style={styles.avatarBtnWrapper}
              onPress={pickAvatar}
            >
              {userAvatar ? (
                <Image
                  style={styles.delBtn}
                  source={require('../assets/images/del-btn.png')}
                />
              ) : (
                <Image
                  style={styles.addBtn}
                  source={require('../assets/images/add-btn.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', height: '100%' }}>
            {/* <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              bounces={false}
            > */}
            <Text style={styles.title}>{login}</Text>

            <FlatList
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
                  likesQuantity={item.likesQuantity}
                  profileScreen={true}
                  userId={userId}
                />
                // </View>
              )}
              keyExtractor={(item, idx) => idx.toString()}
            />
            {/* </ScrollView> */}
          </View>
        </View>
        {/* </Animated.View> */}
      </ImageBackground>
    </View>

    // </View>
  );
};

const screenSize = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#FFF',
  },
  // container: {
  //   flex: 1,
  // },
  backgroundImage: {
    flex: 1,
    top: 0,
    position: 'absolute',
    height: screenSize.height,
    width: screenSize.width,
    resizeMode: 'cover',
  },
  listWrapper: {
    minHeight: screenSize.height - 88,
    marginTop: 88,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 87,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 34,
  },
  addPhoto: {
    width: 120,
    height: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    top: -60,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    // top: -60,
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'absolute',
  },
  avatarBtnWrapper: {
    position: 'absolute',
    width: 25,
    height: 25,
    top: 81,
    left: 107,
    borderRadius: 100,
  },
  addBtn: {
    position: 'absolute',
    // top: 81,
    // left: 107,
  },
  delBtn: {
    position: 'absolute',
    left: -6,
    top: -6,
  },

  title: {
    marginBottom: 28,
    color: '#212121',
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
    color: '#212121',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    width: '100%',
  },
  // scrollViewContainer: {
  //   minHeight: screenSize.height,
  //   justifyContent: 'flex-end',
  // },
  // showPassword: {
  //   color: '#1B4371',
  //   fontFamily: 'Roboto-Regular',
  //   fontSize: 16,
  //   position: 'absolute',
  //   right: 16,
  //   bottom: 14,
  // },
  // registerBtn: {
  //   textAlign: 'center',
  //   backgroundColor: '#FF6C00',
  //   borderRadius: 100,
  //   width: '100%',
  //   paddingHorizontal: 32,
  //   paddingVertical: 16,
  //   marginTop: 43,
  //   marginBottom: 16,
  //   color: '#fff',
  //   fontFamily: 'Roboto-Regular',
  //   fontSize: 16,
  // },
  // text: {
  //   color: '#1B4371',
  //   textAlign: 'center',
  //   fontFamily: 'Roboto-Regular',
  //   fontSize: 16,
  // },
});
