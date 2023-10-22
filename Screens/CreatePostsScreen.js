import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

import SvgArrowLeft from '../assets/svg/SvgArrowLeft';
import SvgCameraIcon from '../assets/svg/SvgCameraIcon';
import SvgMapPin from '../assets/svg/SvgMapPin';
import SvgTrash from '../assets/svg/SvgTrash';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export const CreatePostsScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [postImage, setPostImage] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(true);
  const [postId, setPostId] = useState('');
  const [formData, setFormData] = useState({
    postId: '',
    userId: '',
    postName: '',
    location: '',
    postImage: null,
    locationCoords: {},
    // commentsQuantity: 0,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [locationCoords, setLocationCoords] = useState('');
  const [activeBtn, setActiveBtn] = useState(false);

  const { userId, login } = useSelector(state => state.auth);

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  useEffect(() => {
    checkFormValidity();
  }, [formData]);

  const takePhoto = async () => {
    console.log('took photo');

    if (cameraRef && cameraVisible) {
      const { uri } = await cameraRef.takePictureAsync();
      setPostImage(uri);
      await MediaLibrary.createAssetAsync(uri);

      setFormData({
        ...formData,
        postImage: uri,
      });

      setCameraVisible(!cameraVisible);
      checkFormValidity();
      return;
    }
    setCameraVisible(!cameraVisible);
  };

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const checkFormValidity = () => {
    const { postName, location } = formData;
    if (!cameraVisible && postName && location) {
      setIsFormValid(true);
      setActiveBtn(true);
      return;
    }
    setIsFormValid(false);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    formData.locationCoords = coords;
  };

  const handleClearForm = () => {
    setFormData({
      postId: '',
      userId: '',
      postName: '',
      location: '',
      postImage: '',
      locationCoords: {},
    });
    setPostImage(null);
    setCameraVisible(true);
  };

  const uploadPostToDb = async data => {
    try {
      const postRef = await addDoc(collection(db, 'posts'), data);
      setPostId(postRef.id);
      Alert.alert(`Пост опубліковано`);
      return postRef.id;
    } catch (error) {
      return error.message;
    }
  };

  const handleSubmit = async () => {
    setActiveBtn(false);
    await getLocation();

    await uploadPostToDb({
      ...formData,
      userId,
    });
    // console.log('postRef.id2 :>> ', postRef.id);
    navigation.navigate('Posts', { formData });

    handleClearForm();
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <TouchableOpacity style={styles.arrowWrapper}>
            <SvgArrowLeft />
          </TouchableOpacity>
          <Text style={styles.title}>Створити публікацію</Text>
        </View>
      </View> */}
      <ScrollView>
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          {/* {postImage ? (
            <>
              <View style={styles.photoWrapper}>
                <Image
                  source={{ uri: postImage }}
                  style={{ width: '100%', height: '100%' }}
                />
                <TouchableOpacity
                  style={styles.iconWrapper}
                  // onPress={setPostImage(null)}
                >
                  <SvgCameraIcon />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Редагувати фото</Text>
            </>
          ) : (
            <>
              <View style={styles.photoWrapper}>
                <Camera style={styles.camera} ref={setCameraRef}>
                  <TouchableOpacity
                    style={styles.iconWrapper}
                    onPress={takePhoto}
                  >
                    <SvgCameraIcon />
                  </TouchableOpacity>
                </Camera>
              </View>
              <Text style={styles.text}>Завантажте фото</Text>
            </>
          )} */}

          <View style={styles.photoWrapper}>
            {cameraVisible ? (
              <Camera style={styles.camera} ref={setCameraRef} />
            ) : (
              <Image
                source={{ uri: postImage }}
                style={{ width: '100%', height: '100%' }}
              />
            )}
            <TouchableOpacity style={styles.iconWrapper} onPress={takePhoto}>
              <SvgCameraIcon />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>
            {cameraVisible ? `Завантажте фото` : `Редагувати фото`}
          </Text>

          <TextInput
            style={styles.inputName}
            placeholderTextColor="#BDBDBD"
            placeholder="Назва..."
            // name="name"
            value={formData.postName}
            onChangeText={text => handleInputChange('postName', text)}
          />
          <View style={{ marginTop: 16, paddingTop: 10 }}>
            <View style={{}}>
              <SvgMapPin style={styles.locationIcon} />
            </View>
            <TextInput
              style={styles.inputLocation}
              placeholderTextColor="#BDBDBD"
              placeholder="Місцевість..."
              // name="location"
              value={formData.location}
              onChangeText={text => handleInputChange('location', text)}
            />
          </View>
          <TouchableOpacity disabled={!isFormValid} onPress={handleSubmit}>
            <Text
              style={
                isFormValid && activeBtn
                  ? { ...styles.submitBtn, ...styles.activeSubmitBtn }
                  : { ...styles.submitBtn, ...styles.inActiveSubmitBtn }
              }
            >
              Опубліковати
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.trashBtn} onPress={handleClearForm}>
              <SvgTrash />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: 16,
    // paddingRight: 16,
    backgroundColor: '#FFF',
  },
  // header: {
  //   height: 88,
  //   paddingTop: 44,
  //   elevation: 1,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 0.5 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 0,
  //   // borderBottomColor: '#000',

  //   borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  //   // borderBottomWidth: 0.5,
  //   borderRadius: 0,
  // },

  headerWrapper: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
  },

  arrowWrapper: {
    position: 'absolute',
    left: 16,
    bottom: 10,
  },
  titleWrapper: {
    width: '100%',
    height: 44,
    textAlign: 'center',
  },
  title: {
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
  },

  photoWrapper: {
    height: 240,
    marginTop: 32,
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    color: '#BDBDBD',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  inputName: {
    height: 50,
    marginTop: 32,
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },

  inputLocation: {
    height: 50,
    paddingLeft: 28,
    color: '#212121',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  locationIcon: {
    position: 'absolute',
    top: 13,
  },
  submitBtn: {
    textAlign: 'center',
    // backgroundColor: '#F6F6F6',
    borderRadius: 100,
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 32,
    marginBottom: 16,
    // color: '#BDBDBD',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  activeSubmitBtn: {
    backgroundColor: '#FF6C00',
    color: '#FFFFFF',
  },
  inActiveSubmitBtn: {
    backgroundColor: '#F6F6F6',
    color: '#BDBDBD',
  },
  trashBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    width: 70,
    paddingHorizontal: 23,
    paddingVertical: 8,
    marginTop: 32,
    marginBottom: 16,
    color: '#BDBDBD',
  },
});
